import * as UTILS from '../game/utils.js';
import * as BUTTON from '../game/button.js';

export class Ability {
    constructor( _image ) {
        this.x = 925;
        this.y = 175;
        this.width = 100;
        this.height = 100;
    }

    draw( ctx ) {
        ctx.fillStyle = 'red';
        UTILS.fillRectAtPoint(  ctx, this.x, this.y, this.width, this.height);
    }
}