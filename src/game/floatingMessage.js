export class floatingMessage {
    constructor( _x, _y, _message, _size, _life, _color="rgba(255, 255, 255," ) {
        this.x = _x;
        this.y = _y;
        this.message = _message;
        this.size = _size;
        this.life = _life;
        this.color = _color;
    }

    update() {
        this.y -= 1;
        if ( this.life > 0.1 ) {
            this.life -= 0.1;
        }
    }

    draw( ctx ) {
        ctx.font = this.size.toString() + "px 'Press Start 2P'";
        ctx.fillStyle = this.color + this.life + ")";
        ctx.fillText( this.message, this.x, this.y );
    }
}