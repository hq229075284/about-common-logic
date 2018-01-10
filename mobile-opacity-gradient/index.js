
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS之类的
    module.exports = factory();
  } else {
    // 浏览器全局变量(root 即 window)
    root.transformMarkOpacity = factory();
  }
}(this, function () {
  function returnOffsetTop(prev, currentDom, utilDom) {
    var _offsetTop = currentDom.offsetTop || 0
    if (!currentDom.parentNode || currentDom.parentNode === utilDom) {
      return prev + _offsetTop
    } else {
      return returnOffsetTop(prev + _offsetTop, currentDom.parentNode)
    }
  }

  function bindEventListenerOnWindow(eventNames, callback) {
    eventNames.map(function (eventName) {
      window.addEventListener(eventName, callback)
    })
  }

  return function (option) {
    var parentDom = option.parentDom
    var childDom = option.childDom
    var maskDom = option.maskDom
    var containerDom = option.containerDom
    var transitionFn = option.transitionFn
    var initDistance = returnOffsetTop(0, childDom, containerDom)
    var distance

    function _transitionFn(_initDistance, _currentDistance) {
      var _opacity = -(1 / _initDistance) * _currentDistance + 1
      if (_opacity > 1) _opacity = 1
      if (_opacity < 0) _opacity = 0
      return _opacity
    }

    bindEventListenerOnWindow(['touchmove'], function (e) {
      var _distance = returnOffsetTop(0, childDom, containerDom) - containerDom.scrollTop
      var opacity = transitionFn ? transitionFn(initDistance, _distance) : _transitionFn(initDistance, _distance)
      maskDom.style.opacity = opacity
    })
  }
}));

transformMarkOpacity({
  childDom: document.getElementsByClassName('target')[0],
  maskDom: document.getElementsByClassName('mask')[0],
  containerDom: document.getElementsByClassName('container')[0],
  transitionFn: undefined
})