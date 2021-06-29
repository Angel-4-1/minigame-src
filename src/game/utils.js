//Dibujar la imagen centrada en el punto x,y
export function drawImageAtPoint(ctx, img, sx, sy, swidth, sheight, x, y, width, height) {
    var new_x = Math.floor( x - width/2 );
    var new_y = Math.floor( y - height/2 );

    ctx.drawImage(img, sx, sy, swidth, sheight, new_x, new_y, width, height);
}

export function fillRectAtPoint(ctx, x, y, width, height) {
    var new_x = x - width/2;
    var new_y = y - height/2;

    ctx.fillRect(new_x, new_y, width, height);
}

/*Mirar si hay una collision considerando que los rectangulos estan expreados de la forma

 (x,y) --------------- (x+width,y)
   |                       |
   |                       |
 (x,y+height) ---- (x+width,y+height)

*/
export function collisionTopLeft(rect1_x, rect1_y, rect1_width, rect1_height, rect2_x, rect2_y, rect2_width, rect2_height) {
    //mirar si se solapan
    if (rect1_x < rect2_x + rect2_width &&
        rect1_x + rect1_width > rect2_x &&
        rect1_y < rect2_y + rect2_height &&
        rect1_height + rect1_y > rect2_y) {
        
        return true;
    }

    return false;
}

/*Mirar si hay una collision considerando que los rectangulos estan expreados de la forma

 (x-width/2,y-height/2) ---------------- (x+width/2,y-height/2)
   |                       |                       |
   | ------------------- (x,y) ------------------- |
   |                       |                       |
 (x-width/2,y+height/2) ----- (x+width/2,y+height/2)

*/
export function collisionCenter(rect1_x, rect1_y, rect1_width, rect1_height, rect2_x, rect2_y, rect2_width, rect2_height, tolerance = false) {
    
    try {
        var new_x1 = Math.floor( rect1_x - rect1_width/2 );
        var new_y1 = Math.floor( rect1_y - rect1_height/2 );
        var new_x2 = Math.floor( rect2_x - rect2_width/2 );
        var new_y2 = Math.floor( rect2_y - rect2_height/2 );

        if ( tolerance == false ) {
            //mirar si se solapan
            if (new_x1 < new_x2 + rect2_width &&
                new_x1 + rect1_width > new_x2 &&
                new_y1 < new_y2 + rect2_height &&
                rect1_height + new_y1 > new_y2) {
                
                return true;
            }
            
        } else {
            //mirar si se solapan dejando un margen simulando la perspective
            if (new_x1 + rect1_width/4 < new_x2 + rect2_width &&
                new_x1 + rect1_width - rect1_width/4 > new_x2 &&
                new_y1 + rect1_height/2 < new_y2 + rect2_height &&
                rect1_height + new_y1 > new_y2) {
                
                return true;
            }
        }

        return false;
        
    } catch(err) {
        return false;
    }  
}