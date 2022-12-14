export default class Preload extends Phaser.Scene {
    constructor() {
        super("Preload");    
    }
    preload(){


        //Menu animacion
        this.load.spritesheet('MenuAnim', 'public/assets/menu-sheet.png', {frameWidth: 1280, frameHeight: 768});
        this.load.image('menustatico', 'public/assets/menu.png');

        this.load.image("creditos", "public/assets/creditos.png");

        //Mapa
        this.load.tilemapTiledJSON('runner', 'public/assets/tilemaps/runner.json');
        this.load.tilemapTiledJSON('rosas', 'public/assets/tilemaps/rosas.json');
        //interfaceUIDES
        this.load.image("btn", "public/assets/boton.png");
        //fondos
        this.load.image("backMenu", "public/assets/background.png");

        this.load.tilemapTiledJSON("habitacion", "public/assets/tilemap/habitacion.json")
        this.load.image("tile", "public/assets/Inicio.png");

        //Objetos y Npc
        this.load.image("Npc1", "public/assets/oscuro.png");
        this.load.image("Npc2", "public/assets/naranja.png");
        this.load.image("Npc3", "public/assets/celeste.png");
        




        //Prototipo- RUNNER
        this.load.image('runner-map', 'public/assets/runner/runner-map.png');
        this.load.image('almohada', 'public/assets/runner/almohada.png');
        this.load.image('chocolate', 'public/assets/runner/chocolate.png');
        this.load.image('player-static', 'public/assets/player-static.png');
        this.load.spritesheet('player-spritesheet', 'public/assets/player-spritesheet.png', {frameWidth: 64, frameHeight: 64})
        this.load.image('player-lunar', 'public/assets/player-lunar.png');
        this.load.spritesheet('player-lunar-spritesheet', 'public/assets/player-lunar-spritesheet.png', {frameWidth: 128, frameHeight: 256})
        this.load.atlas('atlas-hearts', 'public/assets/UI/hearts.png', 'public/assets/UI/hearts.json')
        this.load.image('enemy-anxiety', 'public/assets/runner/enemy-static.png');
        this.load.spritesheet('enemy-anxiety-spritesheet', 'public/assets/runner/enemy.png', {frameWidth: 64, frameHeight: 64})
        this.load.image('book', 'public/assets/runner/book-static.png');
        this.load.spritesheet('book-spritesheet', 'public/assets/runner/book.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('ball', 'public/assets/runner/ball-static.png');
        this.load.spritesheet('ball-spritesheet', 'public/assets/runner/ball.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('spike', 'public/assets/runner/spike.png');
        this.load.image('star', 'public/assets/runner/star.png');
        // this.load.image('sofa', 'public/assets/sofa.png')
        

        //Prototipo - ROSAS
        this.load.image('rosas-map', 'public/assets/rosas/rosas-map.png');
        this.load.image('enemy-ira', 'public/assets/rosas/enemy-ira-static.png');
        this.load.spritesheet('enemy-ira-spritesheet', 'public/assets/rosas/enemy-ira.png', {frameWidth: 64, frameHeight: 64})
        this.load.image('balls-fire-static', 'public/assets/rosas/balls-fire-static.png');
        this.load.spritesheet('balls-fire-spritesheet', 'public/assets/rosas/balls-fire.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('book-ira-static', 'public/assets/rosas/book-ira-static.png');
        this.load.spritesheet('book-ira-spritesheet', 'public/assets/rosas/book-ira.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('mueble-static', 'public/assets/rosas/mueble-static.png');
        this.load.spritesheet('mueble-spritesheet', 'public/assets/rosas/mueble.png', {frameWidth: 133, frameHeight: 107});




        //assets del final
        this.load.image('finA', 'public/assets/finA.png');
        this.load.image('finB', 'public/assets/finB.png');


        //Sonidoss
        this.load.audio('menu', 'public/assets/sounds/menu.mp3');
        this.load.audio('runner', 'public/assets/sounds/runner.mp3');
        this.load.audio('iraMusic', 'public/assets/sounds/ira.mp3');
        this.load.audio('chocolate', 'public/assets/sounds/chocolate.mp3');
        this.load.audio('estrella', 'public/assets/sounds/estrella.mp3');
        this.load.audio('gameover', 'public/assets/sounds/gameover.mp3');
        this.load.audio('win', 'public/assets/sounds/win.mp3');
        this.load.audio('death', 'public/assets/sounds/death.mp3');
    }

    create() {
        const {width, heigth} = this.scale;
        this.add.text(500 , 500, 'Cargando')
        this.scene.start("MainMenu");

        this.anims.create({
            key: "player-idle",
            frames: [{ key: 'player-spritesheet', frame: 5 }],
            frameRate: 12,
            repeat: 1,
        });
        this.anims.create({
            key: "player-runner",
            frames: this.anims.generateFrameNumbers("player-spritesheet", {
                start: 6,
                end: 10,
            }),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: "player-lunar-idle",
            frames: [{ key: 'player-lunar-spritesheet', frame: 4 }],
            frameRate: 12,
            repeat: 1,
        });
        this.anims.create({
            key: "player-lunar-back",
            frames: this.anims.generateFrameNumbers("player-lunar-spritesheet", {
                start: 0,
                end: 3,
            }),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: "player-lunar-front",
            frames: this.anims.generateFrameNumbers("player-lunar-spritesheet", {
                start: 5,
                end: 6,
            }),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: "player-lunar-right",
            frames: this.anims.generateFrameNumbers("player-lunar-spritesheet", {
                start: 7,
                end: 15,
            }),
            frameRate: 12,
            repeat: -1,
        });
        
        this.anims.create({
            key: "enemy-anxiety-anims",
            frames: this.anims.generateFrameNumbers("enemy-anxiety-spritesheet", {
                start: 0,
                end: 6,
            }),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: "enemy-ira-anims",
            frames: this.anims.generateFrameNumbers("enemy-ira-spritesheet", {
                start: 0,
                end: 6,
            }),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: "book-anims",
            frames: this.anims.generateFrameNumbers("book-spritesheet", {
                start: 0,
                end: 6,
            }),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: "ball-anims",
            frames: this.anims.generateFrameNumbers("ball-spritesheet", {
                start: 0,
                end: 6,
            }),
            frameRate: 12,
            repeat: 0,
        });
        this.anims.create({
            key: "balls-fire-anims",
            frames: this.anims.generateFrameNumbers("balls-fire-spritesheet", {
                start: 0,
                end: 7,
            }),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: "book-ira-anims",
            frames: this.anims.generateFrameNumbers("book-ira-spritesheet", {
                start: 0,
                end: 6,
            }),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: "mueble-anims",
            frames: this.anims.generateFrameNumbers("mueble-spritesheet", {
                start: 0,
                end: 8,
            }),
            frameRate: 12,
        });


        this.anims.create({
            key: "MenuAnimado",
            frames: this.anims.generateFrameNumbers("MenuAnim", {
                start: 0,
                end: 6,
            }),
            frameRate: 5,
            repeat: -1,
        });
    }
}