export class Gamemap {
    constructor(_tileset, _map, _canvas) {
        this.tile_width  = 100;             //dimensiones en pixeles de cada tile
        this.tile_height = 100; 
        this.map = _map;
        this.map_width  = 10;               //de cuantos tiles se compone en mapa
        this.map_height = 10;
        this.y = 0;
        this.y2 = _canvas.height;
        this.width  = _canvas.width;
        this.height = _canvas.height - 100;
        this.tileset = _tileset;            //sprite con los dibujos de cada celda
    }

    drawMap(gamespeed, ctx) {
        if (this.y + gamespeed >= this.height + this.tile_height) {
            this.y = -this.height - this.tile_height + gamespeed;
        } else {
            this.y += gamespeed;
        }

        if (this.y2 + gamespeed >= this.height + this.tile_height) {
            this.y2 = -this.height - this.tile_height + gamespeed;
        } else {
            this.y2 += gamespeed;
        }
        //Fondo 1
        this.drawSection(this.y, ctx);

        //Fondo 2
        this.drawSection(this.y2, ctx);
    }

    drawSection(y_section, ctx) {
        for(var x = 0; x < this.map_width; x++) {
            for (var y = 0; y < this.map_height; y++) {
                var sx, sy;
                var t = this.map[ ( (y*this.map_width) + x ) ];
                switch( t ) {
                    case 0: //EMPTY
                        continue;
                    default:
                        sx = TILE[t].x * this.tile_width;
                        sy = TILE[t].y * this.tile_height;
                        break;
                }
                //No dibujar si esta fuera de la pantalla
                var final_y = y_section + y*this.tile_height;
                if ( final_y >= - this.tile_height && final_y <= this.height + this.tile_height) {
                    //ctx.fillRect(x*this.tile_width, final_y, this.tile_width, this.tile_height);
                    ctx.drawImage(this.tileset, sx, sy, this.tile_width, this.tile_height, x*this.tile_width, final_y, this.tile_width, this.tile_height)
                }
            }
        }
    }
}

const TILE = {
    0: { type: "EMPTY"       , x: 0 , y: 0 },
    1: { type: "GREEN_GRAY"  , x: 0 , y: 0 },
    2: { type: "GRAY_GREEN"  , x: 1 , y: 0 },
    3: { type: "GRAY"        , x: 2 , y: 0 },
    4: { type: "GRAY_YELLOW" , x: 0 , y: 1 },
    5: { type: "WHITE_GRAY"  , x: 1 , y: 1 },
    6: { type: "GRAY_WHITE"  , x: 2 , y: 1 },
    7: { type: "LEFT_TREE"   , x: 0 , y: 2 },
    8: { type: "RIGHT_TREE"  , x: 1 , y: 2 },
}

