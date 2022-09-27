import Button from "../js/functions/Button.js";
export default class Creditos extends Phaser.Scene {
    constructor() {
        super("Creditos");
    }
    init(data){
    }
    preload(){}

    create() {
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "creditos").setScale(1.438)
        
        this.gimena = this.add.text(this.cameras.main.centerX/4, this.cameras.main.centerY/5,'Gimena Bruno').setOrigin(.5)
        this.Agustin1 = this.add.text(this.cameras.main.centerX/1.5, this.cameras.main.centerY/5,'Agustin Galvan <JS>').setOrigin(.5)
        this.Agustin2 = this.add.text(this.cameras.main.centerX/.72, this.cameras.main.centerY/5,'Agustin Lovera').setOrigin(.5)
        this.juan = this.add.text(this.cameras.main.centerX/1, this.cameras.main.centerY/5,'Juan fernández').setOrigin(.5)

        this.btnVolver = new Button(this,this.game.config.width-100, this.cameras.main.centerY/.57, "btn" ,"Volver", 24, ()=>{this.scene.start("MainMenu")}, 1.5);
    }
    update(){
       
    }
}