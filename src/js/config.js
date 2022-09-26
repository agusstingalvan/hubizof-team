
import Preload from "../scenes/Preload.js";
import MainMenu from "../scenes/MainMenu.js";
import Runner from "../scenes/Runner.js";
import UI from "../scenes/UI.js";
import GameOver from "../scenes/GameOver.js";


export const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 768,

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: {
            width: 800,
            height: 600,
        },
        max: {
            width: 1280,
            height: 768,
        },
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
            debug: false,
        },
    },
    scene: [
        Preload,
        MainMenu,
        
        Runner,
        UI,
        GameOver
    ],
};
