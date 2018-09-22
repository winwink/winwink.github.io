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
typeof is like 'typeof()' in c#
``` javascript
if (typeof v === "undefined"){
    ...
}

```
instanceof, is like 'is' in c#
```javascript
'abc'[1] // 'b'
'abc'.length // 3
'abc' instanceof Array //false
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

### [array value](https://wangdoc.com/javascript/types/array.html)
本质是对象，键值是自增长的数字
清空数组的一种方式是set length = 0;
in 运算符
``` javascript
var arr = [ 'a', 'b', 'c' ];
2 in arr  // true
'2' in arr // true
4 in arr // false
'a' in arr // false
```
遍历用for循环
```javascript
var a = [1, 2, 3];
for(var i = 0; i < a.length; i++) {
  console.log(a[i]);
}
```
类似数组的对象arrayLike
```javascript
'abc'[1] // 'b'
'abc'.length // 3
'abc' instanceof Array // false

var arr = Array.prototype.slice.call(arrayLike);
```

## [运算符](https://wangdoc.com/javascript/operators/arithmetic.html)
重写valueOf和toString方法
字符串的比较，是安装Unicode码数进行比较的
取Unicode 
```javascript
"1".charCodeAt(0) // 49
"𝌆".charCodeAt(0) // 55348
```

严格相等运算符 ==与===
对于不同类型的比较，===直接返回false；==会将它们转换为同一类型后，再比较。
对于Primitive Type，===比较2个值是否相等
对于Complex Type， ===比较2个引用地址是否相同，==比较2个值是否相同

~~快速取整
```javascript
~~2.9 // 2
~~3 // 3
~~-5.3 // -5
```

位运算有开关的作用，判断某个开关是否开启

### [运算符转换](https://wangdoc.com/javascript/features/conversion.html)
Number(), String(), Boolean()

### [错误处理](https://wangdoc.com/javascript/features/error.html)
Error
- SyntaxError
- ReferenceError, like NullReferenceException in C#
- RangeError
- TypeError
- URIError
- EvalError
自定义Error
```javascript
function UserError(message) {
  this.message = message || '默认信息';
  this.name = 'UserError';
}
UserError.prototype = new Error();
UserError.prototype.constructor = UserError;
```
Catch类型判断
```javascript
try {
  foo.bar();
} catch (e) {
  if (e instanceof EvalError) {
    console.log(e.name + ": " + e.message);
  } else if (e instanceof RangeError) {
    console.log(e.name + ": " + e.message);
  }
  // ...
}
```

## [编程风格](https://wangdoc.com/javascript/features/style.html)

### 圆括号
- 表示函数调用时，函数名与左括号之间没有空格。
- 表示函数定义时，函数名与左括号之间没有空格。
- 其他情况时，前面位置的语法元素与左括号之间，都有一个空格。

### switch...case建议换成对象结构
```javascript
function doAction(action) {
  var actions = {
    'hack': function () {
      return 'hack';
    },
    'slash': function () {
      return 'slash';
    },
    'run': function () {
      return 'run';
    }
  };

  if (typeof actions[action] !== 'function') {
    throw new Error('Invalid action.');
  }

  return actions[action]();
}
```

## [Console对象与控制台](https://wangdoc.com/javascript/features/console.html)
console.log自带换行
- %s 字符串
- %d 整数
- %i 整数
- %f 浮点数
- %o 对象的链接
- %c CSS格式字符串
```javascript
console.log(
  '%cThis text is styled!',
  'color: red; background: yellow; font-size: 24px;'
)
```

