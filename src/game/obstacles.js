import * as UTILS from '../game/utils.js';

export class Obstacle {
    constructor(_sprite, _x, _y, _width, _height, _speed, _type, _spawn_points, _spx = 345, _level = 0) {
        this.sprite = _sprite;
        this.x = _x;            //Posicion
        this.y = _y;            
        this.width = 250;    //Dimensiones
        this.height = 225;
        this.swidth = _width;    //Dimensiones canvas
        this.sheight = _height;
        this.speed = _speed;    //Velocidad
        this.type = _type.type;      //Tipo de obstaculo
        this.spawn_points = _spawn_points;
        this.isHit = false;
        this.sx = _type.x;
        this.isEnd = false; //needs to be destroyed
        this.show = true;
        this.t = 0;
        this.spx = _spx;
        this.level = _level;
        /*Puntos de aparicon, tendra la siguiente estructura: 
          spawn_points: { total: X, points: [] } */
    }

    draw(ctx) {
        if ( this.show ) {
            UTILS.drawImageAtPoint(ctx, this.sprite, this.sx, 0, this.width, this.height, this.x, this.y, this.swidth, this.sheight);
        }
    }

    update(gamespeed, canvas, score, elapsed_time) {
        //var temp = Math.floor( gamespeed * elapsed_time );

        this.y += this.speed * gamespeed;

        if ( this.level == 1 ) {
            this.t += 0.5 * gamespeed * elapsed_time;
            this.x = this.spx + ( Math.sin( this.t ) * 150 );
        }
        
        if ( this.y > canvas.height + this.height) {
        //this.y += this.speed * gamespeed * elapsed_time * 60;
        //if ( this.y > canvas.height + this.height - temp) {
            //this.y = 0 - this.height;
            if (!this.isHit) {
                score++;
            }
            this.isEnd = true;
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

export function createObstacle( _sprite, _sizeX, _sizeY, spawn_points, level, minY = 0, minX = 0, fixY = false ) {

    var y = 0;
    if ( !fixY ) {
        if ( (y + 225) >= minY ) {
            y = minY - 400;
        }

        if ( y < -500 ) {
            return null;
        }
    }

    var random = Math.floor(Math.random() * spawn_points.total);
    //345 650
    var rnd = Math.floor( Math.random() * 2 );
    var spx = rnd == 0 ? 345 : 650;
    var x = 0;

    //Seleccionar un punto aleatorio de aparicion
    if ( random >= 0 && random < spawn_points.total ) {
        x = spawn_points.points[random];
    } else {
        x = spawn_points.points[0];
    }

    if ( fixY ) {
        y = minY;

        while ( x == minX ) {
            random = Math.floor(Math.random() * spawn_points.total);
            if ( random >= 0 && random < spawn_points.total ) {
                x = spawn_points.points[random];
            } else {
                x = spawn_points.points[0];
            }
            
        }
    }

    var random_type = getRandomObstacleType();

    return new Obstacle(_sprite, x, y, _sizeX, _sizeY, 1, OBS_TYPE[random_type], spawn_points, spx, level);
} 

export function initObstacles(_sprite, _sizeX, _sizeY, obstacles_array, spawn_points, level) {
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

        obstacles_array.push(new Obstacle(_sprite, x, y, _sizeX, _sizeY, 1, OBS_TYPE[random_type], 345, level) ); 
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