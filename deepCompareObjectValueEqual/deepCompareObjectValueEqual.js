(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      // AMD
      define([], factory);
  } else if (typeof exports === 'object') {
      // Node, CommonJS之类的
      module.exports = factory();
  } else {
      // 浏览器全局变量(root 即 window)
      root.deepCompareObjectValueEqual = factory();
  }
}(this, function () {
  // 方法

  function isSameObjectLength(_obj1,_obj2){
    return Object.keys(_obj1).length===Object.keys(_obj2).length
  }

  function deepEqual(_arg1,_arg2) {
    var _arg1_type=typeof _arg1
    var _arg1_long_type=Object.prototype.toString.call(_arg1)
    var _arg2_long_type=Object.prototype.toString.call(_arg2)
    var result,keys
    // 处理类型为:string,boolean,undefined,symbol
    if(_arg1_type==='string'||_arg1_type==='boolean'||_arg1_type==='undefined'||_arg1_type==='symbol'){
      return _arg1===_arg2
    }else if(_arg1_type==='number'){
      if(typeof _arg2==='number'){
        if(isNaN(_arg1)&&isNaN(_arg2)){
          // 两个都是NaN，业务上认为值是一样的
          return true
        }
        // Infinite、普通数字
        return _arg1===_arg2
      }else{
        // arg1为数字型，arg2不是数字型
        return false
      }
    }else{
      if(_arg1_long_type===_arg2_long_type){
        if(_arg1===null){return true}
        // 处理类型为:object
        if(_arg1_long_type==='[object Object]'){
          if(!isSameObjectLength(_arg1,_arg2)) {
            return false
          }
          // 选择所有需要验证的对象属性
          keys=Object.keys(_arg1).concat(Object.getOwnPropertySymbols(_arg1))
          for(var i=0;i<keys.length;i++){
            result=deepEqual(_arg1[keys[i]],_arg2[keys[i]])
            if(!result) return false            
          }
          return true
        }
        // 处理类型为:array
        if(_arg1_long_type==='[object Array]'){
          if(_arg1.length!==_arg2.length) {
            return false
          }
          for(var i=0;i<_arg1.length;i++){
            result=deepEqual(_arg1[i],_arg2[i])
            if(!result) return false
          }
          return true
        }
      }
      return false
    }
  }

  function deepCompareObjectValueEqual(){
    var arg1=arguments[0]
    var arg2=arguments[1]||this
    return deepEqual(arg1,arg2)
  };

  //    暴露公共方法
  return deepCompareObjectValueEqual;
}));