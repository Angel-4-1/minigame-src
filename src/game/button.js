export class Button {
    constructor(_sprite, _x, _y, _width, _height, _offset, _active, _num_frames, _is_animated = false) {
        this.sprite = _sprite;
        this.x = _x;
        this.y = _y;
        this.width = _width;
        this.height = _height;
        this.offset = _offset;
        this.active = _active;
        this.size_width = 128;      //dimensiones del boton en el canvas
        this.size_height = 128;
        this.is_animated = _is_animated;
        this.num_frames = _num_frames;
        this.sx = 0;
        this.frames_done = 0;
    }
    
    draw(ctx) {
        ctx.drawImage(this.sprite, this.active ? (this.offset * (this.num_frames-1)) : this.sx, 0, this.size_width, this.size_height, this.x, this.y, this.width, this.height);
    }

    update() {
        if ( this.is_animated ) {
            
            this.frames_done++;

            if ( this.frames_done > 3 ) {
                
                var max = this.offset * ( this.num_frames - 1 );
                this.sx += this.offset;
                if ( this.sx >= max ) {
                    this.sx = 0;
                }
    
                this.frames_done = 0;
            }
        }
        
    }

    //x,y  coordenadas del raton
    isHit(x,y) {
        return (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height);
    }
}