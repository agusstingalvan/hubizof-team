import { PopUp } from "../functions/PopUp.js";

export class Npc {
    nameNextScene;
    configNextScene;
    
    constructor(scene, x, y, texture, scale, nameNextScene, config){
        this.nameNextScene = nameNextScene;
        this.configNextScene = config;

        this.img = scene.physics.add.staticImage(x, y, texture)
        .setScale(scale)
        this.img.refreshBody()
    }

    makePopUp(scene,x ,y, text){
        this.pop = new PopUp(scene,x, y, text, 0x808012, this.nameNextScene, this.configNextScene)
    }

    // hidePopUp(){
    //     // scene.this.pop.container.visible=false;
    //     // scene.this.pop.botonMini.container.visible=false;
    //     this.pop.invisible();
    // }



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