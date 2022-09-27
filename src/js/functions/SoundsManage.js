export default class SoundsManage{
    constructor(soundScene, volume = 1, sound) {
        this.sound = soundScene;
        this.sound.volume = volume;
        this.sound.musicMenu = this.sound.add("menu", { loop: true, volume: volume });
        this.sound.musicRunner = this.sound.add("runner", { loop: true, volume: volume });
        this.sound.musicIra = this.sound.add("iraMusic", { loop: true, volume: volume });
        this.sound.chocolateSFX = this.sound.add("chocolate");
        this.sound.estrellaSFX = this.sound.add("estrella");
        this.sound.gameoverSFX = this.sound.add("gameover");
        this.sound.winSFX = this.sound.add("win");
        this.sound.deathSFX = this.sound.add("death");
    }
}