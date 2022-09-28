import Button from "../js/functions/Button.js";
import SoundsManage from "../js/functions/SoundsManage.js";

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super("MainMenu");
    }
    create() {
        
        const sonidos = new SoundsManage(this.sound);
        sonidos.sound.musicMenu.play();
        //background MENU
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "menustatico")
        
        // this.Menuanimado = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY).play('MenuAnimado');

        // parametros button scene, x, y, texture, text, callback, scale
        this.btnPlayRunner = new Button(this,this.game.config.width-200, this.cameras.main.centerY/.85, "btn" ,"Jugar", 28, ()=>{this.scene.start("Habitacion", {sonidos})}, 1.8);

        this.btnCreditos = new Button(this,this.game.config.width-200, this.cameras.main.centerY/.71, "btn" ,"Creditos", 24, ()=>{this.scene.start("Creditos", {sonidos})}, 1.5);
        this.add.text(this.cameras.main.centerX/1.5, this.cameras.main.centerY/5,'Violeta y sus pesadillas' , {fontFamily: 'Open Sans', fontSize: 64, fontStyle: 'bold', color: '#488bd4'}).setOrigin(.5)
    }
}