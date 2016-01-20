import utils from './utils';
import Audio from './Audio';

export default class AudioManager{
  static audios = {};

  constructor(){
    this.enabled = utils.isAudioSupported;
    this.fxLines = 10;
    this.musicLines = 1;

    this._music = [];
    this._fx = [];

    if(utils.isWebAudioSupported){
        this.context = utils.globalWebAudioContext;
        this.gainNode = utils.createGainNode(this.context);
        this.gainNode.connect(this.context.destination);
    }
  }

  getFx(name){
    let audio = new Audio(AudioManager.audios[name], this);
    audio.fx = true;
    this._fx.push(audio);
    return audio;
  }

  getMusic(name){
    let audio = new Audio(AudioManager.audios[name], this);
    audio.music = true;
    this._music.push(audio);
    return audio;
  }
}
