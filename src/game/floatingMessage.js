export class floatingMessage {
    constructor( _x, _y, _message, _size, _life ) {
        this.x = _x;
        this.y = _y;
        this.message = _message;
        this.size = _size;
        this.life = _life;
    }

    update() {
        this.y -= 2;
        if ( this.life > 0.1 ) {
            this.life -= 0.1;
        }
    }

    draw( ctx ) {
        ctx.font = this.size.toString() + "px 'Press Start 2P'";
        ctx.fillStyle = "rgba(255, 255, 255, " + this.life + ")";
        ctx.fillText( this.message, this.x, this.y );
    }
}