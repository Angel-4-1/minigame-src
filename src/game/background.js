export class Background {
    constructor(_image, _canvas) {
        this.image = _image;
        this.x = 0;
        this.y = 0;
        this.y2 = _canvas.height;
        this.width  = _canvas.width;
        this.height = _canvas.height;
    }

    handleBackground(gamespeed, ctx) {
        if (this.y + gamespeed >= this.height) {
            this.y = -this.height + gamespeed;
        } else {
            this.y += gamespeed;
        }

        if (this.y2 + gamespeed >= this.height) {
            this.y2 = -this.height + gamespeed;
        } else {
            this.y2 += gamespeed;
        }

        //Tenemos 2 imagenes identicas, una encima de la otra
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x, this.y2, this.width, this.height);
    }
}