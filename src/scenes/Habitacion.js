import SoundsManage from "../js/functions/SoundsManage.js";
import { Npc } from "../js/objects/Npc.js";
import Player from "../js/objects/Player.js";

export default class Habitacion extends Phaser.Scene {
    gameOver = false;
    healthPlayer;
    canPickHeart = true;
    countStar = 0;
    init(data){
        this.sonidos = data.sonidos;
        this.anims.pauseAll()
        this.cursors = this.input.keyboard.createCursorKeys();
        if(!data.player) return 
        this.countStar = (data.player.countStar)? data.player.countStar : this.countStar;
        if(data.player.health === 0){
            this.gameOver = true;
        }
        if(data.player.health){
            this.healthPlayer = data.player.health
            this.canPickHeart = data.player.canPickHeart
        }
    }

    constructor() {
        super("Habitacion");
    }

    create() {
        

        const map = this.make.tilemap({ key: "habitacion" });
        const tileset = map.addTilesetImage("habitacion", "tile");

        map.createStaticLayer("piso", tileset)
        const paredes = map.createLayer("paredes", tileset)
        paredes.setCollisionByProperty({collides: true});

        const objectsLayer = map.getObjectLayer("objetos");
        
        
        

        //Personajes no jugables//
        objectsLayer.objects.forEach(objData => {
            const {x, y, name} = objData;

            switch(name){
                case 'player':
                    this.player = new Player(this, x, y, "player-lunar");
                    this.anims.resumeAll()
                    this.player.anims.play('player-idle');
                    this.player.setScale(0.8)
                    this.player.refreshBody()
                    this.player.body.allowGravity = false;
                    break;
                case 'npc1': 
                    this.npc1 = new Npc(this, x, y, "Npc1", 1, "Runner", {player: {
                        health: this.healthPlayer,
                        canPickHeart: this.canPickHeart
                    }})
                    this.talk1 = game.cache.text.get('data2');
                break;
                case 'npc2': 
                    this.npc2 = new Npc(this, x, y, "Npc2", 1)
                    this.talk2 = game.cache.text.get('data2');
                break;
                case 'npc3': 
                    this.npc3 = new Npc(this, x, y, "Npc3", 1)
                    this.talk3 = game.cache.text.get('data3');
                break;
            }
        });
        
        this.physics.add.collider(this.player, paredes);
        this.physics.add.collider(this.player, this.npc1.img, (player, npc)=>{
            this.physics.pause()
            
            const txt = this.add.text(this.scale.width / 2, this.scale.height / 2, 'Cargando...', {fontFamily: 'Open Sans', fontSize: 20, fontStyle: 'bold'})
            setTimeout(()=>{
                this.sonidos.sound.musicMenu.stop()
                this.scene.start('Runner', {player: {
                    health: this.healthPlayer,
                    canPickHeart: this.canPickHeart,
                    countStar: this.countStar
                },
                sonidos: this.sonidos
            })
            }, 2000)
        })
        this.physics.add.collider(this.player, this.npc2.img, (player, npc)=>{
            this.physics.pause()
            
            const txt = this.add.text(this.scale.width / 2, this.scale.height / 2, 'Cargando...', {fontFamily: 'Open Sans', fontSize: 20, fontStyle: 'bold'})
            setTimeout(()=>{
                this.sonidos.sound.musicMenu.stop()
                this.scene.start('Rosas', {player: {
                    health: this.healthPlayer,
                    canPickHeart: this.canPickHeart,
                    countStar: this.countStar
                },
                sonidos: this.sonidos
            })
            }, 2000)
        })
    }
    update(){

        this.player.setVelocityY(0);
        this.player.setVelocityX(0);


         if (this.cursors.up.isDown == true){
                this.player.setVelocityY(-200);
            }
        else if (this.cursors.down.isDown == true){
                this.player.setVelocityY(200);
            }
        else if (this.cursors.right.isDown == true){
                this.player.setVelocityX(200); 
            } 
        else if (this.cursors.left.isDown == true){
                this.player.setVelocityX(-200);
            }
    }
    update(){
        if(this.gameOver) {
            this.gameOver = false;
            this.healthPlayer = 5;
            this.scene.start('GameOver')
        }
        if(this.physics.world.isPaused) {
            this.player.anims.play('player-lunar-idle', true);
            return
        }
        if (this.cursors.up.isDown){
            this.player.setVelocityY(-200);
            this.player.anims.play('player-lunar-back', true);
        }
        else if (this.cursors.down.isDown){
            this.player.setVelocityY(200);
            this.player.anims.play('player-lunar-front', true);
        }
        else if (this.cursors.right.isDown){
            this.player.setVelocityX(200); 
            this.player.anims.play('player-lunar-right', true);
            this.player.setFlipX(false)
        } 
        else if (this.cursors.left.isDown){
            this.player.setVelocityX(-200);
            this.player.anims.play('player-lunar-right', true);
            this.player.setFlipX(true)
        }else{
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            this.player.anims.play('player-lunar-idle', true);
        }

        ///Si gana el jugador
        if(this.countStar === 2){
            this.scene.stop(this);
            this.sonidos.sound.winSFX.volume = 2;
            this.sonidos.sound.winSFX.play();
            this.scene.start('Victoria')
        }

    }

    crearPopUp(x, y){
        this.abrirPop = true;
        this.container = this.add.container(x, y);
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0x000000, 1)
        this.graphics.fillRect(0, 0, 1200, 200)

        // this.img = this.add.image(0, 0, 'book')
        this.txt2 = this.add
        .text(0, 0, "text", {fontSize: 100, fontStyle: 'bold' }).setInteractive({ useHandCursor: true }).on("pointerdown", () => {
            console.log("asd")
            this.container.visible = false;
            this.abrirPop = false;
        })
        this.container.add([this.graphics, this.txt2])
    }
}
