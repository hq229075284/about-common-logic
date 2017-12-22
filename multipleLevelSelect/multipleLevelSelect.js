(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS之类的
    module.exports = factory();
  } else {
    // 浏览器全局变量(root 即 window)
    root.multipleLevelSelect = factory();
  }
}(this, function () {
  // region 封装函数

  // 校验参数
  function tidyRequestHandle(requestHandle) {
    if (typeof resquestHandle === 'function') {
      return [requestHandle]
    } else if (Object.prototype.toString.call(requestHandle) === '[object Array]') {
      return requestHandle
    } else {
      throw new Error('requestHandle expect type of array or type of function')
    }
  }

  // 校验参数
  function tidyTriggerSymbol(triggerSymbol) {
    if (typeof triggerSymbol === 'string') {
      return [triggerSymbol]
    } else if (Object.prototype.toString.call(triggerSymbol) === '[object Array]') {
      return triggerSymbol
    } else {
      throw new Error('requestHandle expect type of array or type of string')
    }
  }

  function multipleLevelSelect() {
    var cache = {
      selected: [],
      request: []
    }
    /**
     * config
     * {requestHandle,triggerSymbol,isGetLevelOne}
     */
    return function (config) {
      config = config || {}
      // var _elements = config.elements
      var _requestHandle = tidyRequestHandle(config.requestHandle)
      var _triggerSymbol = tidyTriggerSymbol(config.triggerSymbol)
      if (_requestHandle.length !== _triggerSymbol.length) { throw new Error('requestHandle not as long as triggerSymbol') }

      if (config.isGetLevelOne) {
        cache.request[0] = _requestHandle[0](undefined, cache.selected[0])
      }

      return {
        onChange: function (nextValue, identity) {
          var modfiyIndex = _triggerSymbol.indexOf(identity)
          if (modfiyIndex > -1) {
            cache.selected[modfiyIndex] = nextValue
            cache.selected.splice(modfiyIndex + 1)
            cache.request.slice(modfiyIndex + 1).map(one => one.abort && one.abort())
            if (_requestHandle[modfiyIndex + 1]) {
              cache.request[modfiyIndex + 1] = _requestHandle[modfiyIndex + 1](cache.selected[modfiyIndex], cache.selected[modfiyIndex + 1])
            }
          }
        },
        print: function () {
          console.log(cache)
        }
      }
    }
  }

  // endregion 

  //暴露公共方法
  return multipleLevelSelect;
}));