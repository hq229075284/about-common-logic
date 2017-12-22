var http = require('http')
var fs = require('fs')
var path = require('path')

http.createServer((request, response) => {
  let contentType
  let data
  console.log(request.url)
  switch (true) {
    case request.url === '/':
      contentType = 'text/html'
      data = fs.readFileSync('../frontend/index.html')
      break;
    case /\.html$/.test(request.url):
      contentType = 'text/html'
      data = fs.readFileSync(path.join(__dirname, `../frontend/${request.url}`))
      break
    case /deepCompareObjectValueEqual\.js$/.test(request.url):
      contentType = 'text/javascript'
      data = fs.readFileSync(path.join(__dirname, `../${request.url}`))
      break;
    case /\.js$/.test(request.url):
      contentType = 'text/javascript'
      data = fs.readFileSync(path.join(__dirname, `../frontend/${request.url}`))
      break;
    case /\.json$/.test(request.url):
      contentType = 'application/json'
      data = fs.readFileSync(path.join(__dirname, request.url))
      break;
    default:
      contentType = 'text/plain'
      break;
  }
  setTimeout(() => {
    response.writeHead(200, { contentType })
    response.end(data)
  }, 4000)
}).listen(2333, () => { console.log('listen:2333') })