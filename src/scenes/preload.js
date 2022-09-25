export default class Preload extends Phaser.Scene {
    constructor() {
        super("Preload");    
    }

    init(){
        console.log('preload')
    }
    preload(){
        this.load.tilemapTiledJSON('runner', 'public/assets/tilemaps/runner.json');
        this.load.image("btn", "public/assets/boton.png");

        //Prototipo
        this.load.image('player', 'public/assets/player.png')
        this.load.image('ground', 'public/assets/ground.png')
        this.load.image('enemy', 'public/assets/enemy.png')
        this.load.image('book', 'public/assets/book.png')
        this.load.image('spike', 'public/assets/spike.png')
        this.load.image('sofa', 'public/assets/sofa.png')
    }

    create() {
        const {width, heigth} = this.scale;
        this.add.text(500 , 500, 'Cargando')
        this.scene.start("MainMenu");
        setTimeout(()=>{
        }, 3000)
    }
}