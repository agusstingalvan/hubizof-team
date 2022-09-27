import { Npc } from "../js/objects/Npc.js";
import Player from "../js/objects/Player.js";
import Button from "../js/functions/Button.js";

export default class Habitacion extends Phaser.Scene {
    gameOver = false;
    healthPlayer;
    canPickHeart = true;
    abrirPop = true;
    

    init(data){
        this.anims.pauseAll()
        this.cursors = this.input.keyboard.createCursorKeys();
        if(!data.player) return 
        if(data.player.health === 0){
            this.gameOver = true;
        }
        if(data.player.health){
            console.log('La vida del personaje es ', data.player.health)
            this.healthPlayer = data.player.health
            this.canPickHeart = data.player.canPickHeart
        }
    }

    constructor() {
        super("Habitacion");
    }

    
    preload(){}

    create() {
        
        //this.add.image(0, 0, "tile")
        //console.log(game)

        const map = this.make.tilemap({ key: "habitacion" });
        const tileset = map.addTilesetImage("habitacion", "tile");

        map.createStaticLayer("piso", tileset)
        const paredes = map.createLayer("paredes", tileset)
        

        paredes.setCollisionByProperty({collides: true});
        const objectsLayer = map.getObjectLayer("objetos");

        this.celeste = map.findObject("objetos", (obj)=> obj.name === 'celeste');
        


        

        
        //Creacion de player//

        
        
        
        

        //Personajes no jugables//
        objectsLayer.objects.forEach(objData => {
            const {x, y, name} = objData;

            switch(name){
                case 'player':
                    this.player = new Player(this, x, y, "player-static");
                    this.anims.resumeAll()
                    this.player.anims.play('player-idle');
                    this.player.setScale(2)
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
    
        // const spawnNpc1 = map.findObject("objetos", (obj)=> obj.name === "npc1")
       
        //console.log(spawnNpc1.x, spawnNpc1.y)

        // const spawnNpc2 = map.findObject("objetos", (obj)=> obj.name === "npc2")
        

        // const spawnNpc3 = map.findObject("objetos", (obj)=> obj.name === "npc3")
        

        const spawnPlayer = map.findObject("objetos", (obj)=> obj.name === 'player');
        

        this.btnPlayRunner = new Button(this, 100, 200, "btn", "Runner", 16, ()=>{this.scene.start('Runner', {player: {
            health: this.healthPlayer,
            canPickHeart: this.canPickHeart
        }})}, 0.2);

        this.physics.add.collider(this.player, paredes);

        //.body.onCollide.add(hitSprite, this);
        

        this.physics.add.collider(this.player, this.npc1.img, (player, npc)=>{
            npc.disableBody(true, false);
            const posX = this.cameras.main.centerX;
            const posY = this.cameras.main.centerY + this.move;
            // this.npc1.makePopUp(this, posX, posY, this.talk1)
            //this.botonRemove = new Button (this, 200, 500, "btn", "X", 24, ()=> {this.npc1.hidePopUp()}, .1);
            // this.crearPopUp(400, 400)
        })


     

        /*npc1.setCollisionByProperty({collides: true});
        npc2.setCollisionByProperty({collides: true});
        npc3.setCollisionByProperty({cod
        this.move = this.cameras.main.centerX/2;
        //Colliciones//
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, paredes, ()=>(console.log("pum")));
        //this.physics.add.collider(this.player, this.npc1.img, ()=>(console.log("pum")))
        //this.physics.add.collider(this.player, this.npc2.img, ()=>(console.log("pum")))
        
        this.physics.add.collider(this.player, this.npc1.img, ()=>(this.npc1.makePopUp(this,this.cameras.main.centerX,
        this.cameras.main.centerY + this.move,
        this.talk1)))

        this.physics.add.collider(this.player, this.npc2.img, ()=>(this.npc2.makePopUp(this,this.cameras.main.centerX,
        this.cameras.main.centerY + this.move,
        this.talk2)))

        this.physics.add.collider(this.player, this.npc3.img, ()=>(this.npc3.makePopUp(this,this.cameras.main.centerX,
        this.cameras.main.centerY + this.move,
        this.talk3)))
        
        //new Button(this, 200, 50, "btn", ">", 50, ()=>{this.scene.start("MainMenu")}, .1)

        


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
        /*else if(this.cursors.left.isDown && this.cursors.up.isDown){

        }*/

        /*this.physics.world.collide(this.player, this.npc3, function () {
            console.log('popUpFunction');
        });*/
    }

    update(){

        /*if (this.lis1 === false){
            this.npc1.hidePopUp(false);
        }else{
            const posX = this.cameras.main.centerX;
            const posY = this.cameras.main.centerY + this.move;
            this.npc1.makePopUp(this, posX, posY, this.talk1)
        }*/


        


        if(this.gameOver) {
            this.gameOver = false;
            this.healthPlayer = 5;
            this.scene.start('GameOver')
        }
        if (this.cursors.up.isDown){
            this.player.setVelocityY(-200);
            // this.player.anims.play('player-runner', true);
        }
        else if (this.cursors.down.isDown){
            this.player.setVelocityY(200);
            // this.player.anims.play('player-runner', true);
        }
        else if (this.cursors.right.isDown){
            this.player.setVelocityX(200); 
            this.player.anims.play('player-runner', true);
            this.player.setFlipX(false)
        } 
        else if (this.cursors.left.isDown){
            this.player.setVelocityX(-200);
            this.player.anims.play('player-runner', true);
            this.player.setFlipX(true)
        }else{
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            this.player.anims.play('player-idle', true);

        }

        // if(this.abrirPop){
        //     this.npc1.img.enableBody(
        //         true,
        //         this.npc1.x,
        //         this.npc1.y,
        //         true,
        //         false
        //     );
        // }
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
