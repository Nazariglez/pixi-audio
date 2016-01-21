import utils from './utils';
import AudioManager from './AudioManager';

const _allowedExt = ["m4a", "ogg", "mp3", "wav"];

export function audioParser(){
  return function(resource, next){
    if(!utils.isAudioSupported || !resource.data)return next();

    let ext = _getExt(resource.url);
    if(_allowedExt.indexOf(ext) === -1 || !_canPlay(ext))return next();

    let name = resource.name || resource.url;
    if(utils.isWebAudioSupported){
      utils.globalWebAudioContext.decodeAudioData(resource.data, (buffer)=>{
        AudioManager.audios[name] = buffer;
        next();
      });
    }else{
      AudioManager.audios[name] = resource.data;
      return next();
    }
  }
}

export function audioUrlParser(resourceUrl){
  let url;
  for(let i = 0; i < resourceUrl.length; i++){
    let ext = _getExt(resourceUrl[i]);
    if(_allowedExt.indexOf(ext) === -1)break;
    if(_canPlay(ext)){
      url = resourceUrl[i];
      break;
    }
  }

  return url;
}

function _getExt(url){
  return url.split('?').shift().split('.').pop().toLowerCase();
}

function _canPlay(ext){
  let canPlay = false;
  switch(ext){
    case "m4a": canPlay = utils.isM4aSupported; break;
    case "mp3": canPlay = utils.isMp3Supported; break;
    case "ogg": canPlay = utils.isOggSupported; break;
    case "wav": canPlay = utils.isWavSupported; break;
  }

  return canPlay;
}
