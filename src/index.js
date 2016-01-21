import PIXI from'pixi.js';
import utils from './utils';
import AudioManager from './AudioManager';
import {audioParser, audioUrlParser} from './audioParser';

let audio = {
  utils : utils,
  AudioManager : AudioManager,
  Audio : Audio,
  audioParser : audioParser
};

if(!PIXI.AudioManager){
  let Loader = PIXI.loaders.Loader;
  Loader.addPixiMiddleware(audioParser);

  let baseAdd = Loader.prototype.add;
  Loader.prototype.add = function(name, url, options, cb){
    if(typeof name === 'object'){
      if(Object.prototype.toString.call(name.url) === "[object Array]"){
        name.url = audioUrlParser(name.url);
      }
    }

    if(Object.prototype.toString.call(url) === "[object Array]"){
      url = audioUrlParser(url);
    }

    return baseAdd.call(this, name, url, options, cb);
  };

  PIXI.audio = audio;
  PIXI.loader = new PIXI.loaders.Loader();
  PIXI.loaders.audioParser = audioParser;
  PIXI.audioManager = new AudioManager();
}

export default audio;
