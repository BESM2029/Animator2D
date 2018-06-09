var g = new AG.AGraph("id", "__src", "__dst");
    g.curr_id = 0;
    g.addVtx(g.curr_id++, {tag:"rect", width:"300", height:"100", style:"fill:rgb(255,0,0);stroke-width:3;stroke:rgb(0,0,0)"});
var rectangle_maker = new rectangle_creator(100, 100, g);
var circle_maker = new circle_creator(100, g);
function svg_onmousedown(e) {
    rectangle_maker.onmousedown(e);
    document.getElementById("output").innerHTML = render(g, 900, 900);
}