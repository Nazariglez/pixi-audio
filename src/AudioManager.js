import utils from './utils';

export default class AudioManager{
  static audios = {};

  constructor(){
    this.isEnabled = utils.isAudioSupported;
    
    if(utils.isWebAudioSupported){
        this.context = utils.globalWebAudioContext;
        this.gainNode = utils.createGainNode(this.context);
        this.gainNode.connect(this.conext.destination);
    }


  }
}
