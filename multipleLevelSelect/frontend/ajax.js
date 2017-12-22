function ajax(url, callback) {
  var xhr = new XMLHttpRequest()
  xhr.open('get', url, true)
  xhr.send()
  xhr.onreadystatechange = function (e) {
    if (e.target.readyState === 4 && e.target.status >= 200 && e.target.status <= 304) {
      console.log(JSON.parse(e.target.responseText))
      callback(JSON.parse(e.target.responseText))
    }
  }
  return xhr
}