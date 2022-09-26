import { PopUp } from "../functions/PopUp.js";

export class Npc {

    constructor(scene, x, y, texture, scale ){

        //this.scene = scene;

        //this.scene.add.existing(this);
        //this.scene.physics.add.existing(this);

        //this.container = scene.add.container(x, y);

        this.img = scene.physics.add.staticImage(x, y, texture)
        //this.img = scene.add.image(0, 0, texture)
        .setScale(scale)
        this.img.refreshBody()
        //.setInteractive()
        //.on("pointerdown", ()=> new PopUp(scene,x, y, "hola muy buenas", 0x808012))

        //this.img.setPushable(false);
        //this.img.setImmovable();
        //this.img.setBounce(1);
        //this.img.setCollideWorldBounds(true);

        //this.container.add([this.img]);

        //this.physics = this.physics.world.enable([ this.container ]);
        
        //this.scene.physics.add.existing(this)
    }

    makePopUp(scene,x ,y, text){
        new PopUp(scene,x, y, text, 0x808012)
    }



}





/*let tile = this.add.image(200, 200, "btn").setScale(.2)

        
        let tween = this.tweens.add({
            targets: tile,
            x: 600,
            y:600,
            scaleY:.6,
            scaleX:1.2,
            ease: 'Power1',
            duration: 2000,
        });*/