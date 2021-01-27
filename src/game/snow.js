import * as PARTICLE from '../game/particles.js';

export class Snow {
    constructor(_canvas_width, _canvas_height) {
        this.particles_array = [];
        this.max_particles = 75;
        this.width = _canvas_width; 
        this.height = _canvas_height;
    }

    update () {
        for ( var i = 0; i < this.particles_array.length; i++ ) {
            this.particles_array[i].x += this.particles_array[i].speed_x;
            this.particles_array[i].y += this.particles_array[i].speed_y;

            if ( this.particles_array[i].y > this.height ) {
                this.particles_array[i].x = Math.random() * this.width * 1.5;
                this.particles_array[i].y = -50;
            }

        }
    }

    createSnowParticles() {
        for ( var i = 0; i < this.max_particles; i++ ) {
            var x = Math.random() * this.width;
            var y = Math.random() * this.height;
            var myParticle = new PARTICLE.Particle( x, y );
            myParticle.opacity = 0;
            myParticle.speed_x = Math.random( ) * 10 - 5;
            myParticle.speed_y = Math.random( ) * 10 + 1;
            myParticle.radius = Math.random( ) * 10 + 1;
            this.particles_array.push( myParticle );
        }
    }

    draw( ctx ) {
        for ( var i = 0; i < this.particles_array.length; i++ ) {

            
            var particle = this.particles_array[i];
            var gradient = ctx.createRadialGradient(
                particle.x,
                particle.y,
                0,
                particle.x,
                particle.y,
                particle.radius
            );

            gradient.addColorStop(0, "rgba(255, 255, 255" + particle.opacity + ")");   //white

            gradient.addColorStop(0.8, "rgba(210, 236, 242" + particle.opacity + ")");   //bluish

            gradient.addColorStop(1, "rgba(237, 247, 249" + particle.opacity + ")");   //lighter bluish

            particle.style = gradient;
            particle.draw( ctx );
        }
    }
}