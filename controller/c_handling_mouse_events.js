var x_down = null;
var y_down = null;
var draged = false;
function convert_xyToElementRegion(e, elementId) {
    let canvas = document.getElementById(elementId);
    let dim = canvas.getBoundingClientRect();
    let x = e.clientX - dim.left;
    let y = e.clientY - dim.top;
    return {x:x, y:y}
}
function c_onWheel(e) {
    if (e.wheelDeltaY<0){
        console.log("WheelDown");
        zoomIn();
       // downscroll code
    }
    else {
        console.log("WheelUp");
        zoomOut();
       // upscroll code
    }
}
function c_mouseDown(e) {
    if(status == "rectangle") {
        rectangle_maker.onmousedown(e);
        document.getElementById("output").innerHTML = render(MD.g, 900, 900);
    }
    else if(status == "circle") {
        circle_maker.onmousedown(e);
        document.getElementById("output").innerHTML = render(MD.g, 900, 900);
    }
    else if(status == "line") {
        line_maker.onmousedown(e);
        document.getElementById("output").innerHTML = render(MD.g, 900, 900);
    }
    else if(status == "select") {
        let xy = convert_xyToElementRegion(e, "output");
        x_down = xy.x;
        y_down = xy.y;
        //unSelectObjects();
        //document.getElementById("output").innerHTML = render(MD.g, 900, 900);
    }
}
function c_mouseMove(e) {
    let xy = convert_xyToElementRegion(e, "output");
    if(e.buttons == 1 && x_down && y_down) {
        if (Math.abs(xy.x-x_down)>2||Math.abs(xy.y-y_down)>2) {
            //console.log("button down");
            draged = true;
        }
    }
    //let coor = "Coordinates: (" + x + "," + y + ")";
    //document.getElementById("demo_mousemove").innerHTML = coor;
}
function c_mouseUp(e) {
    if (status == "line") {
        line_maker.onmouseup(e);
        document.getElementById("output").innerHTML = render(MD.g, 900, 900);
    }
    else if(status == "select") {
        let xy = convert_xyToElementRegion(e, "output");
        //let coor = "Mouse up: (" + x + "," + y + ")";
        //document.getElementById("demo_mouseup").innerHTML = coor;
        if (x_down != null && draged) {
            let x_delta = xy.x - x_down;
            let y_delta = xy.y - y_down;
            //let coor_delta = "Mouse delta: (" + x_delta + "," + y_delta + ")";
            //document.getElementById("demo_mousedelta").innerHTML = coor_delta;
            translateSelectedObjects(x_delta, y_delta);
            document.getElementById("output").innerHTML = render(MD.g, 900, 900);
        }
        else {
            c_onClick(e);
        }
    }
    x_down = null;
    y_down = null;
    draged = false;
}
function c_mouseOut() {
    //document.getElementById("demo_mousemove").innerHTML = "Coordinates:";
}
function c_onClick(evt) {
    if(status == "select") {
        //alert(evt.target.id);
        let emptySpaceClicked = true;
        let allObjects = getAllRootObjects();
        for(let ii in allObjects) {
            //console.log(ent);
            let ent = allObjects[ii];
            let xy = convert_xyToElementRegion(evt, "output");
            if (isClicked(ent, xy.x, xy.y)) {
                if(ent.selected) {
                    ent["selected"] = false;
                }
                else {
                    ent["selected"] = true;
                }
                emptySpaceClicked = false;
            }
        }
        if(emptySpaceClicked) {
            unSelectAllObjects();
        }
        document.getElementById("output").innerHTML = render(MD.g, 900, 900);
    }
}
function isClicked(ent, x, y) {
    if(ent.tag == "circle") {
        let cx = viewer._zoomFactor*ent.cx+viewer._panFactor.x;
        let cy = viewer._zoomFactor*ent.cy+viewer._panFactor.y;
        let r = viewer._zoomFactor*ent.r;
        return (x-cx)*(x-cx) + (y-cy)*(y-cy) < r*r;
    }
    else if(ent.tag == "rect") {
        let rx = viewer._zoomFactor*ent.x+viewer._panFactor.x;
        let ry = viewer._zoomFactor*ent.y+viewer._panFactor.y;
        let width = viewer._zoomFactor*ent.width;
        let height = viewer._zoomFactor*ent.height;
        return rx < x && x < rx + width && ry < y && y < ry + height;
    }
    else if (ent.tag == "line") {
        let x_min = Math.min(ent.x1, ent.x2);
        let x_max = Math.max(ent.x1, ent.x2);
        let y_min = Math.min(ent.y1, ent.y2);
        let y_max = Math.max(ent.y1, ent.y2);
        let tx_min = viewer._zoomFactor*x_min+viewer._panFactor.x;
        let tx_max = viewer._zoomFactor*x_max+viewer._panFactor.x;
        let ty_min = viewer._zoomFactor*y_min+viewer._panFactor.y;
        let ty_max = viewer._zoomFactor*y_max+viewer._panFactor.y;
        return tx_min < x && x < tx_max && ty_min < y && y <= ty_max;
    }
}