export default class Button {
    constructor(scene, x, y, texture, text, size = 16, callback, scale) {
        // console.log(scene)
        this.container = scene.add.container(x, y);
        

        this.img = scene.add.image(0, 0, texture)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => this.img.setTint(0xFFFF))
        .on('pointerout',() => this.img.clearTint())
        .on("pointerdown", () => callback())
        

        this.txt = scene.add.text(0, 0, text, {fontSize: size, fontStyle: 'bold'}).setOrigin(0.5);

        this.container.add([this.img, this.txt]);


    }

    colorFondo(color){
        this.txt.setBackgroundColor(color);
    }
}
