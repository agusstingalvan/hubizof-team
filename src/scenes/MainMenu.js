import Button from "../js/functions/Button.js";

export default class MainMenu extends Phaser.Scene {
    gameOver = false;
    healthPlayer;
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
        }
        
    }
    preload(){}

    create() {
        this.btnPlayRunner = new Button(this,100, 200, "btn" , ()=>{this.scene.start('Runner', {player: {
            health: this.healthPlayer
        }})}, 0.2);
    }
    update(){
        if(this.gameOver) {
            this.gameOver = false;
            this.healthPlayer = 5;
            this.scene.start('GameOver')
        }
    }
}