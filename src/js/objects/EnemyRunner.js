export default class EnemyRunner extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y,  texture){
        super(scene, x, y, texture )
        this.scene = scene;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        
        this.setBounce(0.2)
        this.anims.play("enemy-anims");
        this.setScale(1.6)
    }
    run(objPosPlayer){
        const {x, y} = objPosPlayer;

        this.scene.tweens.add({
            targets: this,
            x: x,
            y: y,
            ease: 'Power1',
            duration: 900,
        });
    }
    jump(){
        this.setVelocityY(-300)

    }
}