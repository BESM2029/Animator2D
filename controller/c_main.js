var rectangle_maker = new rectangle_creator(100, 100, MD.g);
var circle_maker = new circle_creator(50, MD.g);
var line_maker = new line_creator(MD.g);
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
function switching_select() {
    status = "select";
    display_status();
}
function grouping() {
    status = "select";
    groupSelectedObjects();
    display_status();
    document.getElementById("output").innerHTML = render(MD.g, 900, 900);
}
function ungrouping() {
    status = "select";
    unGroupSelectedObjects();
    display_status();
    document.getElementById("output").innerHTML = render(MD.g, 900, 900);
}
/*function notify(evt) {
    //alert(evt.target.id);
    let id = parseInt(evt.target.id);
    var ent = MD.g.getEntity(id);
    console.log(ent);
    ent["Selected"] = true;
}*/