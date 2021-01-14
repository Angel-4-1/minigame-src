export class Button {
    constructor(_sprite, _x, _y, _width, _height, _offset, _active) {
        this.sprite = _sprite;
        this.x = _x;
        this.y = _y;
        this.width = _width;
        this.height = _height;
        this.offset = _offset;
        this.active = _active;
        this.size_width = 128;      //dimensiones del boton en el canvas
        this.size_height = 128;
    }
    
    draw(ctx) {
        ctx.drawImage(this.sprite, this.active ? this.offset : 0, 0, this.size_width, this.size_height, this.x, this.y, this.width, this.height);
    }

    update() {

    }

    //x,y  coordenadas del raton
    isHit(x,y) {
        return (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height);
    }
}