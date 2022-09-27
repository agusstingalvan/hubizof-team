import EnemyRunner from "../js/objects/EnemyRunner.js";
import Player from "../js/objects/Player.js";


export default class Rosas extends Phaser.Scene{
    gameOver = false
    player;
    healthPlayer = 5; //Dato que viene desde Habitación
    enemy;
    cursors;
    keyR;
    count = 0;
    obstaclesGroup;
    chocolatesGroup;
    canPickHeart; //Dato que viene desde Habitación
    tiempo = 60;
    intervalCreateBalls;
    constructor(){
        super('Rosas')
    }
    init(data){
        console.log('estas en Rosas')
        this.anims.resumeAll()
        this.tweens.resumeAll()
        this.gameOver = false;
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        this.canPickHeart = data.player.canPickHeart;
        this.countStar = data.player.countStar;
        console.log(data.player.countStar)
        this.tiempo = 60;
        if(!data.player.health) return;
        if(data.player.health) {
            this.healthPlayer = data.player.health;
        }
    }
    create(){
        this.scene.launch("UI", {player: { health: this.healthPlayer}});
        const map = this.make.tilemap({key: "rosas"});

        const tiled = map.addTilesetImage("rosas-map", "rosas-map");
        const background = map.createLayer('background', tiled);
        background.setCollisionByProperty({collides: true});
        const objectsLayer = map.getObjectLayer("objects");
        
        //Creacion de player
        const spawnPlayer = map.findObject("objects", (obj)=> obj.name === 'player');
        this.player = new Player(this, spawnPlayer.x, spawnPlayer.y, "player-static", this.healthPlayer);
        this.player.anims.play("player-idle");

        this.textTime = this.add.text(40, 40, '60s', {fontStyle: 'bold'})
        this.time.addEvent({
            delay: 1000,
            callback: this.timer,
            callbackScope: this,
            loop: true,
        });

        this.ballsFireGroup = this.physics.add.group();
        this.booksIraGroup = this.physics.add.group({
            key: 'book-ira-static',
            quantity: 1,
            bounceX: 1,
            bounceY: 1,
            collideWorldBounds: true,
            velocityX: -150,
            velocityY: -300,
        });
        this.muebleGroup = this.physics.add.group({
            key: 'mueble-static',
            quantity: 1,
            bounceX: 1,
            bounceY: 1,
            collideWorldBounds: true,
            velocityX: Phaser.Math.Between(200, 400),
            velocityY: -300,
            setXY: { x: Phaser.Math.Between(200, 400), y: 100, stepX: 70 },
        });
        this.muebleGroup.playAnimation("mueble-anims")

        objectsLayer.objects.forEach(objData => {
            const {x, y, name, type} = objData;
            switch(name || type){
                case 'enemy':
                    this.enemy = new EnemyRunner(this, x, y, 'enemy-ira');
                    this.enemy.body.allowGravity = false;
                    this.enemy.move()
                    this.intervalCreateBalls = setInterval(()=>{
                        const ball = this.ballsFireGroup.create(this.enemy.x, this.enemy.y, 'balls-fire-static');
                        ball.setVelocityY(200)
                        ball.setVelocityX(Phaser.Math.Between(40, 400))
                        ball.setBounce(1)
                        ball.setCollideWorldBounds(true)
                        ball.anims.play('balls-fire-anims', true)
                        this.ballsFireGroup.children.entries.forEach((balls) => {
                            if(balls.y > 780){
                                balls.destroy()
                            }
                        });
                    }, 6000)
                break;
            }
        });

        // this.booksIraGroup.create(Phaser.Math.Between(90, 1200), Phaser.Math.Between(116, 260), 'book-ira-static');
        // this.booksIraGroup.children.iterate((book) => {
        //     // book.setScale(0.5).refreshBody();
        //     book.anims.play('book-ira-anims')
        //     book.setBounce(1);
        //     book.setCollideWorldBounds(true);
        //     book.setVelocity(Phaser.Math.Between(-300, 300), 20);
        //     // book.setX(Phaser.Math.FloatBetween(100, 700));
        //     // book.allowGravity = false;
        // });

        // this.ballsFireGroup.children.entries.forEach((balls) => {
        //     if(balls.y < 780){
        //         console.log('sisisisisisis')
        //     }
        // });
        // this.ballsFireGroup.createMultiple({
        //     classType: Phaser.GameObjects.Sprite,
        //     key: 'balls-fire-static',
        //     frame: 0,
        //     visible: true,
        //     active: true,
        //     repeat: 50,
        //     setXY: {
        //         x: 400,
        //         y: 300,
        //     }
        // });
        // this.ballsFireGroup.children.entries.forEach((balls) => {
        //     balls.play('balls-fire-anims');
        // });

        //Physics
        this.physics.add.collider(this.player, background);
        this.physics.add.collider(this.booksIraGroup, background);
        this.physics.add.collider(this.muebleGroup, background);
        //Cuando choca la ball fire -Mures
        this.physics.add.collider(this.player, this.ballsFireGroup, ()=>{
            this.hitPlayer();
        } )
        //Cuando choca con el Mueble -Mures
        this.physics.add.collider(this.player, this.muebleGroup, ()=>{
            this.hitPlayer();
        } )

        this.physics.add.overlap(this.player, this.booksIraGroup, (player, obstacle)=>{
            // console.log('Chocaste un obstaculo')
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
                onStart: tween => {
                    this.player.anims.play('player-idle', true).on("animationcomplete", ()=>{
                        setTimeout(()=>{
                            this.player.anims.play('player-runner')
                        }, 200)
                    })
                },
                onUpdate: tween => {
                    
                    const value = tween.getValue();
                    const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(startColor, endColor, 100, value)

                    const color = Phaser.Display.Color.GetColor(colorObject.r, colorObject.g, colorObject.b)
                    this.player.setTint(color)
                    this.player.setVelocityX(0)
                    
                },
            })
        }, null, this);
        
        this.physics.world.setBoundsCollision(true, true, true, false);
    }
    hitPlayer(){
        this.physics.pause();
        this.player.setTint(0xff0000);
        this.anims.pauseAll();
        this.tweens.pauseAll();
        clearInterval(this.intervalCreateBalls)
        this.player.removeHealth();
        this.scene.launch('UI', {player:{health: this.player.health}})
        setTimeout(()=>{
            this.gameOver = true;
        }, 4000)
    }
    isGameOver(){
        this.gameOver = false;
        this.scene.stop('UI');
        this.scene.stop(this);
        this.scene.start('Habitacion', {
            player: {
                health: this.player.health,
                canPickHeart: this.canPickHeart
            }
        })
    }
    update(){
        if(this.gameOver) return this.isGameOver()
        //RestartScene
        if(this.keyR.isDown){
            this.scene.restart()
        }

        const touchingGround = this.player.body.blocked.down;
        const pressUp = Phaser.Input.Keyboard.JustDown(this.cursors.up);
        const pressRight = this.cursors.right.isDown;
        const pressLeft = this.cursors.left.isDown;

        // this.player.run(this.enemy)

        if(pressRight){
            this.player.setVelocityX(200);
            this.player.anims.play("player-runner", true)
            this.player.setFlipX(false);
        }else if(pressLeft){
            this.player.setVelocityX(-200);
            this.player.anims.play("player-runner", true)
            this.player.setFlipX(true);
        }else{
            this.player.setVelocityX(0);
            this.player.anims.play("player-idle", true)

        }
        if(pressUp && (touchingGround || this.player.countJumps < 2)){
            this.player.jump(200);
        }

        if(touchingGround) {
             this.player.countJumps = 0;
        }


       
    }

    timer() {
        this.tiempo -= 1;
        this.textTime.setText(`${this.tiempo}s`);
        if(this.tiempo === 55){
            this.booksIraGroup.create(Phaser.Math.Between(90, 1200), Phaser.Math.Between(116, 260), 'book-ira-static');
            this.booksIraGroup.playAnimation("book-ira-anims")
        }
        if(this.tiempo === 40){
            this.booksIraGroup.create(Phaser.Math.Between(90, 1200), Phaser.Math.Between(116, 260), 'book-ira-static');
            this.booksIraGroup.playAnimation("book-ira-anims")
        }
        if(this.tiempo === 20){
            this.muebleGroup.create(Phaser.Math.Between(90, 1200), Phaser.Math.Between(116, 260), 'book-ira-static');
            this.muebleGroup.playAnimation("mueble-anims")
        }
        // if (this.tiempo <= 0) {
        //     // this.gameOver = true;
        //     this.scene.stop('UI');
        //     this.scene.stop('Habitacion');
        //     this.scene.stop(this);
        //     this.scene.start('GameOver')
        // }
        if (this.tiempo <= 0 && this.player.health >= 1 && this.countStar <= 2) {
            // this.gameOver = true;
            // this.scene.stop('UI');
            // this.scene.stop('Habitacion');
            // this.scene.stop(this);
            // this.scene.start('GameOver')
            if(this.countStar <= 2) ++this.countStar;
            this.scene.stop('UI');
            this.scene.stop(this);
            this.scene.start('Habitacion', {
                player: {
                    health: this.player.health,
                    countStar: this.countStar
                }
            });
        }
    }
}

