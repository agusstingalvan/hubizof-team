export default class Player extends Phaser.Physics.Arcade.Sprite{
    speed = 400;
    health;
    countJumps = 0;
    stop = false;
    constructor(scene, x, y,  texture, health){
        super(scene, x, y, texture )
        this.scene = scene;
        this.health = health;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setBounce(0.5)
        // console.log(this.body.allowGravity)
        this.anims.play('player-runner', true);
    }
    removeHealth(){
        --this.health;
        // this.anims.play('player-idle', true);
        console.log(this.health)
    }
    run(enemy){
        // this.anims.play('player-runner', true)
        this.setVelocityX(this.speed);
        const objPos = {
            x: this.x,
            y: this.y
        }
        enemy.run(this, objPos)
        //aNIMACION
    }
    jump(speed = 300){
        this.setVelocityY(-speed)
        ++this.countJumps;
        //animacuion
    }
}