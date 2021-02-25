import * as UTILS from '../game/utils.js';


export class Resource {
    constructor(_sprite, _x, _y, _width, _height, _speed, _type, _spawn_points) {
        this.sprite = _sprite;
        this.x = _x;            //Posicion
        this.y = _y;            
        this.width = _width;    //Dimensiones
        this.height = _height;
        this.speed = _speed;    //Velocidad
        this.type = _type.type;      //Tipo
        this.spawn_points = _spawn_points;
        this.isHit = false;
        this.sx = _type.x;
        this.isEnd = false; //needs to be destroyed
        /*Puntos de aparicon, tendra la siguiente estructura: 
          spawn_points: { total: X, points: [] } */
    }

    update(gamespeed, canvas, elapsed_time) {
        this.y += this.speed * gamespeed;

        if ( this.y > canvas.height + this.height) {
            this.isEnd = true;
        }
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

    draw( ctx ) {
        //ctx.fillStyle = 'red';
        //UTILS.fillRectAtPoint( ctx, this.x, this.y, this.width, this.height );
        UTILS.drawImageAtPoint(ctx, this.sprite, this.sx, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}

function getRandomResourceType() {
    return Math.floor( Math.random() * OBS_TYPE.length );
}

export function createResource( _sprite, spawn_points, minY = 0 ) {

    var y = 0;
    if ( (y + 100) >= minY ) {
        y = minY - 200;
    }

    if ( y < -500 ) {
        return null;
    }

    var random = Math.floor(Math.random() * spawn_points.total);
    var x = 0;

    //Seleccionar un punto aleatorio de aparicion
    if ( random >= 0 && random < spawn_points.total ) {
        x = spawn_points.points[random];
    } else {
        x = spawn_points.points[0];
    }

    var random_type = getRandomResourceType();

    return new Resource(_sprite, x, y, 100, 100, 1, OBS_TYPE[random_type], spawn_points);
}

const OBS_TYPE = [
    { type: "QUIZ"         , x: 0    , y: 0 },
    { type: "HEALTH"       , x: 100  , y: 0 }
]