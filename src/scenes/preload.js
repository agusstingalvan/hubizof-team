export default class Preload extends Phaser.Scene {
    constructor() {
        super("Preload");    
    }

    init(){
        console.log('preload')
    }
    preload(){
        //Mapa
        this.load.tilemapTiledJSON('runner', 'public/assets/tilemaps/runner.json');
        //interfaceUIDES
        this.load.image("btn", "public/assets/boton.png");
        //fondos
        this.load.image("backMenu", "public/assets/background.png");
        this.load.image("backHabitacion", "public/assets/backHabitacion.png");

        this.load.tilemapTiledJSON("habitacion", "public/assets/tilemap/habitacion.json")
        this.load.image("tile", "public/assets/Inicio.png");

        //Objetos y Npc
        this.load.image("Npc1", "public/assets/oscuro.png");
        this.load.image("Npc2", "public/assets/naranja.png");
        this.load.image("Npc3", "public/assets/celeste.png");

        // this.load.spritesheet("player", "public/assets/sprite.png", {
        //     frameWidth:140,
        //     frameHeigth:108
        // })
        
        this.load.spritesheet('dude', "public/assets/dude.png", { frameWidth: 32, frameHeight: 48 });
        // this.load.spritesheet('player', "public/assets/violeta.png", { frameWidth: 64, frameHeight: 64 });

        this.load.text('data2', 'public/assets/talk2.txt');
        this.load.text('data3', 'public/assets/talk3.txt');




        //Prototipo
        this.load.image('runner-map', 'public/assets/runner/runner-map.png');
        this.load.image('almohada', 'public/assets/runner/almohada.png');
        this.load.image('chocolate', 'public/assets/runner/chocolate.png');
        this.load.image('player-static', 'public/assets/player-static.png');
        this.load.spritesheet('player-spritesheet', 'public/assets/player-spritesheet.png', {frameWidth: 64, frameHeight: 64})
        this.load.atlas('atlas-hearts', 'public/assets/UI/hearts.png', 'public/assets/UI/hearts.json')
        this.load.image('enemy', 'public/assets/runner/enemy-static.png');
        this.load.spritesheet('enemy-spritesheet', 'public/assets/runner/enemy.png', {frameWidth: 64, frameHeight: 64})
        this.load.image('book', 'public/assets/runner/book-static.png');
        this.load.spritesheet('book-spritesheet', 'public/assets/runner/book.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('ball', 'public/assets/runner/ball-static.png');
        this.load.image('star', 'public/assets/runner/star.png');
        this.load.spritesheet('ball-spritesheet', 'public/assets/runner/ball.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('spike', 'public/assets/runner/spike.png');
        // this.load.image('sofa', 'public/assets/sofa.png')
        
    }

    create() {
        const {width, heigth} = this.scale;
        this.add.text(500 , 500, 'Cargando')
        this.scene.start("Habitacion");

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
            key: "enemy-anims",
            frames: this.anims.generateFrameNumbers("enemy-spritesheet", {
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
        


        setTimeout(()=>{
        }, 3000)

        

        /*this.anims.create({
            key: "runLeft",
            frames: this.anims.generateFrameNumbers("run"),
            frameRate: 7,
            repeat: 0,
            hideOnComplete: true
        });*/

        
    }
}