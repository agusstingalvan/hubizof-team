export default class Preload extends Phaser.Scene {
    constructor() {
        super("Preload");
        
    }


    perload(){
        this.load.image("B", "/assets/Button.png");
    }

    create() {
        this.scene.start("MainMenu")
    }
}