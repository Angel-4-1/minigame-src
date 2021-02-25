import * as UTILS from '../game/utils.js';

export class Explosion {
    constructor( _sprite, _x, _y, _width, _height, _size ) {
        this.sprite = _sprite;
        this.x = _x;
        this.y = _y;
        this.frameX = 0;
        this.frameY = 0;
        this.width = _width;
        this.height = _height;

        this.frames_done = 0;
        this.current_frame = 0;
        this.speed_frames = 5;
    }

    update(  ) {
        this.frames_done++;

        if ( this.frames_done > this.speed_frames ) {
            this.frames_done = 0;
            this.current_frame++;

            if ( this.current_frame >= this.frames ) {
                this.current_frame = 0;
            }
        }
    }

    draw( ctx ) {
        UTILS.drawImageAtPoint(ctx, this.sprite, this.current_frame * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}