---
layout: post2
title: JavaScript Learn
description: JavaScript学习笔记
keywords: javascript, 教程
tags: [javascript]
---

参考 https://wangdoc.com/javascript/index.html

## [Special with C#](https://wangdoc.com/javascript/basic/grammar.html)
- 变量名区分大小写 Case sensitive
- 动态类型
- 变量提升 console.log(a);var a=1; -> var a;console.log(a);a =1;
- 标识符首字符可以为"$_"和其他字母，包括汉字
- 区块("{}")，不构成单独的作用域。区块内定义的变量，在区块外依旧有效。
- label: ,命名一个区块，可以break或者continue。

## [数据类型](https://wangdoc.com/javascript/types/general.html)
### primitive type
- number
- string
- boolean
### complex type
- undefined
- null
- object

#### object
- object
- array
- function

### typeof
``` javascript
if (typeof v === "undefined"){
    ...
}

```

## Values
### [bool value](https://wangdoc.com/javascript/types/null-undefined-boolean.html)
- undefined
- null
- false
- 0
- NaN
- "" or ''

### [number value](https://wangdoc.com/javascript/types/number.html)
所有数字以64位浮点数形式存储
``` javascript
1 === 1.0 //true
0.1 + 0.2 === 0.3 //false
0.3 / 0.1 //2.9999999999999996
(0.3 - 0.2) === (0.2 - 0.1) //false
```

精确表示范围： -2^53~2^53
范围： 2^-1023 ~ 2^1024
Number.MAX_VALUE, Number.MIN_VALUE

数字方法
``` javascript
parseInt('123') //123
parseInt(1.23) //1
parseInt('8a') //8
parseInt('15px') //15
parseInt('1000',2) //8
parseInt('1000',8) //512
```

``` javascript
parseFloat('3.14') //3.14
```

``isNaN``, 判断一个值是否为NaN
``` javascript
isNaN(NaN) //true
isNaN(123) //false
isNaN('hello') //true
isNaN(['xyz']) //true
isNaN([]) //false 空数组转为0
isNaN([123]) //false 单数字数组转成数字，等同于isNaN(Number([123]))

function myIsNaN(value) {
  return typeof value === 'number' && isNaN(value);
}
```

### [string value](https://wangdoc.com/javascript/types/string.html)
``` javascript
'Did she say \'Hello\'?' // "Did she say 'Hello'?"
var longString = 'Long \
long \
long \
string'; // "Long long long string"
```

字符串无法修改
``` javascript
var s = 'hello';
s[0] = 'a'
s // "hello"
```
JavaScript使用Unicode字符集
``` javascript
"hello".length //5
"我们".length //2
"𝌆".length //2
```

Base64
``` javascript
btoa('hello world!') //aGVsbG8gd29ybGQh
atob('aGVsbG8gd29ybGQh') // "hello world!"
btoa('你好') // 报错

function b64Encode(str) {
  return btoa(encodeURIComponent(str));
}

function b64Decode(str) {
  return decodeURIComponent(atob(str));
}

b64Encode('你好') // "JUU0JUJEJUEwJUU1JUE1JUJE"
b64Decode('JUU0JUJEJUEwJUU1JUE1JUJE') // "你好"
```

### [object value](https://wangdoc.com/javascript/types/object.html)
值拷贝，对象引用
``` javascript
var o1 = {};
var o2 = o1;
o1.a = 1;
o2.a // 1

var x = 1;
var y = x;
x = 2;
y // 1
```
查看所有属性 Object.keys(obj);
属性是否存在 'p' in obj;
属性遍历
``` javascript
var obj = {a: 1, b: 2, c: 3};

for (var i in obj) {
  console.log('键名：', i);
  console.log('键值：', obj[i]);
}
// 键名： a
// 键值： 1
// 键名： b
// 键值： 2
// 键名： c
// 键值： 3
```
with语句，不建议使用
``` javascript
var obj = {
  p1: 1,
  p2: 2,
};
with (obj) {
  p1 = 4;
  p2 = 5;
}
// 等同于
obj.p1 = 4;
obj.p2 = 5;
```
###  [function value](https://wangdoc.com/javascript/types/function.html)
重名的函数，后面的会覆盖前面的
两种作用域，全局作用域和函数作用域
函数的参数可以省略，所谓”重载“
``` javascript
function f(a, b) {
  return a;
}

f(1, 2, 3) // 1
f(1) // 1
f() // undefined

f.length // 2
```
参数Primitive Type时值传递，参数Complex Type时地址传递。
不定长参数，内部读取用arguments，类似c#的params
``` javascript
var f = function (one) {
  console.log(arguments[0]);
  console.log(arguments[1]);
  console.log(arguments[2]);
}

f(1, 2, 3)
// 1
// 2
// 3
```
arguments不是数组
立刻执行的函数表达式，好处是完全避免了污染全局变量
``` javascript
// 写法一
var tmp = newData;
processData(tmp);
storeData(tmp);

// 写法二
(function () {
  var tmp = newData;
  processData(tmp);
  storeData(tmp);
}());
```