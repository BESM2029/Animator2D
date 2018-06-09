rectangle_creator = function(width, height, g) {
    this.width = width;
    this.height = height;
    this.g = g;
    this.onmousedown = function (e) {
        if (!e) {
            var e = window.event;
        }
        var target = e.target;
        var dim = target.getBoundingClientRect();
        var x = e.clientX - dim.left;
        var y = e.clientY - dim.top;
        this.g.addVtx(this.g.curr_id++, {tag:"rect", x:x, y:y, width:this.width, height:this.height,
            style:"fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)", onclick:"top.notify(evt)"});
       //alert(e);
    }
}