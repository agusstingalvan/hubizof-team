
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
        new PopUp(scene,x, y, text, 0x808012, this.nameNextScene, this.configNextScene)
    }



}
