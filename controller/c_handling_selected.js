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
    MD.g.addVtx(MD.g.curr_id++, {tag:"rect", x:tx_min, y:ty_min, width: width, height: height, selected: true,
    "fill-opacity": 0}); //, onclick: "top.notify(evt)"
}
function unSelectObjects() {
    let selectedEntities = getSelectedObjects();
    //Unselect object.
    for (let ii in selectedEntities) {
        let ent = selectedEntities[ii];
        ent.selected = false;
    }
}
function translateSelectedObjects(delta_x, delta_y) {
    let selectedEntities = getSelectedObjects();
    //Unselect object.
    for (let ii in selectedEntities) {
        let ent = selectedEntities[ii];
        if(ent.tag == "rect") {
            ent.x += delta_x;
            ent.y += delta_y;
        }
        else if(ent.tag == "circle") {
            ent.cx += delta_x;
            ent.cy += delta_y;
        }
    }

}