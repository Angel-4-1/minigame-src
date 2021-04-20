import * as PARTICLE from '../game/particles.js';
import * as UTILS from '../game/utils.js';
import * as ABILITY from '../game/ability.js';

export class Player {
    constructor(_sprite, _animation, _frames, _SPRITE_SIZE_X, _SPRITE_SIZE_Y, _health) {
        this.sprite = _sprite;               //imagen sprite
        this.sprite_x = 0; this.sprite_y = 0;
        this.sprite_width = 0; this.sprite_height = 0; this.sprite_right = 0; this.sprite_bottom = 0;
        this.animation = _animation;                //animaciones  []
        this.animation_set = [];            //animacion que esta siendo utilizada  []
        this.frames = _frames;                    //de cuantos frames se compone cada set de animaciones
        this.current_frame = 0;             //frame en el que estamos
        this.speed = 500;                    //velocidad a la que se mueve
        this.pos = { x: 500, y: 855 };      //posicion
        this.target_pos = { x: 0, y: 0 };   //posicion objetivo
        this.offset = {x: 0, y: 0};         //donde se guarda la posicion central del sprite
        this.SPRITE_SIZE_X = _SPRITE_SIZE_X;            //dimensiones de cada frame
        this.SPRITE_SIZE_Y = _SPRITE_SIZE_Y;
        this.FRONT = 0;                     //posiciones animaciones
        this.RIGHT = 1;
        this.LEFT = 2;
        this.BACK = 3;
        this.particles_array = [];
        this.max_particles = 100;
        this.isMoving = false;
        this.canMove = true;
        this.frames_done = 0;
        this.speed_frames = 10;
        this.ability = new ABILITY.Ability();
        this.has_ability = true;
        this.particle_color = 'rgba(0, 0, 0,';
        this.lives =  _health;
        this.initial_lives = _health;
    }

    update(timestamp, gamespeed, frames_done) {
        this.frames_done++;

        if ( this.frames_done > this.speed_frames ) {
            this.frames_done = 0;
            this.current_frame++;

            if ( this.current_frame >= this.frames ) {
                this.current_frame = 0;
            }
        }
        /*
        if ( this.start === undefined ) {
            this.start = timestamp;
        }
        const elapsed = timestamp - this.start;
        if ( elapsed >= 200 ) {
            this.start = timestamp;
            this.current_frame++;

            if ( this.current_frame >= this.frames ) {
                this.current_frame = 0;
            }
        }
        /*
        if ( this.current_frame > this.frames ) {
            this.current_frame = 0;
        } else if ( frames_done % 3 == 0) {
            this.current_frame++;
        }*/
    }

    setAnimation(anim) {
        this.animation_set = this.animation[anim];
    }

    //direction --> true = hacia la derecha  |  false = hacia la izquierda
    move( direction ) {
        if(!this.canMove) return;

        let target_x;
        if( direction ) {
            this.setAnimation(this.RIGHT);
            target_x = this.pos.x + 0.5 * this.speed;
        } else {
            this.setAnimation(this.LEFT);
            target_x = this.pos.x - 0.5 * this.speed;
        }

        if( this.isValidPosition(target_x) ) { this.pos.x = target_x; }

        this.isMoving = true;
    }

    moveOnMouseDown( elapsed_time, gamespeed ) {
        if(!this.canMove) return;

        if ( this.target_pos.x - (this.SPRITE_SIZE_X / 4) < this.pos.x + this.offset.x ) {
            var target_x = this.pos.x - 0.25 * this.speed * elapsed_time * gamespeed;
            this.isMoving = true;
            if( this.isValidPosition(target_x) ) { this.pos.x = target_x; }
        } else if ( this.target_pos.x - (this.SPRITE_SIZE_X / 2) > this.pos.x + this.offset.x ) {
            var target_x = this.pos.x + 0.25 * this.speed * elapsed_time * gamespeed;
            this.isMoving = true;
            if( this.isValidPosition(target_x) ) { this.pos.x = target_x; }
        } else {
            this.setAnimation(this.BACK);
            this.mouseIsDown = false;
            this.isMoving = false;
        }
    }

    onMouseUp() {
        this.isMoving = false;
        this.animation_set = this.animation[this.BACK];
    }

    //comprobr si la posicion a la que se quiere mover es valida
    isValidPosition(x) {
        if ( x >= 100 && x <= 900 ) {
            return true;
        }

        return false;
    }

    //ctx = context canvas
    draw(ctx) {
        ctx.drawImage(this.sprite, this.animation_set[this.current_frame].x * this.SPRITE_SIZE_X, this.animation_set[this.current_frame].y * this.SPRITE_SIZE_Y, this.SPRITE_SIZE_X, this.SPRITE_SIZE_Y, Math.floor(this.pos.x + this.offset.x), Math.floor(this.pos.y + this.offset.y), this.SPRITE_SIZE_X, this.SPRITE_SIZE_Y);

        this.handleParticle(ctx);

        /*
        if ( this.has_ability ) {
            this.ability.draw( ctx );
        }*/
    }

    drawHitVersion( ctx ) {
        this.sprite
    }

    mousedown(x, y) {
        //true = se ha de mover  |  false = se queda quieto
        //Donde estan estas coordenadas respecto al player ?
        if ( x < this.pos.x + this.offset.x) {          //Antes
            this.setAnimation(this.LEFT);
            this.isMoving = true;
        } else if ( x > this.pos.x + this.offset.x ) {   //Despues
            this.setAnimation(this.RIGHT);
            this.isMoving = true;
        } else {    //Justo encima
            this.setAnimation(this.BACK);
            return false;
        }
        
        this.target_pos = { x: x , y: y };

        return true;
    }
    
    reset() {
        this.pos = { x: 500, y: 855 };
        this.lives = this.initial_lives;
    }

    
    handleParticle(ctx) {
        if (this.isMoving) this.particles_array.unshift(new PARTICLE.Particle(this.pos.x, this.pos.y + this.SPRITE_SIZE_Y/3, this.particle_color));

        for (let i = 0; i < this.particles_array.length; i++ ) {
            this.particles_array[i].update();
            this.particles_array[i].draw(ctx);
        }

        //if more than 200, remove 20
        if ( ( this.particles_array.length > this.max_particles + 10)  ) {
            for (let i = 0; i < 20; i++) {
                this.particles_array.pop(this.particles_array[i]);
            }
        }
    }

    changeParticleColor( color ) {
        this.particle_color = color;
    }

    updateLive( ) {
        this.lives--;
        if ( this.lives < 1 ) {
            return false;
        }

        return true;
    }

    increaseLive( ) {
        this.lives++;
    }
}