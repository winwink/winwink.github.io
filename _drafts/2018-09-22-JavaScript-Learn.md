---
layout: post2
title: JavaScript Learn
description: JavaScript学习笔记
keywords: javascript, 教程
tags: [javascript]
---

参考 https://wangdoc.com/javascript/index.html

[console log](https://www.cnblogs.com/moqiutao/p/7849961.html)

## Link of wangdoc
- https://wangdoc.com/javascript/events/eventtarget.html 参见后文《事件的传播》部分,详见《Event 对象》章节


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
- console.log()
- console.info()
- console.debug()
- console.warn() 黄色标识
- console.error() 红色标识，带trace信息
- console.table() 表格展示
- console.count() 自动计数，可分类
- console.dir() 详细信息
- console.dirxml() DOM Tree
- console.assert() 按条件中断执行
- console.time(), console.timeEnd 计时
- console.group(), console.groupEnd(), console.groupCollapsed() log分组
- console.trace() 查看trace信息
- console.clear() 清除console信息

控制台 API
monitorEvents(window, "resize");

debugger语句设置断点
```javascript
for(var i = 0; i < 5; i++){
  console.log(i);
  if (i === 2) debugger;
}
```

## [Object对象](https://wangdoc.com/javascript/stdlib/object.html)
对象方法
``` javascript
Object.print = function (o) { console.log(o) };
```
实例方法
```javascript
Object.prototype.print = function () {
  console.log(this);
};
var obj = new Object();
obj.print()
```
Object.keys()

自定义typeof
```javascript
var type = function (o){
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

['Null',
 'Undefined',
 'Object',
 'Array',
 'String',
 'Number',
 'Boolean',
 'Function',
 'RegExp'
].forEach(function (t) {
  type['is' + t] = function (o) {
    return type(o) === t.toLowerCase();
  };
});

type.isObject({}) // true
type.isNumber(NaN) // true
type.isRegExp(/abc/) // true
```

### [属性描述对象](https://wangdoc.com/javascript/stdlib/attributes.html)
6个属性
```javascript
{
  value: 123,
  writable: false,
  enumerable: true,
  configurable: false,
  get: undefined,
  set: undefined
}
```
获取属性对象
```javascript
var obj = { p: 'a' };
Object.getOwnPropertyDescriptor(obj, 'p')
// Object { value: "a",
//   writable: true,
//   enumerable: true,
//   configurable: true
// }
```
Object.keys()返回可遍历的属性列表
Object.getOwnPropertyNames()返回所有属性列表

Object.defineProperty()允许通过属性描述对象，定义或修改一个属性
getter,setter
```javascript
var obj ={
  $n : 5,
  get next() { return this.$n++ },
  set next(n) {
    if (n >= this.$n) this.$n = n;
    else throw new Error('新的值必须大于当前值');
  }
};
obj.next // 5
obj.next = 10;
obj.next // 10
obj.next = 5;
// Uncaught Error: 新的值必须大于当前值
```
防止对象被改变 Object.preventExtensions < Object.seal() < Object.freeze()

### [Array对象](https://wangdoc.com/javascript/stdlib/array.html)
LIFO: push, pop
FIFO: shift, unshift
slice(start, end)
slice方法的一个重要应用，是将类似数组的对象转为真正的数组。
map()类似c#的Select()
forEach()类似c#的ForEach()
filter()类似c#的Where()
some()类似c#的Any()
every()类似c#的All()
reduce()类似c#的sum()

## [包装对象](https://wangdoc.com/javascript/stdlib/wrapper.html)
原始类型的值，可以自动当作包装对象调用，即调用包装对象的属性和方法。这时，JavaScript 引擎会自动将原始类型的值转为包装对象实例，在使用后立刻销毁实例。

比如，字符串可以调用length属性，返回字符串的长度。
```javascript
'abc'.length // 3
```
abc是一个字符串，本身不是对象，不能调用length属性。JavaScript 引擎自动将其转为包装对象，在这个对象上调用length属性。调用结束后，这个临时对象就会被销毁。

### [Number](https://wangdoc.com/javascript/stdlib/number.html)
Number.MIN_VALUE：表示最小的正数(即最接近0的正数，在64位浮点数体系中为5e-324)
Number.MAX_SAFE_INTEGER: 9007199254740991
Number.MIN_SAFE_INTEGER: -9007199254740991

### [String](https://wangdoc.com/javascript/stdlib/string.html)
不建议使用substring()，建议使用slice()
substr类似c#的string.SubString()
toLowerCase()类似c#的ToLower()
toUpperCase()类似c#的ToUpper()
String.prototype.localeCompare()

### [Math](https://wangdoc.com/javascript/stdlib/math.html)

### [RegExp](https://wangdoc.com/javascript/stdlib/regexp.html)
```javascript
var regex = /xyz/;
```
### [JSON](https://wangdoc.com/javascript/stdlib/json.html)
JSON约束
- 复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象。
- 原始类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和null（不能使用NaN, Infinity, -Infinity和undefined）。
- 字符串必须使用双引号表示，不能使用单引号。
- 对象的键名必须放在双引号里面。
- 数组或对象最后一个成员的后面，不能加逗号。
JSON.stringify(), javascript => JSON string
JSON.parse(), JSON string => javascript
```javascript
JSON.stringify(false) // "false"
JSON.stringify('false') // "\"false\""
```
stringify(obj, selectedProperties)可以指定需要转成字符串的属性

## [实例对象与 new 命令](https://wangdoc.com/javascript/oop/new.html)
JavaScript 语言的对象体系，不是基于“类”的，而是基于构造函数（constructor）和原型链（prototype）。
```javascript
var Vehicle = function () {
  this.price = 1000;
};
var v = new Vehicle();
v.price // 1000
```
### [this关键字](https://wangdoc.com/javascript/oop/this.html)
call, apply, bind

### [对象的继承](https://wangdoc.com/javascript/oop/prototype.html)
```javascript
var MyArray = function () {};

MyArray.prototype = new Array();
MyArray.prototype.constructor = MyArray;

var mine = new MyArray();
mine.push(1, 2, 3);
mine.length // 3
mine instanceof Array // true
```

### [异步](https://wangdoc.com/javascript/async/index.html)
定时器和Promise

### [DOM](https://wangdoc.com/javascript/dom/general.html)

### [操作CSS](https://wangdoc.com/javascript/dom/css.html)

### [浏览器模型](https://wangdoc.com/javascript/bom/engine.html)
application/javascript为新的标准
```javascript
<script charset="utf-8" src="https://www.example.com/script.js" integrity="sha256-TvVUHzSfftWg1rcfL6TIJ0XKEGrgLyEq6lEpcmrG9qs="></script>
```
URL支持`javascript:`协议, href和浏览器

如果 JavaScript 代码返回一个字符串，浏览器就会新建一个文档，展示这个字符串的内容，原有文档的内容都会消失。

DOMContentLoaded事件，表示DOM加载完后
```javascript
<head>
  <script>
    document.addEventListener(
      'DOMContentLoaded',
      function (event) {
        console.log(document.body.innerHTML);
      }
    );
  </script>
</head>
```

#### 加载顺序
1. 浏览器一边下载 HTML 网页，一边开始解析。也就是说，不等到下载完，就开始解析。
2. 解析过程中，浏览器发现script元素，就暂停解析，把网页渲染的控制权转交给 JavaScript 引擎。
3. 如果script元素引用了外部脚本，就下载该脚本再执行，否则就直接执行代码。
4. JavaScript 引擎执行完毕，控制权交还渲染引擎，恢复往下解析 HTML 网页。

#### 特点
- 让script放在底部，可以等DOM加载完再执行
- 多个script脚本时，是按出现的先后顺序执行
- 对同一个域名，同时下载的脚本数目有限，数目为6~20个
- defer不会阻塞页面，会在DOM加载完后再执行
- async不会阻塞页面，会在下载完后执行，无法保证执行顺序

### [XMLHttpRequest对象](https://wangdoc.com/javascript/bom/xmlhttprequest.html)

### [CORS 同源限制](https://wangdoc.com/javascript/bom/same-origin.html)

### [JSONP,WebSocket,CORS](https://wangdoc.com/javascript/bom/same-origin.html)

### [Storage](https://wangdoc.com/javascript/bom/storage.html)
cookie 4KB
Storage: Chrome 2.5MB, FireFox & Opera 5MB, IE 10MB

### [Form](https://wangdoc.com/javascript/bom/form.html)

### [IndexDB](https://wangdoc.com/javascript/bom/indexeddb.html)
特点：
- 键值对存储
- 异步
- 支持事务
- 同源限制
- 存储空间大， >=250MB
- 支持二进制存储
接口
- IDBDataBase
- IDBObjectStore
- IDBIndex
- IDBTransaction
- IDBCursor
- IDBKeyRange

### [Web Worker](https://wangdoc.com/javascript/bom/webworker.html#navbar)
