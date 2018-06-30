function getCornerXYs(obj) {
    let answer = {};
    if (obj.tag == "circle") {
        let x_min = obj.cx - obj.r; let x_max = obj.cx + obj.r;
        let y_min = obj.cy - obj.r; let y_max = obj.cy + obj.r;
        answer = {x_min: x_min, x_max: x_max, y_min: y_min, y_max: y_max};
    }
    else if (obj.tag == "rect") {
        let x_min = obj.x; let x_max = obj.x + obj.width;
        let y_min = obj.y; let y_max = obj.y + obj.height;
        answer = {x_min: x_min, x_max: x_max, y_min: y_min, y_max: y_max};
    }
    return answer;
}
function convertEntities(IDs) {
    let selectedEntities = [];
    for(let ii in IDs) {
        let id = IDs[ii];
        let entity = MD.g.getEntity(id);
        selectedEntities.push(entity);
    }
    return selectedEntities;
}
function getAllObjects() {
    let allObjIds = MD.g.getVtxs();
    let selectedEntities = convertEntities(allObjIds);
    return selectedEntities;
}
function getAllRootObjects() {
    let allRootObjIds = MD.g.getVtxs(function(Vtx){
        let idKeyStr = MD.g.S_id;
        let parentIDs = MD.g.inV(Vtx[idKeyStr], function(edge){return edge && edge.type && edge.type == "groupping";});
        return parentIDs.length == 0;
    });
    let allRootEntities = convertEntities(allRootObjIds);
    return allRootEntities;
}
function getSelectedObjects() {
    let selectedObjIds = MD.g.getVtxs(function(entity){
        if(entity.selected) return true;
        else return false;
    });
    let selectedEntities = convertEntities(selectedObjIds);
    return selectedEntities;
}
function groupSelectedObjects() {
    //Step1. Get all selected objects.
    let selectedEntities = getSelectedObjects();
    //Step2. Calcurate width and height to contain all selected object.
    let tx_min = 9999; let tx_max = -9999;
    let ty_min = 9999; let ty_max = -9999;
    for (let ii in selectedEntities) {
        let ent = selectedEntities[ii];
        let corners = getCornerXYs(ent);
        tx_min = Math.min(tx_min, corners.x_min); tx_max = Math.max(tx_max, corners.x_max);
        ty_min = Math.min(ty_min, corners.y_min); ty_max = Math.max(ty_max, corners.y_max);
        ent.selected = false;
    }
    let width = tx_max - tx_min;
    let height = ty_max - ty_min;
    //Step3. Insert a node, make it parent of all selected objects.
    let group = MD.g.addVtx(MD.g.curr_id++, {tag:"rect", group:true, x:tx_min, y:ty_min, width: width, height: height, selected: true,
                                            "fill-opacity": 0}); //, onclick: "top.notify(evt)"
    let idKeyStr = MD.g.S_id;
    for (let ii in selectedEntities) {
        let ent = selectedEntities[ii];
        MD.g.addEdge(MD.g.curr_id++, group[idKeyStr], ent[idKeyStr], {type:"groupping"});
    }
}
function unSelectObjects() {
    let selectedEntities = getSelectedObjects();
    //Unselect object.
    for (let ii in selectedEntities) {
        let ent = selectedEntities[ii];
        ent.selected = false;
    }
}
function unSelectAllObjects() {
    let allObjects = getAllObjects();
    for(let ii in allObjects) {
        //console.log(ent);
        let ent = allObjects[ii];
        ent["selected"] = false;
    }
}
function translateObject(ent, delta_x, delta_y) {
    if(ent.tag == "rect") {
        ent.x += delta_x;
        ent.y += delta_y;
    }
    else if(ent.tag == "circle") {
        ent.cx += delta_x;
        ent.cy += delta_y;
    }
    if(ent.group) {
        let idKeyStr = MD.g.S_id;
        let childIDs = MD.g.outV(ent[idKeyStr], function(edge){return edge && edge.type && edge.type == "groupping";})
        for(let ii in childIDs) {
            let id = childIDs[ii];
            let child = MD.g.getEntity(id);
            translateObject(child, delta_x, delta_y);
        }
    }
}
function translateSelectedObjects(delta_x, delta_y) {
    let selectedEntities = getSelectedObjects();
    //Unselect object.
    for (let ii in selectedEntities) {
        let ent = selectedEntities[ii];
        translateObject(ent, delta_x, delta_y);
    }
}
function unGroupSelectedObjects() {
    //Step1. Get all selected objects.
    let selectedEntities = getSelectedObjects();
    //Step2. For each selected object if it is a group, get all children selected, and remove the group.
    for (let ii in selectedEntities) {
        let ent = selectedEntities[ii];
        if(ent.group) {
            let idKeyStr = MD.g.S_id;
            let childIDs = MD.g.outV(ent[idKeyStr], function(edge){return edge && edge.type && edge.type == "groupping";})
            for(let ii in childIDs) {
                let id = childIDs[ii];
                let child = MD.g.getEntity(id);
                child["selected"] = true;
            }
            MD.g.removeEntity(ent[idKeyStr], true);
        }
    }
}