
import Preload from "../scenes/Preload.js";
import MainMenu from "../scenes/MainMenu.js";
import Habitacion from "../scenes/Habitacion.js";


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
            debug: true,
        },
    },
    scene: [
        Preload,
        MainMenu,
        Habitacion

    ],
};
