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
        console.log(data);
    }

    create() {
        const buttonBack = new Button(
            this,
            1200,
            30,
            "btn",
            () => {
                this.scene.stop(this);
                this.scene.stop('Runner');
                this.scene.start("MainMenu", {
                    player: {
                        health: this.healthPlayer,
                    },
                });

            },
            0.2
        );
        
        this.healthICon = this.add.image(64, 704, 'atlas-hearts', `heart${this.healthPlayer}`).setOrigin(0.5)
        const txt = `Vida: ${this.healthPlayer}`;
        this.healthLabel = this.add.text(100, 100, txt);
    }

    // update(){
    //     if(this.healthPlayer){
    //         const txt = `Vida: ${this.healthPlayer}`;
    //         this.healthLabel.setText(txt)
    //     }
    // }
}
