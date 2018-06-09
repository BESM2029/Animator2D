 function getTagAndAttributeStr(obj) {
    let str = obj.tag + " ";
    for(let key in obj) {
        if (key == "tag")
            continue;
        else
            str += key + '="'+obj[key] + '" ' ;
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
        innerhtml += '<' + getTagAndAttributeStr(elem) + '/>'
    }
    innerhtml += '</svg>';
    return innerhtml;
}