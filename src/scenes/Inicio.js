
export default class Inicio extends Phaser.Scene {
    constructor() {
        super("Inicio");
    }

    
    create() {
        this.scene.start("Preload")
    }
}