import Button from "../js/functions/Button.js";

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super("MainMenu");
    }
    preload(){}

    create() {
        new Button(this,100, 200, "btn" , ()=>{console.log('Hola')}, 0.2)
    }
    update(){}
}