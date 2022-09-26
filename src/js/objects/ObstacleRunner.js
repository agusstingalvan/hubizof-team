export default class ObstacleRunner extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y,  texture, moveX, moveY  ){
        super(scene, x, y, texture )
        this.scene = scene;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.setCollideWorldBounds(true)
        // this.scene.tweens.add({
        //     targets: this,
        //     x: moveX? moveX : x,
        //     y: moveY,
        //     ease: "Sine.easeInOut",
        //     duration: 900,
        //     yoyo: true,
        //     repeat: -1,

        // });

    }
}