var xy_down = null;
line_creator = function(g) {
    this.g = g;
    this.onmousedown = function (e) {
        if (!e) {
            var e = window.event;
        }
        let xy = convert_xyToElementRegion(e, "output");
        xy_down = xy;
    }
    this.onmouseup = function (e) {
        if (!e) {
            var e = window.event;
        }
        unSelectObjects();
        let xy = convert_xyToElementRegion(e, "output");
        this.g.addVtx(this.g.curr_id++, {tag:"line", x1:xy_down.x, y1:xy_down.y, x2:xy.x, y2:xy.y, stroke:"rgb(0,0,225)", "stroke-width":2, selected: true});
    }
}