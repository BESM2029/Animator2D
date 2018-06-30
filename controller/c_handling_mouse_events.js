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
    let x = e.clientX;
    let y = e.clientY;
    if(e.buttons == 1) {
        draged = true;
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
        return (x-ent.cx)*(x-ent.cx) + (y-ent.cy)*(y-ent.cy) < ent.r*ent.r;
    }
    else if(ent.tag == "rect") {
        return ent.x < x && x < ent.x + ent.width && ent.y < y && y < ent.y + ent.height;
    }
}