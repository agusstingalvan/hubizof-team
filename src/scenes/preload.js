export default class Preload extends Phaser.Scene {
    constructor() {
        super("Preload");    
    }

    init(){
        console.log('preload')
    }
    preload(){
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

        this.load.image("npcs", "public/assets/Npcs.png");

        this.load.spritesheet("player", "public/assets/sprite.png", {
            frameWidth:140,
            frameHeigth:108
        })

        this.load.spritesheet('dude', "public/assets/dude.png", { frameWidth: 32, frameHeight: 48 });

        this.load.spritesheet('player', "public/assets/violeta.png", { frameWidth: 64, frameHeight: 64 });

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







        this.load.text('data1', 'public/assets/talk1.txt');
        
        this.load.text('data2', 'public/assets/talk2.txt');
        
        this.load.text('data3', 'public/assets/talk3.txt');




    }

    create() {
        // this.add.text()
        const {width, heigth} = this.scale;
        this.add.text(500 , 500, 'Cargando')
        this.scene.start("Habitacion");
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