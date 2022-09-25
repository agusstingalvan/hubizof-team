import EnemyRunner from "../js/objects/EnemyRunner.js";
import ObstacleRunner from "../js/objects/ObstacleRunner.js";
import Player from "../js/objects/Player.js";


export default class Runner extends Phaser.Scene{
    gameOver = false
    player;
    enemy
    cursors;
    keyR;
    count = 0;
    obstaclesGroup;
    constructor(){
        super('Runner')
    }
    init(data){
        console.log('estas en runner')
        if(data.player) this.player = data.player;
        this.gameOver = false;
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
    }
    create(){
        const map = this.make.tilemap({key: "runner"});
        const tiledGround = map.addTilesetImage("ground", "ground");

        const ground = map.createLayer('ground', tiledGround)
        const objectsLayer = map.getObjectLayer("objects");

        ground.setCollisionByProperty({collides: true});

        //Creacion de player
        const spawnPlayer = map.findObject("objects", (obj)=> obj.name === 'player');
        this.player = new Player(this, spawnPlayer.x, spawnPlayer.y, "player");

        this.cameras.main.startFollow(this.player, true, 0.08, 0.08)
        this.cameras.main.setZoom(1);
        this.cameras.main.setBounds(0, 0, 6000, 768);

        this.obstaclesGroup = this.physics.add.group();
        this.sofaGroup = this.physics.add.staticGroup();
        this.spikesGroup = this.physics.add.staticGroup();
        objectsLayer.objects.forEach(objData => {
            const {x, y, name, type} = objData;

            switch(name || type){
                case 'enemy':
                        this.enemy = new EnemyRunner(this, x, y, 'enemy');
                    break;
                case 'obstacles':
                    this.obstaclesGroup.create(x, y, 'book');
                break;
                case 'sofa':
                    this.sofaGroup.create(x, y, 'sofa');
                break;
                case 'spike':
                    this.spikesGroup.create(x, y, 'spike');
                break;
            }
        });

        this.obstaclesGroup.children.iterate((obstacle)=>{
            obstacle.body.allowGravity = false;
            this.tweens.add({
                targets: obstacle,
                y: 200,
                ease: "Sine.easeInOut",
                duration: 900,
                yoyo: true,
                repeat: -1,
            });
        })
        //Physics
        this.physics.add.collider(this.player, ground);
        this.physics.add.collider(this.player, this.sofaGroup, (player, sofa)=>{
            console.log('El sofa')
            this.player.setVelocityY(-500)
        }, null, this);
        this.physics.add.collider(this.player, this.spikesGroup, (player, spike)=>{
            console.log('El spike')
            this.gameOver = true;
        }, null, this);
        this.physics.add.collider(this.enemy, ground);
        this.physics.add.overlap(this.enemy, this.player, ()=>{
            console.log('Moriste')
            this.scene.start('MainMenu')
        });
        
        this.physics.add.overlap(this.player, this.obstaclesGroup, (player, obstacle)=>{
            console.log('Chocaste un obstaculo')
            obstacle.destroy()
            const startColor = Phaser.Display.Color.ValueToColor(0xffffff);
            const endColor = Phaser.Display.Color.ValueToColor(0xff0800);
            this.tweens.addCounter({
                from: 0,
                to: 100,
                duration: 100,
                repeat: 2,
                yoyo: true,
                ease: Phaser.Math.Easing.Sine.InOut,
                onUpdate: tween => {
                    
                    const value = tween.getValue();
                    const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(startColor, endColor, 100, value)

                    const color = Phaser.Display.Color.GetColor(colorObject.r, colorObject.g, colorObject.b)
                    this.player.setTint(color)
                    this.player.setVelocityX(0)

                 
                },
            })
        }, null, this);

    }
    update(){
        if(this.gameOver) return this.scene.start('MainMenu')
        //RestartScene
        if(this.keyR.isDown){
            this.scene.restart()
        }

        const touchingGround = this.player.body.blocked.down;
        const pressUp = Phaser.Input.Keyboard.JustDown(this.cursors.up);
        const pressRight = Phaser.Input.Keyboard.JustDown(this.cursors.right)

        this.player.run(this.enemy)
        // pressRight? this.player.run(this.enemy) : null

        if(pressUp && (touchingGround || this.player.countJumps < 2)){
             this.player.jump();
        }

        if(touchingGround) {
             this.player.countJumps = 0;
        }


    }
}