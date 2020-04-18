const fetch = require('node-fetch'),
      validator = require('./validator'),
      url = require('url');

const getContentFromGithub = (username) => {
  return new Promise(async (resolve, reject) => {
    fetch(`https://raw.githubusercontent.com/${username}/about.me/master/index.json`)
      .then(res => res.json())
      .then(jsonData => {
        validator.validate(jsonData).then(cont => resolve(jsonData)).catch(e => reject(e))
      }).catch(e => reject(e))
  });
}

const getContentFromURL = (url) => {

  return new Promise(async (resolve, reject) => {
    try {
      const page = new URL(url);
    } catch(e) {
      reject({})
    }
    
    fetch(url)
      .then(res => res.json())
      .then(jsonData => {
        validator.validate(jsonData).then(cont => resolve(JSON.parse(JSON.stringify(jsonData)))).catch(e => reject(e))
      }).catch(e => reject(e))
  });
}

module.exports = {
  getContentFromURL,
  getContentFromGithub,
}