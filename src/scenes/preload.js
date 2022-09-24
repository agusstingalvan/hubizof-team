export default class Preload extends Phaser.Scene {
    constructor() {
        super("Preload");    
    }

    init(){
        console.log('preload')
    }
    preload(){
        this.load.image("btn", "public/assets/boton.png");
    }

    create() {
        // this.add.text()
        const {width, heigth} = this.scale;
        this.add.text(500 , 500, 'Cargando')
        this.scene.start("MainMenu");
        setTimeout(()=>{
        }, 3000)
    }
}