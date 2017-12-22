var one = document.getElementById('one')
var two = document.getElementById('two')
var three = document.getElementById('three')


var control = multipleLevelSelect()({
  requestHandle: [
    function (preLevelValue, curentLevelCacheValue) {
      console.log(preLevelValue, curentLevelCacheValue);
      return ajax('http://localhost:2333/one.json', function (data) {
        one.innerHTML = data.list.map(function (one) { return '<option value=' + one.key + '>' + one.value + '</option>' }).join('')
      })
    },
    function (preLevelValue, curentLevelCacheValue) {
      console.log(preLevelValue, curentLevelCacheValue);
      return ajax('http://localhost:2333/two.json', function (data) {
        two.innerHTML = data.list.map(function (one) { return '<option value=' + one.key + '>' + one.value + '</option>' }).join('')
      })
    },
    function (preLevelValue, curentLevelCacheValue) {
      console.log(preLevelValue, curentLevelCacheValue);
      return ajax('http://localhost:2333/three.json', function (data) {
        three.innerHTML = data.list.map(function (one) { return '<option value=' + one.key + '>' + one.value + '</option>' }).join('')
      })
    },
  ],
  triggerSymbol: ['one', 'two', 'three'],
  isGetLevelOne: true
})

one.addEventListener('change',function(e){
  var nextValue=e.target.value
  control.onChange(nextValue,'one')
  control.print()
})

two.addEventListener('change',function(e){
  var nextValue=e.target.value
  control.onChange(nextValue,'two')
  control.print()
})

three.addEventListener('change',function(e){
  var nextValue=e.target.value
  control.onChange(nextValue,'three')
  control.print()
})

