var rectangle_maker = new rectangle_creator(100, 100, MD.g);
var circle_maker = new circle_creator(50, MD.g);
var line_maker = new line_creator(MD.g);
var polyline_maker = new polyline_creator(MD.g);
var text_maker = new text_creator(MD.g);
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
function switching_line() {
    status = "line";
    display_status();
}
function switching_polyline() {
    status = "polyline";
    display_status();
}
function switching_text() {
    status = "text";
    display_status();
}
function switching_select() {
    status = "select";
    display_status();
    polyline_maker.emptyStack();
}
function grouping() {
    status = "select";
    groupSelectedObjects();
    display_status();
    redraw(MD.g);
}
function ungrouping() {
    status = "select";
    unGroupSelectedObjects();
    display_status();
    redraw(MD.g);
}
/*function notify(evt) {
    //alert(evt.target.id);
    let id = parseInt(evt.target.id);
    var ent = MD.g.getEntity(id);
    console.log(ent);
    ent["Selected"] = true;
}*/