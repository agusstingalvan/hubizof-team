import Button from "./Button.js"

export class PopUp{
    constructor(scene, x, y, text, color, nameNextScene, configNextScene ){
        

        this.centroX = scene.cameras.main.centerX;
        this.centroY = scene.cameras.main.centerY;
        //console.log(this.centroX)

        this.xx = game.config.width/2.13;
        this.yy = game.config.height/4.5;

        this.yyy = game.config.height/7;
        
        this.move = scene.cameras.main.centerX/2;

        this.container = scene.add.container(this.centroX, this.centroY+this.move);
        //this.container = scene.add.container(x, y);
        
        this.graphics = scene.add.graphics();
        this.graphics.fillStyle(0x000000, 1)
        this.graphics.fillRect(-this.xx, -this.yy, 1200, 200)


        this.txt = scene.add
        .text(0, -this.yyy, text, {fontSize: 100, fontStyle: 'bold' })
        .setOrigin(.5)
        .setScale(.3)

        // this.containerPad = scene.add.container(this.centroX, this.centroY+this.move);
        

        // this.botonMini = new Button (scene, this.centroX+200, this.centroY+this.move, "btn", "Acepto", 24, ()=> {scene.scene.start(nameNextScene, configNextScene)}, .1);

        


        // this.botonRemove = new Button (scene, 300, this.centroY+this.move, "btn", "X", 24, ()=> {this.invisible()}, .1);
        
        
        this.txt2 = scene.add
        .text(0, 500, "text", {fontSize: 100, fontStyle: 'bold' }).setInteractive({ useHandCursor: true }).on("pointerdown", () => {
            console.log("asd")
            console.log(this.container)
            this.container.visible = false;
        })
        
        this.container.add([this.graphics, this.txt])
    }

    invisible(){
        this.container.visible = false;
        this.botonMini.visible();
        this.botonRemove.visible=false;
    }

    Movement(scene, x, y, text){


        /*this.container = scene.add.container(x, y)
        let tile = scene.add.image(0, 0, "btn").setScale(.7)
        
        let txt = scene.add
        .text(0, 0, text, {fontSize: 50, fontStyle: 'bold' })
        .setOrigin(.5)
        .setScale(.3)

        this.container.add(tile)
        this.container.add(txt)*/

        //this.container.add(this.boton)
        //this.container.add(graphics)
        //container.add(tween)
        /*let tween = scene.tweens.add({
            targets: this.container,
            x: 1280/2,
            y:600,
            //scaleY:.6,
            //scaleX:1.2,
            ease: 'Power1',
        })*/
        //container.add(tween)
        //.setScale(.2)


    }
}


