import {loaders} from 'pixi.js';

let isHTMLAudioSupported = !!window.Audio,
  webAudioContext = window.AudioContext || window.webkitAudioContext,
  isWebAudioSupported = !!webAudioContext,
  isAudioSupported = isWebAudioSupported || isHTMLAudioSupported,
  isMp3Supported = false,
  isOggSupported = false,
  isWavSupported = false,
  isM4aSupported = false,
  createGainNode = null,
  globalWebAudioContext = isWebAudioSupported ? new webAudioContext() : null;

if(isAudioSupported){
  let audio = document.createElement("audio");
  isMp3Supported = audio.canPlayType('audio/mpeg;') !== "";
  isOggSupported = audio.canPlayType('audio/ogg; codecs="vorbis"') !== "";
  isWavSupported = audio.canPlayType('audio/wav') !== "";
  isM4aSupported = audio.canPlayType('audio/mp4; codecs="mp4a.40.5"') !== "";

  //Add some config to the pixi loader
  if(isMp3Supported)_setAudioExt("mp3");
  if(isOggSupported)_setAudioExt("ogg");
  if(isWavSupported)_setAudioExt("wav");
  if(isM4aSupported)_setAudioExt("m4a");

  if(isWebAudioSupported){
    createGainNode = function createGainNode(ctx){
      return ctx.createGain ? ctx.createGain() : ctx.createGainNode();
    }
  }
}

function _setAudioExt(ext){
  if(isWebAudioSupported){
    loaders.Resource.setExtensionXhrType(ext, loaders.Resource.XHR_RESPONSE_TYPE.BUFFER);
  }else{
    loaders.Resource.setExtensionLoadType(ext, loaders.Resource.LOAD_TYPE.AUDIO);
  }
}

export default {
  isHTMLAudioSupported : isHTMLAudioSupported,
  webAudioContext : webAudioContext,
  isWebAudioSupported : isWebAudioSupported,
  isAudioSupported : isAudioSupported,
  isMp3Supported : isMp3Supported,
  isOggSupported : isOggSupported,
  isWavSupported : isWavSupported,
  isM4aSupported : isM4aSupported,
  globalWebAudioContext : globalWebAudioContext,
  createGainNode: createGainNode
};
