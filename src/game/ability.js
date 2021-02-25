import * as UTILS from '../game/utils.js';

export class Ability {
    constructor( _image, fill = "rgba(0, 204, 204, 0.2)" ) {
        this.x = 925;
        this.y = 175;
        this.width = 100;
        this.height = 100;
        this.color = fill;
        this.type = 0;
    }

    draw( ctx, canvas, player_pos = null ) {
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        switch( this.type ) {
            case 1:
                ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
                UTILS.fillRectAtPoint(ctx, player_pos.x, player_pos.y, 200, 200);
                break;
            default:
                break;
        }
    }
}