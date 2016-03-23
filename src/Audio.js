import PIXI from 'pixi.js';
import utils from './utils';

export default class Audio extends PIXI.utils.EventEmitter{
  _loop = false;
  _paused = false;
  _muted = false;
  _volume = 1;

  _startTime = 0;
  _lastPauseTime = 0;
  _offsetTime = 0;

  playing = false;

  constructor(data, manager){
    super();
    this.manager = manager;
    this.data = data;

    if(!utils.isWebAudioSupported){
      this.audio = new window.Audio();
      this.audio.addEventListener('ended', this._onEnd.bind(this));
    }
  }

  play(pause){
    if((!pause && this.paused) || (!pause && this.playing)) return this;
    this.playing = true;
    this.emit('play');

    if(utils.isWebAudioSupported){
      this.audio = this.manager.context.createBufferSource();
      this.audio.start = this.audio.start || this.audio.noteOn;
      this.audio.stop = this.audio.stop || this.audio.noteOff;

      this.audio.buffer = this.data;
      this.audio.loop = this.loop;
      this._startTime = this.manager.context.currentTime;

      this.audio.onended = this._onEnd.bind(this);
      this.audio.gainNode = utils.createGainNode(this.manager.context);
      this.audio.gainNode.gain.value = this.muted ? 0 : this.volume;
      this.audio.gainNode.connect(this.manager.gainNode);

      this.audio.connect(this.audio.gainNode);
      this.audio.start(0, pause ? this._lastPauseTime : null);
    }else{
      this.audio.src = this.data.children[0].src;
      this.audio.preload = "auto";
      this.audio.volume = this.muted ? 0 : this.volume;
      this.audio.load();
      this.audio.play();
    }

    return this;
  }

  stop(){
    if(!this.playing)return this;

    if(utils.isWebAudioSupported){
      this.audio.stop(0);
    }else{
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    this.playing = false;
    this.emit('stop');

    return this;
  }

  reset(){
    this._startTime = 0;
    this._lastPauseTime = 0;
    this._offsetTime = 0;

    this.playing = false;
    //if(utils.isWebAudioSupported)this.audio = null;
  }

  remove(){
    this.manager.removeAudio(this);
  }

  _onEnd(){
    if(!utils.isWebAudioSupported){
      if(this.loop){
        this.audio.currentTime = 0;
        this.audio.play();
      }else{
        this.reset();
        this.emit('end');
      }
    }else{
      if(!this.paused){
        this.reset();
        this.emit('end');
      }
    }
  }

  get paused(){return this._paused}
  set paused(value){
    if(value === this._paused)return;
    if(value){
      if(utils.isWebAudioSupported){
        this._offsetTime += this.manager.context.currentTime - this._startTime;
        this._lastPauseTime = this._offsetTime%this.audio.buffer.duration;
        if(this.audio)this.audio.stop(0);
      }else{
        if(this.audio)this.audio.pause();
      }
      this.emit('pause');
    }else{
      if(utils.isWebAudioSupported){
        this.play(true);
      }else{
        if(this.audio)this.audio.play();
      }
      this.emit('resume');
    }
    this._paused = value;
  }

  get loop(){return this._loop}
  set loop(value){
    if(value === this._loop)return;
    this._loop = value;
    if(utils.isWebAudioSupported&&this.audio){
      this.audio.loop = value;
    }
  }

  get volume(){return this._volume}
  set volume(value){
    if(value === this._volume)return;
    if(utils.isWebAudioSupported){
      if(this.audio)this.audio.gainNode.gain.value = this.muted ? 0 : this.volume;
    }else{
      if(this.audio)this.audio.volume = this.muted ? 0 : this.volume;
    }
    this._volume = value;
  }

  get muted(){return this._muted};
  set muted(value){
    if(value === this._muted)return;
    this._muted = value;
    if(utils.isWebAudioSupported){
      if(this.audio)this.audio.gainNode.gain.value = this._muted ? 0 : this.volume;
    }else{
      if(this.audio)this.audio.volume = this._muted ? 0 : this.volume;
    }
  }
}
