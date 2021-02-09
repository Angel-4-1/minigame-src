import * as UTILS from '../game/utils.js';
var pause_event = new Event('pause');

export class Obstacle {
    constructor(_sprite, _x, _y, _width, _height, _speed, _type, _spawn_points) {
        this.sprite = _sprite;
        this.x = _x;            //Posicion
        this.y = _y;            
        this.width = _width;    //Dimensiones
        this.height = _height;
        this.speed = _speed;    //Velocidad
        this.type = _type.id;      //Tipo de obstaculo
        this.spawn_points = _spawn_points;
        this.isHit = false;
        this.sx = _type.x;
        /*Puntos de aparicon, tendra la siguiente estructura: 
          spawn_points: { total: X, points: [] } */
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        UTILS.drawImageAtPoint(ctx, this.sprite, this.sx, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    update(gamespeed, canvas, score, elapsed_time) {
        //var temp = Math.floor( gamespeed * elapsed_time );

        this.y += this.speed * gamespeed;
        if ( this.y > canvas.height + this.height ) {
            this.y = 0 - this.height;
            //Escoger un nuevo punto de aparicion en el eje x
            this.x = this.getSpawnedPoint();
            if (!this.isHit) {
                score++;

                var rt = getRandomObstacleType();
                this.sx = OBS_TYPE[rt].x;
                this.type = OBS_TYPE[rt].id;
            }

            this.isHit = false;
        }

        return score;
    }

    getSpawnedPoint() {
        //Obtener numero aleatorio en el rango [0, spawn_points.length)
        var random = Math.floor(Math.random() * this.spawn_points.total);
        
        //Asegurarse que random esta en el rango
        if ( random >= 0 && random < this.spawn_points.total ) {
            return this.spawn_points.points[random];
        }

        return this.spawn_points.points[0];
    }
}

function getRandomObstacleType() {
    return Math.floor( Math.random() * OBS_TYPE.length );
}

export function initObstacles(_sprite, obstacles_array, spawn_points) {
    for (let i = 0; i < 2; i++) {
        var y = i * -750;
        var random = Math.floor(Math.random() * spawn_points.total);
        var x = 0;

        //Seleccionar un punto aleatorio de aparicion
        if ( random >= 0 && random < spawn_points.total ) {
            x = spawn_points.points[random];
        } else {
            x = spawn_points.points[0];
        }

        var random_type = getRandomObstacleType();

        obstacles_array.push(new Obstacle(_sprite, x, y, 250, 225, 1, OBS_TYPE[random_type], spawn_points) ); 
    }
    
    return obstacles_array;
}

export function handleObstacles(obstacles_array, ctx, canvas, gamespeed, score, elapsed_time) {
    var _score = score;
    for (let i = 0; i < obstacles_array.length; i++ ) {
        _score = obstacles_array[i].update(gamespeed, canvas, _score, elapsed_time);
        obstacles_array[i].draw(ctx);
    }
    return [obstacles_array, _score];
}

const OBS_TYPE = [
    { type: "ID"         , x: 0    , y: 0 },
    { type: "PASSWORD"   , x: 250  , y: 0 },
    { type: "HOME"       , x: 500  , y: 0 },
    { type: "CREDITCARD" , x: 750  , y: 0 },
    { type: "BANKDATA"   , x: 1000 , y: 0 }
]