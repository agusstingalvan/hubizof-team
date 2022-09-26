import Button from "./Button.js"

export class PopUp{
    constructor(scene, x, y, text, color ){
        
        /*this.container = scene.add.container(x, y);
        console.log(this.container)
        
        this.graphics = scene.add.graphics();
    
        this.graphics.fillStyle(color, 1);
        this.graphics.fillRect(0, 0, 600, 200);

        this.txt = scene.add
        .text(300, 100, text, {fontSize: 30, fontStyle: 'bold'})
        .setOrigin(0.5);

        this.container.add([this.graphics, this.txt]);*/

        
        /*this.tile = scene.add.image(x, y, "btn").setScale(.2)*/

        this.centroX = scene.cameras.main.centerX;
        this.centroY = scene.cameras.main.centerY;
        this.move = scene.cameras.main.centerX/2;



        this.container = scene.add.container(x, y)

        this.tile = scene.add.image(0, 0, "btn").setScale(.7)
        
        this.txt = scene.add
        .text(0, -60, text, {fontSize: 60, fontStyle: 'bold' })
        .setOrigin(.55)
        .setScale(.3)

        

        this.botonMini = new Button (scene, this.centroX+200, this.centroY+this.move, "btn", ">", 50, ()=> {scene.scene.start("EscenadeMinijuego")}, .1);
        
        
        this.container.add(this.tile)
        this.container.add(this.txt)

        

        
        
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


