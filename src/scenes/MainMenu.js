import Button from "../js/functions/Button.js";

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super("MainMenu");
    }
    init(data){
        
    }
    preload(){}

    create() {
        new Button(this,100, 200, "btn" , ()=>{this.scene.start('Runner')}, 0.2);
    }
    update(){}
}