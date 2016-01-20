import utils from './utils';
import Audio from './Audio';

export default class AudioManager{
  static audios = {};

  constructor(){
    this.enabled = utils.isAudioSupported;
    this.sounds = [];

    if(utils.isWebAudioSupported){
        this.context = utils.globalWebAudioContext;
        this.gainNode = utils.createGainNode(this.context);
        this.gainNode.connect(this.context.destination);
    }
  }

  getAudio(name){
    let audio = new Audio(AudioManager.audios[name], this);
    this.sounds.push(audio);
    return audio;
  }

  removeAudio(audio){
    let index = this.sounds.indexOf(audio);
    if(index !== -1){
      this.sounds.splice(index, 1);
    }
  }

  muteAll(value){
    value = (value === false);
    let len = this.sounds.length;
    for(let i = 0; i < len; i++)this.sounds[i].mute = value;
  }

  unmuteAll(){
    return this.muteAll(false);
  }

}
