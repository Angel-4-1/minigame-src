export class Particle {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
        this.radius = Math.random() * 20 + 1;
        this.opacity = 1;
        this.direction_x = Math.random() * 1 - 0.5; //-0.5  a  0.5
        this.direction_y = Math.random() * 1 - 0.5; //-0.5  a  0.5
        //this.color = 'hsl(' + hue + ',100%, 50%, 0.8)';
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

    draw(ctx) {
        ctx.fillStyle = 'rgba(0, 0, 0,' + this.opacity + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }
}