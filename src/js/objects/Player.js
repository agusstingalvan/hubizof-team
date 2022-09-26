export default class Player extends Phaser.Physics.Arcade.Sprite{
    speed = 400;
    heath = 5;
    countJumps = 0;
    stop = false;
    constructor(scene, x, y,  texture){
        super(scene, x, y, texture )
        this.scene = scene;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        // this.setCollideWorldBounds(true);
        
        this.setBounce(0.5)
    }
    removeHeath(){
        this.removeHeath();
    }
    run(enemy){
        this.setVelocityX(this.speed);
        const objPos = {
            x: this.x,
            y: this.y
        }
        enemy.run(this, objPos)
        //aNIMACION
    }
    jump(){
        this.setVelocityY(-300)
        ++this.countJumps;
        //animacuion
    }

    
}
