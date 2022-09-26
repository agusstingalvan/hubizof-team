import Button from "../js/functions/Button.js";

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super("MainMenu");
    }
    preload(){}

    create() {

        //background MENU
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "backMenu")
        .setScale(1.95)

        // parametros button scene, x, y, texture, text, callback, scale
        new Button(this,1000, 360, "btn" ,"Jugar", 25, ()=>{this.scene.start("Habitacion")}, 0.4);

        /*new Button(this,1000, 460, "btn" ,"Opciones", 25, ()=>{console.log('Hola')}, 0.4);

        new Button(this,1000, 560, "btn" ,"*", 25, ()=>{console.log('Hola')}, 0.4);*/


    }
    update(){}
}