import Button from "../js/functions/Button.js";

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super("MainMenu");
    }
    create() {
        //background MENU
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "backMenu")
        .setScale(1.95)
        
        this.Menuanimado = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY).play('MenuAnimado');

        // parametros button scene, x, y, texture, text, callback, scale
        this.btnPlayRunner = new Button(this,this.game.config.width-200, this.cameras.main.centerY/.85, "btn" ,"Jugar", 28, ()=>{this.scene.start("Habitacion")}, 1.8);

        this.btnCreditos = new Button(this,this.game.config.width-200, this.cameras.main.centerY/.71, "btn" ,"Creditos", 24, ()=>{this.scene.start("Creditos")}, 1.5);
    }
}