circle_creator = function(r, g) {
    this.r = r;
    this.g = g;
    this.onmousedown = function (e) {
        if (!e) {
            var e = window.event;
        }
        var canvas = document.getElementById("output");
        var dim = canvas.getBoundingClientRect();
        var x = e.clientX - dim.left;
        var y = e.clientY - dim.top;
        this.g.addVtx(this.g.curr_id++, {tag:"circle", cx:x, cy:y, r:this.r, style:"fill:rgb(0,0,255); stroke-width:1; stroke:rgb(0,0,0)", onclick:"top.notify(evt)"});
        //alert(e);
    }
}