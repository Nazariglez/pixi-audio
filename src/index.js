import PIXI from'pixi.js';
import utils from './utils';
import AudioManager from './AudioManager';
import {audioParser, audioUrlParser} from './audioParser';

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

    console.log(name, url, options);
    return baseAdd.call(this, name, url, options, cb);
  };

  PIXI.loader = new PIXI.loaders.Loader();
  PIXI.AudioManager = AudioManager;
  PIXI.loaders.audioParser = audioParser;
}

export default {
  utils : utils,
  audioParser : audioParser,
  AudioManager : AudioManager
};
