var rectangle_maker = new rectangle_creator(100, 100, MD.g);
var circle_maker = new circle_creator(50, MD.g);
//console.log(MD.g);
var status = "select";
function display_status() {
    document.getElementById("status").innerHTML = status;
}
function switching_rectangle() {
    status = "rectangle";
    display_status();
}
function switching_circle() {
    status = "circle";
    display_status();
}
function switching_select() {
    status = "select";
    display_status();
}
/*function notify(evt) {
    //alert(evt.target.id);
    let id = parseInt(evt.target.id);
    var ent = MD.g.getEntity(id);
    console.log(ent);
    ent["Selected"] = true;
}*/
function svg_onmousedown(e) {
    if(status == "rectangle") {
        rectangle_maker.onmousedown(e);
        document.getElementById("output").innerHTML = render(MD.g, 900, 900);
    }
    else if(status == "circle") {
        circle_maker.onmousedown(e);
        document.getElementById("output").innerHTML = render(MD.g, 900, 900);
    }
    else if(status == "select") {
        //document.getElementById("output").innerHTML = render(MD.g, 900, 900);
    }
svg_attr={tag:"svg", width:700, height:500, onmousedown:"sgv_onmousedown()"};
}