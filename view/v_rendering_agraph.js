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
 function getSelectedObjectStr(obj) {
    let str = "rect" + " ";
    if (obj.tag == "circle") {
        let x = obj.cx - obj.r;
        let y = obj.cy - obj.r;
        let w = obj.r*2;
        let h = obj.r*2;
        str += attrStr("x", x) + attrStr("y", y) + attrStr("width", w) + attrStr("height", h)
            + 'stroke="green" stroke-width="1" fill-opacity="0"';
            /*
            + "rect " + attrStr("x", x1) + attrStr("y", y1) + 'width="2" height="2" stroke-width="0" fill="green"'
            + "rect " + attrStr("x", obj.cx) + attrStr("y", y1) + 'width="2" height="2" stroke-width="0" fill="green"'
            + "rect " + attrStr("x", x2) + attrStr("y", y1) + 'width="2" height="2" stroke-width="0" fill="green"'
            + "rect " + attrStr("x", x1) + attrStr("y", obj.cy) + 'width="2" height="2" stroke-width="0" fill="green"'
            + "rect " + attrStr("x", x2) + attrStr("y", obj.cy) + 'width="2" height="2" stroke-width="0" fill="green"'
            + "rect " + attrStr("x", x1) + attrStr("y", y2) + 'width="2" height="2" stroke-width="0" fill="green"'
            + "rect " + attrStr("x", obj.cx) + attrStr("y", y2) + 'width="2" height="2" stroke-width="0" fill="green"'
            + "rect " + attrStr("x", x2) + attrStr("y", y2) + 'width="2" height="2" stroke-width="0" fill="green"';
            */
    }
    return str;
}
function getSelectedObjectStr2(obj, ii, jj) {
    let str = "rect" + " ";
    if (obj.tag == "circle") {
        let index_x = [obj.cx - obj.r - 2, obj.cx - 2, obj.cx + obj.r - 2]
        let index_y = [obj.cy - obj.r - 2, obj.cy - 2, obj.cy + obj.r - 2]
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
    let innerhtml = '<svg width="'+width + '" height="' + height +'" onmousedown="svg_onmousedown()">';
    for( let id in g.VE) {
        let elem = g.getEntity(id);
        innerhtml += '<' + getTagAndAttributeStr(elem) + '/>';
        innerhtml += '<' + getSelectedObjectStr(elem) + '/>';
        for(ii = 0; ii < 3; ii ++) {
            for(jj = 0; jj < 3; jj ++) {
                if(ii == 1 && jj == 1) {continue;}
                else {
                   innerhtml += '<' + getSelectedObjectStr2(elem, ii, jj) + '/>';
                }
            }
        }

    }
    innerhtml += '</svg>';
    return innerhtml;
}