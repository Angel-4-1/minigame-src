export class Particle {
    constructor(_x, _y, _color) {
        this.x = _x;
        this.y = _y;
        this.radius = Math.random() * 20 + 1;
        this.opacity = 1;
        this.direction_x = Math.random() * 1 - 0.5; //-0.5  a  0.5
        this.direction_y = Math.random() * 1 - 0.5; //-0.5  a  0.5
        //this.color = 'hsl(' + hue + ',100%, 50%, 0.8)';
        this.style = null;
        this.color = _color;
    }

    update(gamespeed = 1) {
        this.x += this.direction_x;
        this.y += this.direction_y;
        if ( this.opacity > 0.1 ) {
            this.opacity -= 0.9;
        }
        if ( this.radius > 0.15) {
            this.radius -= 0.14;
        }
    }

    getStyle() {
        return this.color + this.opacity + ')';
    }

    draw( ctx ) {
        ctx.fillStyle = this.style == null ? this.getStyle() : this.style;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }
}