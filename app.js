const request = require('request')
const fs = require('fs')
const uuid = require('uuid')

var pathToSave = "./TEMP/"
var start = 1000
var end = 1050
dowork()

async function dowork() {
  var id = 'mv';
  for (let index = start; index < end; index++) {

    var options = {
      uri: 'https://prnt.sc/' + id + index,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1)'
      }
    }
    await sleep(2000);
    try {
      doRequest(options)
    } catch (error) {
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function doRequest(opt) {
  request(opt, function (error, response, body) {
    //console.log(opt.uri)
    if (!error && response.statusCode == 200) {
      console.log(body.id)
    }
    //console.log(response.body)
    var a = response.body.match("(http)?s?:?(\/\/[^\"']*\.(?:png|jpg|jpeg))")
    if (a != null) {
      console.log(a[0])
      if (a[0].search("https://i.imgur.com/") == -1) {
        request(a[0]).pipe(fs.createWriteStream(pathToSave + uuid.v1() + ".png"))
      }
    }
  })
}



