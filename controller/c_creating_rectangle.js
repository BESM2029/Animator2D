rectangle_creator = function(width, height, g) {
    this.width = width;
    this.height = height;
    this.g = g;
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
        this.g.addVtx(this.g.curr_id++, {tag:"rect", x:xy.x, y:xy.y, width:this.width, height:this.height,
            style:"fill:rgb(0,0,255); stroke-width:1; stroke:rgb(0,0,0)", selected: true}); //, onclick:"top.notify(evt)"
       //alert(e);
    }
}