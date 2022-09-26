import { Npc } from "../js/objects/Npc.js";
import Player from "../js/objects/Player.js";
import Button from "../js/functions/Button.js";

export default class Habitacion extends Phaser.Scene {
    

    constructor() {
        super("Habitacion");
    }

    init(){
        this.cursors = this.input.keyboard.createCursorKeys();
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
        


        

        
        //Personaje//

        const spawnPlayer = map.findObject("objetos", (obj)=> obj.name === 'player');
        this.player = new Player(this, spawnPlayer.x, spawnPlayer.y, "dude");

        this.player.body.allowGravity = false;

        
        

        //Personajes no jugables//
        const spawnNpc1 = map.findObject("objetos", (obj)=> obj.name === "npc1")
        this.npc1 = new Npc(this, spawnNpc1.x, spawnNpc1.y, "Npc1", 1)

        this.talk1 = game.cache.text.get('data1');

        const spawnNpc2 = map.findObject("objetos", (obj)=> obj.name === "npc2")
        this.npc2 = new Npc(this, spawnNpc2.x, spawnNpc2.y, "Npc2", 1)

        this.talk2 = game.cache.text.get('data2');

        const spawnNpc3 = map.findObject("objetos", (obj)=> obj.name === "npc3")
        this.npc3 = new Npc(this, spawnNpc3.x, spawnNpc3.y, "Npc3", 1)

        this.talk3 = game.cache.text.get('data3');

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
}
