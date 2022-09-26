import { Npc } from "../js/objects/Npc.js";
import Player from "../js/objects/Player.js";
import Button from "../js/functions/Button.js";

export default class Habitacion extends Phaser.Scene {
    gameOver = false;
    healthPlayer;
    canPickHeart = true;

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

        const map = this.make.tilemap({ key: "habitacion" });
        const tileset = map.addTilesetImage("habitacion", "tile");

        map.createStaticLayer("piso", tileset)
        const paredes = map.createLayer("paredes", tileset)
        

        paredes.setCollisionByProperty({collides: true});

        this.celeste = map.findObject("objetos", (obj)=> obj.name === 'celeste');
        


        

        
        //Creacion de player//
        
        
        

        //Personajes no jugables//
        const spawnNpc1 = map.findObject("objetos", (obj)=> obj.name === "npc1")
        this.npc1 = new Npc(this, spawnNpc1.x, spawnNpc1.y, "Npc1", 1, "Runner", {player: {
            health: this.healthPlayer,
            canPickHeart: this.canPickHeart
        }})
        this.talk1 = game.cache.text.get('data2');

        const spawnNpc2 = map.findObject("objetos", (obj)=> obj.name === "npc2")
        this.npc2 = new Npc(this, spawnNpc2.x, spawnNpc2.y, "Npc2", 1)
        this.talk2 = game.cache.text.get('data2');

        const spawnNpc3 = map.findObject("objetos", (obj)=> obj.name === "npc3")
        this.npc3 = new Npc(this, spawnNpc3.x, spawnNpc3.y, "Npc3", 1)
        this.talk3 = game.cache.text.get('data3');

        const spawnPlayer = map.findObject("objetos", (obj)=> obj.name === 'player');
        this.player = new Player(this, spawnPlayer.x, spawnPlayer.y, "player-static");
        this.anims.resumeAll()
        this.player.anims.play('player-idle');
        this.player.setScale(2)
        this.player.refreshBody()
        this.player.body.allowGravity = false;

        this.btnPlayRunner = new Button(this, 100, 200, "btn", "Runner", 16, ()=>{this.scene.start('Runner', {player: {
            health: this.healthPlayer,
            canPickHeart: this.canPickHeart
        }})}, 0.2);

        this.physics.add.collider(this.player, paredes, ()=>(console.log("pum")));
        this.physics.add.collider(this.player, this.npc1.img, ()=>{
            const posX = this.cameras.main.centerX;
            const posY = this.cameras.main.centerY + this.move;
            this.npc1.makePopUp(this, posX, posY, this.talk1)
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
    }
}
