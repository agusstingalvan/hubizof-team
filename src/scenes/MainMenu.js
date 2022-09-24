import Button from "../js/functions/Button.js";

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super("MainMenu");
    }

    preload(){}

    create() {
        let b = new Button(100, 200,"B", ()=>(this.scene.start("Preload")) , 1 )
    }

    update(){}
}