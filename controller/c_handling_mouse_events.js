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
    e.stopPropagation();
}
function c_mouseDown(e) {
    console.log("Mouse Down is called!");
    if(status == "rectangle") {
        rectangle_maker.onmousedown(e);
        redraw(MD.g);
    }
    else if(status == "circle") {
        circle_maker.onmousedown(e);
        redraw(MD.g);
    }
    else if(status == "line") {
        line_maker.onmousedown(e);
        redraw(MD.g);
    }
    else if(status == "polyline") {
        polyline_maker.onmousedown(e);
        redraw(MD.g);
    }
    else if(status == "text") {
        let txt = document.getElementById("txt").innerHTML
        text_maker.onmousedown(e, txt);
        redraw(MD.g);
    }
    else if(status == "select") {
        let xy = convert_xyToElementRegion(e, "output");
        x_down = xy.x;
        y_down = xy.y;
        //unSelectObjects();
        //redraw(MD.g);
    }
    e.stopPropagation();
}
function c_mouseMove(e) {
    let xy = convert_xyToElementRegion(e, "output");
    if(e.buttons == 1 && x_down && y_down) {
        if (Math.abs(xy.x-x_down)>2||Math.abs(xy.y-y_down)>2) {
            //console.log("button down");
            draged = true;
        }
    }
    /*else if(status =="line") {
        line_maker.onmousemove(e);
        redraw(MD.g);
    }*/
    else if(status =="polyline") {
        polyline_maker.onmousemove(e);
        redraw(MD.g);
    }
    //let coor = "Coordinates: (" + x + "," + y + ")";
    //document.getElementById("demo_mousemove").innerHTML = coor;
    e.stopPropagation();
}
function c_mouseUp(e) {
    console.log("Mouse Up is called!")
    if (status == "line") {
        line_maker.onmouseup(e);
        redraw(MD.g);
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
            redraw(MD.g);
        }
        /*else {
            c_onClick(e);
        }*/
    }
    x_down = null;
    y_down = null;
    draged = false;
    e.stopPropagation();
}
function c_mouseOut() {
    //document.getElementById("demo_mousemove").innerHTML = "Coordinates:";
    e.stopPropagation();
}
function c_onDblClick(e) {
    console.log("Double Click is called!");
    if(status == "polyline") {
        polyline_maker.ondblclick(e);
        redraw(MD.g);
    }
    e.stopPropagation();
}
function c_onClick(e) {
    console.log("Click is called!");
    if(status == "select") {
        if (x_down != null && draged) {
            return
        }
        else {
            //alert(e.target.id);
            let emptySpaceClicked = true;
            let allObjects = getAllRootObjects();
            for(let ii in allObjects) {
                //console.log(ent);
                let ent = allObjects[ii];
                let xy = convert_xyToElementRegion(e, "output");
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
            redraw(MD.g);
        }
    }
    e.stopPropagation();
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
    else if (ent.tag == "polyline") {
        let mnx = polylineMinMax(ent);
        let tx_min = viewer._zoomFactor*mnx.x_min+viewer._panFactor.x;
        let tx_max = viewer._zoomFactor*mnx.x_max+viewer._panFactor.x;
        let ty_min = viewer._zoomFactor*mnx.y_min+viewer._panFactor.y;
        let ty_max = viewer._zoomFactor*mnx.y_max+viewer._panFactor.y;
        return tx_min < x && x < tx_max && ty_min < y && y <= ty_max;
    }
}
function polylineMinMax(ent) {
    let poins_x = [];
    let poins_y = [];
    let points_str = ent.points;
    let points_trim = points_str.trim();
    let points_obj = points_trim.split(" ");
    for (let ii in points_obj) {
        let points_xy = points_obj[ii].split(",");
        poins_x.push(points_xy[0]);
        poins_y.push(points_xy[1]);
    }
    let x_min = Math.min.apply(null, poins_x);
    let x_max = Math.max.apply(null, poins_x);
    let y_min = Math.min.apply(null, poins_y);
    let y_max = Math.max.apply(null, poins_y);
    return minmax = {x_min:x_min, x_max:x_max, y_min:y_min, y_max:y_max}
}