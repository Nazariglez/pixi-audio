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

  filterAudios(id, value){
    let audios = [];
    let len = this.sounds.length;
    let emptyValue = typeof value === "undefined";

    for(let i = 0; i < len; i++){
      if((emptyValue && !!this.sounds[i][id])||(!emptyValue && this.sounds[i][id] === value)){
        audios.push(this.sounds[i]);
      }
    }

    return audios;
  }

  mute(value){
    value = (value !== false);
    let len = this.sounds.length;
    for(let i = 0; i < len; i++)this.sounds[i].muted = value;
  }

  unmute(){
    return this.mute(false);
  }

  pause(value){
    value = (value !== false);
    let len = this.sounds.length;
    for(let i = 0; i < len; i++)this.sounds[i].paused = value;
  }

  resume(){
    return this.pause(false);
  }

}
