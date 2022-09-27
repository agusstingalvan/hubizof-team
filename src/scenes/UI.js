import Button from "../js/functions/Button.js";

export default class UI extends Phaser.Scene {
    healthPlayer;
    healthLabel;
    healthICon;
    constructor(scene) {
        super("UI");
        this.scene = scene;
    }

    init(data) {
        this.healthPlayer = data.player.health;
    }

    create() {

        
        this.healthICon = this.add.image(64, 704, 'atlas-hearts', `heart${this.healthPlayer}`).setOrigin(0.5)
    }

}
