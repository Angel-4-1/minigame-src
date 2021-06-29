import * as UTILS from '../game/utils.js';

export class Obstacle {
    constructor(_sprite, _x, _y, _width, _height, _speed, _type, _spx = 345, _level = 0) {
        this.sprite = _sprite;
        this.x = _x;                //Posicion
        this.y = _y;            
        this.width = 250;           //Dimensiones
        this.height = 225;
        this.swidth = _width;       //Dimensiones canvas
        this.sheight = _height;
        this.speed = _speed;        //Velocidad
        this.type = _type.type;     //Tipo de obstaculo
        this.isHit = false;
        this.sx = _type.x;
        this.isEnd = false;         //needs to be destroyed
        this.show = true;
        this.t = 0;
        this.spx = _spx;
        this.level = _level;
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
            this.x = this.spx + ( Math.sin( this.t + this.sx ) * 150 );
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
}

function getRandomObstacleType() {
    return Math.floor( Math.random() * OBS_TYPE.length );
}

export function createObstacle( _sprite, _sizeX, _sizeY, spawn_points, level, minY = 0, minX = [], fixY = false ) {

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
    /*Puntos de aparicon, tendra la siguiente estructura: 
        spawn_points: { total: X, points: [] } */
    if ( random >= 0 && random < spawn_points.total ) {
        x = spawn_points.points[random];
    } else {
        x = spawn_points.points[0];
    }

    if ( fixY ) {
        y = minY;
        
        //No queremos crear el obstáculo donde ya habia otro
        if(minX.length == 1) {
            while ( x == minX ) {
                random = Math.floor(Math.random() * spawn_points.total);
                if ( random >= 0 && random < spawn_points.total ) {
                    x = spawn_points.points[random];
                } else {
                    x = spawn_points.points[0];
                }
                
            }
        } else if (minX.length == 2){
            var x1 = minX[0];
            var x2 = minX[1];
            var arr = [];
            for (var i = 0; i < spawn_points.total; i++) {
                var point = spawn_points.points[i]
                if (point != x1 && point != x2) {
                    arr.push( point );
                }
            }
            random = Math.floor(Math.random() * arr.length);
            x = arr[random];
        }
        
    }

    var random_type = getRandomObstacleType();

    return new Obstacle(_sprite, x, y, _sizeX, _sizeY, 1, OBS_TYPE[random_type], spx, level);
} 


const OBS_TYPE = [
    { type: "ID"         , x: 0    , y: 0 },
    { type: "PASSWORD"   , x: 250  , y: 0 },
    { type: "HOME"       , x: 500  , y: 0 },
    { type: "CREDITCARD" , x: 750  , y: 0 },
    { type: "BANKDATA"   , x: 1000 , y: 0 },
    { type: "HOLIDAY"    , x: 1250 , y: 0 },
    { type: "PHONE"      , x: 1500 , y: 0 }
]