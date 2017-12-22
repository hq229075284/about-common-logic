var deepCompareObjectValueEqual=require('../deepCompareObjectValueEqual')
var target1={
  a:'',
  b:0,
  c:true,
  d:null,
  e:undefined,
  f:[],
  g:{},
  h:NaN,
  // i:Symbol(),
  j:Symbol.for(),
  l:Infinity
}

var target2={
  a:'',
  b:0,
  c:true,
  d:null,
  e:undefined,
  f:[],
  g:{},
  h:NaN,
  // i:Symbol(),
  j:Symbol.for(),
  l:Infinity
}

console.log(deepCompareObjectValueEqual.call(target2,target1))
