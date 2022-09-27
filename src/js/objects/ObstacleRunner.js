export default class ObstacleRunner extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y,  texture, moveX, moveY  ){
        super(scene, x, y, texture )
        this.scene = scene;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.setCollideWorldBounds(true)
    }
}