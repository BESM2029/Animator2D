polyline_creator = function(g) {
    this.g = g;
    this.xy_stack = [];
    this.curr_plvtx = null;
    this.draw_end = "not";
    this.xy_stack_str = function () {
        let xy_stack_str = ""
        for(let ii in this.xy_stack) {
            let xy = this.xy_stack[ii];
            xy_stack_str+=xy.x+","+xy.y+" ";
        }
        console.log(xy_stack_str);
        return xy_stack_str;
    }
    this.onmousemove = function (e) {
        if (!e) {
            var e = window.event;
        }
        unSelectObjects();
        let xy = convert_xyToElementRegion(e, "output");
        //this.xy_stack.push(xy);
        if(this.draw_end == "not" && this.xy_stack.length > 0) {
            this.curr_plvtx.points = this.xy_stack_str()+" "+xy.x+","+xy.y;
        }
    }
    this.onmousedown = function (e) {
        if (!e) {
            var e = window.event;
        }
        unSelectObjects();
        let xy = convert_xyToElementRegion(e, "output");
        if(this.draw_end == "not") {
            this.xy_stack.push(xy);
            if(this.xy_stack.length == 1) {
                this.curr_plvtx = this.g.addVtx(this.g.curr_id++, {tag:"polyline", points: this.xy_stack_str(), stroke:"rgb(0,0,225)", "stroke-width":2, fill:'none', selected: true, draw_end:this.draw_end});
            }
            else{
                this.curr_plvtx.points = this.xy_stack_str();
            }
        }
        else if (this.draw_end == "end") {
            this.draw_end = "not";
            this.xy_stack = [];
            this.xy_stack.push(xy);
            this.curr_plvtx = this.g.addVtx(this.g.curr_id++, {tag:"polyline", points: this.xy_stack_str(), stroke:"rgb(0,0,225)", "stroke-width":2, fill:'none', selected: true, draw_end:this.draw_end});
        }
    }
    this.emptyStack = function () {
        let ent = this.curr_plvtx;
        if (ent.draw_end == "not") {
            this.draw_end = "end";
            ent.draw_end = this.draw_end;
            ent.points = this.xy_stack_str();

        }
        redraw(MD.g);
        
    }
    this.ondblclick = function (e) {
        /*if (!e) {
            var e = window.event;
        }
        unSelectObjects();
        let xy = convert_xyToElementRegion(e, "output");
        xy_stack.push(xy);
        this.g.addVtx(this.g.curr_id++, {tag:"polyline", point: xy_stack_str, stroke:"rgb(0,0,225)", "stroke-width":2, selected: true});*/
        this.xy_stack = [];
    }
}
