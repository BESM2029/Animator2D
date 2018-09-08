text_creator = function(txt, g) {
    this.g = g;
    this.txt = txt;
    this.onmousedown = function (e) {
        if (!e) {
            var e = window.event;
        }
        unSelectObjects();
        //var canvas = document.getElementById("output");
        //var dim = canvas.getBoundingClientRect();
        //var x = e.clientX - dim.left;
        //var y = e.clientY - dim.top;
        let xy = convert_xyToElementRegion(e, "output");
        this.g.addVtx(this.g.curr_id++, {tag:"text", x:xy.x, y:xy.y, __text:txt, style:"fill:rgb(0,0,255)", selected: true}); //, onclick:"top.notify(evt)"
       //alert(e);
    }
}