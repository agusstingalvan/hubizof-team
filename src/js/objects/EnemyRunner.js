export default class EnemyRunner extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y,  texture){
        super(scene, x, y, texture )
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        
        this.setBounce(0.2)
        this.anims.play(`${texture}-anims`);
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
    move(){
        const x = this.scene.game.config.width - 64;
        this.scene.tweens.add({
            targets: this,
            x: x,
            ease: 'Sine.easeInOut',
            duration: 4000,
            yoyo: true,
            repeat: -1,
        });
    }
    jump(){
        this.setVelocityY(-300)

    }
}