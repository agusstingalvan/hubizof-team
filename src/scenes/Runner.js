import Button from "../js/functions/Button.js";
import EnemyRunner from "../js/objects/EnemyRunner.js";
import ObstacleRunner from "../js/objects/ObstacleRunner.js";
import Player from "../js/objects/Player.js";


export default class Runner extends Phaser.Scene{
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
    constructor(){
        super('Runner')
    }
    init(data){
        // console.log('estas en runner')
        this.sonidos = data.sonidos; 
        this.anims.resumeAll();
        this.tweens.resumeAll()
        this.gameOver = false;
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        this.canPickHeart = data.player.canPickHeart;
        this.countStar = data.player.countStar;
        if(!data.player.health) return;
        if(data.player.health) {
            this.healthPlayer = data.player.health;
            // console.log('Se actualizo la vida', this.healthPlayer)
        }
    }
    create(){
        this.scene.launch("UI", {player: { health: this.healthPlayer}});
        this.sonidos.sound.musicRunner.play();
        const map = this.make.tilemap({key: "runner"});
        // const tiledGround = map.addTilesetImage("ground", "ground");

        // const ground = map.createLayer('ground', tiledGround);
        // ground.setCollisionByProperty({collides: true});
        const tiledPlatform = map.addTilesetImage("runner-map", "runner-map");
        const tiledAlmohada = map.addTilesetImage("almohada", "almohada");
        const background = map.createLayer('background', tiledPlatform);
        const platform = map.createLayer('platform', tiledPlatform);
        const almohadas = map.createLayer('almohadas', tiledAlmohada);
        platform.setCollisionByProperty({collides: true});

        almohadas.setCollisionByProperty({collides: true});

        const objectsLayer = map.getObjectLayer("objects");

        //Creacion de player
        const spawnPlayer = map.findObject("objects", (obj)=> obj.name === 'player');
        this.player = new Player(this, spawnPlayer.x, spawnPlayer.y, "player-static", this.healthPlayer);

        this.cameras.main.startFollow(this.player, true, 0.08, 0.08)
        this.cameras.main.setZoom(1);
        this.cameras.main.setBounds(0, 0, 5120, 768);
        this.physics.world.setBounds(0, 0, 5120, 768);

        this.obstaclesGroup = this.physics.add.group();
        this.ballGroup = this.physics.add.staticGroup();
        this.spikesGroup = this.physics.add.staticGroup();
        this.chocolatesGroup = this.physics.add.staticGroup();
        this.chocolatesGroup = this.physics.add.staticGroup();

        // console.log(objectsLayer.objects)
        objectsLayer.objects.forEach(objData => {
            const {x, y, name, type} = objData;

            switch(name || type){
                case 'enemy':
                        this.enemy = new EnemyRunner(this, x, y, 'enemy-anxiety');
                    break;
                case 'obstacles':
                    this.obstaclesGroup.create(x, y, 'book');
                break;
                case 'sofa':
                    this.ballGroup.create(x, y, 'ball');
                break;
                case 'spike':
                        this.spikesGroup.create(x, y, 'spike');
                break;
                case 'spike-rot':
                        const spike = this.spikesGroup.create(x, y, 'spike');
                        spike.setFlipY(true)
                break;
                case 'chocolate':
                    if(this.canPickHeart) this.chocolatesGroup.create(x, y, 'chocolate');
                break;
                case 'star':
                    // this.chocolatesGroup.create(x, y, 'star');
                    this.star = this.physics.add.image(x, y, 'star');
                    this.star.body.allowGravity = false;
                    this.star.setScale(1.8);

                    this.tweens.add({
                        targets: this.star,
                        y: 500,
                        ease: "Sine.easeInOut",
                        duration: 900,
                        yoyo: true,
                        repeat: -1,
                    })
                break;
            }
        });

        this.obstaclesGroup.children.iterate((obstacle)=>{
            obstacle.body.allowGravity = false;
            obstacle.setOrigin(0.5)
            obstacle.play("book-anims");
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
        this.physics.world.setBoundsCollision(true, true, true, true);
        this.physics.add.collider(this.player, platform);
        this.physics.add.collider(this.player, almohadas);

        this.physics.add.collider(this.player, this.ballGroup, (player, ball)=>{
            ball.play('ball-anims');
            this.player.setVelocityY(-500)
        }, null, this);

        //Cuando pisas un pincho -Mueres
        this.physics.add.collider(this.player, this.spikesGroup, (player, spike)=>{
            // console.log('El spike');
            this.hitPlayer()
            
        }, null, this);
        this.physics.add.collider(this.enemy, platform);

        //Cuando te agarra el enemigo -Mueres
        this.physics.add.overlap(this.enemy, this.player, ()=>{
            // console.log('Moriste')
            this.hitPlayer();
        });
        //Cuando agarras el chocolate
        this.physics.add.overlap(this.player, this.chocolatesGroup, (player, chocolate)=>{
            if(this.player.health === 5) return; 
            this.sonidos.sound.chocolateSFX.play();
            if(this.player.health < 5 && this.canPickHeart){
                // console.log('YESSS')
                this.player.health = this.player.health + 1;
                this.canPickHeart = false;
                this.scene.launch('UI', {player:{health: this.player.health}})
                chocolate.destroy()
            }
        });
        //Cuando choca con la estrella
        this.physics.add.overlap(this.player, this.star, (player, star)=>{
            if(this.countStar <= 2) ++this.countStar;
            this.sonidos.sound.estrellaSFX.play();
            this.scene.stop('UI');
            this.scene.stop(this);
            this.scene.start('Habitacion', {
                player: {
                    health: this.player.health,
                    countStar: this.countStar
                },
                sonidos: this.sonidos
            });
        });
        //Cuando choca con obstaculo
        this.physics.add.overlap(this.player, this.obstaclesGroup, (player, obstacle)=>{
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

    }
    hitPlayer(){
        this.sonidos.sound.deathSFX.play();
        this.physics.pause()
        this.player.anims.stop()
        this.tweens.pauseAll()
        this.anims.pauseAll();
        this.player.removeHealth();
        this.scene.launch('UI', {player:{health: this.player.health}})
        setTimeout(()=>{
            this.gameOver = true;
        }, 4000)
    }
    isGameOver(){
        this.sonidos.sound.musicRunner.stop();
        this.sonidos.sound.musicMenu.play();
        this.gameOver = false;
        this.scene.stop('UI');
        this.scene.stop(this);
        this.scene.start('Habitacion', {
            player: {
                health: this.player.health,
                canPickHeart: this.canPickHeart
            },
            sonidos: this.sonidos
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