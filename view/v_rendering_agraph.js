 var viewer = {_zoomFactor:1, _panFactor:{x:0, y:0}};

function zoomIn() {
    viewer._zoomFactor = viewer._zoomFactor*1.1;
    document.getElementById("output").innerHTML = render(MD.g, 900, 900);
}
function zoomOut() {
    viewer._zoomFactor = viewer._zoomFactor*0.9;
    document.getElementById("output").innerHTML = render(MD.g, 900, 900);
}
function panning() {
    viewer._panFactor.x +=10;
    viewer._panFactor.y +=10;
    document.getElementById("output").innerHTML = render(MD.g, 900, 900);
}
function attrStr(keyStr, value) {
    return keyStr + '="' + value + '" ';
 }
 function getTagAndAttributeStr(obj) {
    let str = obj.tag + " ";
    for(let key in obj) {
        if (key == "tag")
            continue;
        else
            //str += key + '="'+obj[key] + '" ' ;
            str += attrStr(key, obj[key]);
    }
    return str;
}
function getSelectedIndicatorsStr(obj) {
    let answer = "";
    for(ii = 0; ii < 3; ii ++) {
        for(jj = 0; jj < 3; jj ++) {
            if(ii == 1 && jj == 1) {continue;}
            else {
                answer += '<' + getSelectedSmallRectangleStr(obj, ii, jj) + '/>';
            }
        }
    }
    return answer;
}
function getSelectedSmallRectangleStr(obj, ii, jj) {
    let str = "rect" + " ";
    if (obj.tag == "circle") {
        let index_x = [obj.cx - obj.r - 2, obj.cx - 2, obj.cx + obj.r - 2];
        let index_y = [obj.cy - obj.r - 2, obj.cy - 2, obj.cy + obj.r - 2];
        str += attrStr("x", index_x[ii]) + attrStr("y", index_y[jj]) + 'width="4" height="4" stroke-width="0" fill="green"';
    }
    else if (obj.tag == "rect") {
        let index_x = [obj.x - 2, obj.x + (obj.width/2) - 2, obj.x + obj.width - 2];
        let index_y = [obj.y - 2, obj.y + (obj.height/2) - 2, obj.y + obj.height - 2];
        str += attrStr("x", index_x[ii]) + attrStr("y", index_y[jj]) + 'width="4" height="4" stroke-width="0" fill="green"';
    }
    else if (obj.tag == "line") {
        let index_x = [obj.x1 - 2, (obj.x1+obj.x2)/2 - 2, obj.x2 - 2];
        let index_y = [obj.y1 - 2, (obj.y1+obj.y2)/2 - 2, obj.y2 - 2];
        str += attrStr("x", index_x[ii]) + attrStr("y", index_y[jj]) + 'width="4" height="4" stroke-width="0" fill="green"';
    }
    return str;
}
/*
function render(svg_attr, g) {
    let innerhtml = '<'+ getTagAndAttributeStr(svg_attr)+'>';   // open a svg tag and its attribute 
    for( let id in g.VE) {
        let elem = g.getEntity(id);
        innerhtml += '<' + getTagAndAttributeStr(elem) + '/>'  
    }
    innerhtml += '</svg>';                                      // close the svg tag
    return innerhtml;
}
*/
function render(g, width, height) {
    let e; //dummy e
    let innerhtml = '<svg width="100%" height="100%" onmousedown="c_mouseDown(event)" onmouseup="c_mouseUp(event)" onmousemove="c_mouseMove(event)" onclick="c_onClick(event)">';
    innerhtml += '<g transform=" translate('+viewer._panFactor.x+' '+viewer._panFactor.y+') scale('+viewer._zoomFactor+' '+viewer._zoomFactor+')">';
    //let innerhtml = '<svg width="'+width + '" height="' + height +'" onmousedown="c_mouseDown(event)" onmouseup="c_mouseUp(event)" onmousemove="c_mouseMove(event)" onclick="c_onClick(event)">';
    for( let id in g.VE) {
        let elem = g.getEntity(id);
        innerhtml += '<' + getTagAndAttributeStr(elem) + '/>';
        if(elem.selected == true) {
            innerhtml += getSelectedIndicatorsStr(elem);
        }

    }
    innerhtml += '</g></svg>';
    return innerhtml;
}