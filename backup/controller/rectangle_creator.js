rectangle_creator = function(width, height, g) {
    this.width = width;
    this.height = height;
    this.g = g;
    this.onmousedown = function (e) {
        if (!e) {
            var e = window.event;
        }
        this.g.addVtx(this.g.curr_id++, {tag:"rect", x:e.clientX, y:e.clientY, width:this.width, height:this.height, style:"fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)"});
       //alert(e);
    }
}