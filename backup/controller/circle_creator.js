circle_creator = function(r, g) {
    this.r = r;
    this.g = g;
    this.onmousedown = function (e) {
        if (!e) {
            var e = window.event;
        }
        this.g.addVtx(this.g.curr_id++, {tag:"circle", cx:e.clientX, cy:e.clientY, r:this.r, style:"fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)"});
        //alert(e);
    }
}