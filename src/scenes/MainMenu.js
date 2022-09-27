import Button from "../js/functions/Button.js";

export default class MainMenu extends Phaser.Scene {
    gameOver = false;
    healthPlayer;
    canPickHeart = true;
    constructor() {
        super("MainMenu");
    }
    init(data){
        console.log(data)
        if(!data.player) return 
        if(data.player.health === 0){
            this.gameOver = true;
        }
        if(data.player.health){
            console.log('La vida del personaje es ', data.player.health)
            this.healthPlayer = data.player.health
            this.canPickHeart = data.player.canPickHeart
        }
        
    }
    
    preload(){}

    create() {

        //background MENU
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "backMenu")
        .setScale(1.95)
        
        this.Menuanimado = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY).play('MenuAnimado');

        // parametros button scene, x, y, texture, text, callback, scale
        this.btnPlayRunner = new Button(this,this.game.config.width-200, this.cameras.main.centerY/.85, "btn" ,"Jugar", 28, ()=>{this.scene.start("Habitacion")}, 1.8);

        this.btnCreditos = new Button(this,this.game.config.width-200, this.cameras.main.centerY/.71, "btn" ,"Creditos", 24, ()=>{this.scene.start("Creditos")}, 1.5)

        /*new Button(this,1000, 460, "btn" ,"Opciones", 25, ()=>{this.scene.start('Runner', {player: {
            health: this.healthPlayer,
            canPickHeart: this.canPickHeart
        }})}, 0.4);

        new Button(this,1000, 560, "btn" ,"*", 25, ()=>{console.log('Hola')}, 0.4);*/

;
    }
    update(){
        if(this.gameOver) {
            this.gameOver = false;
            this.healthPlayer = 5;
            this.scene.start('GameOver')
        }
    }
}