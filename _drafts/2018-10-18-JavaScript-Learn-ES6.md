---
layout: post2
title: JavaScript Learn ES6
description: JavaScript学习笔记之ES6
keywords: javascript, 教程, ES6
tags: [javascript] [ES6]
---

参考http://es6.ruanyifeng.com/#docs/intro
## [babel](http://es6.ruanyifeng.com/#docs/intro#Babel-%E8%BD%AC%E7%A0%81%E5%99%A8)
- Babel 的配置文件是.babelrc，存放在项目的根目录下。使用 Babel 的第一步，就是配置这个文件。
- Babel 提供babel-cli工具，用于命令行转码。
- babel-cli工具自带一个babel-node命令，提供一个支持 ES6 的 REPL 环境。它支持 Node 的 REPL 环境的所有功能，而且可以直接运行 ES6 代码。
- babel-register模块改写require命令，为它加上一个钩子。此后，每当使用require加载.js、.jsx、.es和.es6后缀名的文件，就会先用 Babel 进行转码。
- 如果某些代码需要调用 Babel 的 API 进行转码，就要使用babel-core模块。
- Babel只转换新出的语法，不转换新的API。例如，在Array对象上新增了Array.from方法。Babel 就不会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片。
- [Babel在线转换器](https://babeljs.io/repl/)
- 许多工具需要 Babel 进行前置转码，这里举两个例子：ESLint 和 Mocha。
- Google 公司的Traceur转码器，也可以将 ES6 代码转为 ES5 代码。

## ES6新的语法

### [let & const](http://es6.ruanyifeng.com/#docs/let)
let 是局部作用域，解决var定义的变量是全局变量的问题。
没有变量提升
不允许重复声明
“暂时性死区”（temporal dead zone，简称 TDZ），防止变量在定义前就开始使用
```javascript
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6]();
```
let, const, class定义的对象不再是顶层对象(window的属性)
[global对象的引入](http://es6.ruanyifeng.com/#docs/let#global-%E5%AF%B9%E8%B1%A1)

## [数组的解构](http://es6.ruanyifeng.com/#docs/destructuring#%E6%95%B0%E7%BB%84%E7%9A%84%E8%A7%A3%E6%9E%84%E8%B5%8B%E5%80%BC)

```javascript
let [a, b, c] = [1, 2, 3];
const [a, b, c, d, e] = 'hello';

function add([x, y]){
  return x + y;
}
add([1, 2]);

[[1, 2], [3, 4]].map(([a, b]) => a + b);

[x, y] = [y, x];
function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();
```

## [字符串的扩展](http://es6.ruanyifeng.com/#docs/string)
```javascript
let name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`
```
## [正则的扩展](http://es6.ruanyifeng.com/#docs/regex)
具名组匹配
```javascript
const RD_DATE =  /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj.groups.year; // 1999
const month = matchObj.groups.month; // 12
const day = matchObj.groups.day; // 31
```

## [数值的扩展](http://es6.ruanyifeng.com/#docs/number)

## [函数的扩展](http://es6.ruanyifeng.com/#docs/function)
函数默认值
```javascript
function log(x, y='World'){
  console.log(x,y);
}
```
利用默认值可以指定某个参数不能省略
```javascript
function throwIfMissing() {
  throw new Error('Missing parameter');
}

function foo(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}

foo()
// Error: Missing parameter
```

不定长参数
```javascript
function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10
```

箭头函数
```javascript
var sum = (num1, num2) => num1 + num2;
var sum1 = (num1, num2) => {var s = num1+num2; return s;}//多个运算要加大括号
lef getTempItem = id=>({id:id, name:"Temp"})//返回对象要加圆括号

//this的强化，箭头函数内的this指向函数定时时的对象而不是调用时的对象（如window）
function Timer() {
  this.s1 = 0;
  this.s2 = 0;
  // 箭头函数
  setInterval(() => this.s1++, 1000);
  // 普通函数
  setInterval(function () {
    this.s2++;
  }, 1000);
}

var timer = new Timer();

setTimeout(() => console.log('s1: ', timer.s1), 3100);
setTimeout(() => console.log('s2: ', timer.s2), 3100);
// s1: 3
// s2: 0

```

尾递归优化，只有在严格模式下才会进行

## [数组的扩展](http://es6.ruanyifeng.com/#docs/array)
扩展运算符
```javascript
console.log(...[1,2,3]);//1 2 3
```
Iterator接口转Array,任何 Iterator 接口的对象（参阅 Iterator 一章），都可以用扩展运算符转为真正的数组。
```javascript
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);
let arr = [...map.keys()]; //[1,2,3]
```
Array.from(arrayLike)
Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。

Array.of(),代替Array的构造函数

[].prototype.flat()数组拉平

## [对象的扩展](http://es6.ruanyifeng.com/#docs/object)
Object.is()
Object.assign()
属性的遍历
__proto__

## [Symbol](http://es6.ruanyifeng.com/#docs/symbol)
新的Primitive类型

## [Set和Map](http://es6.ruanyifeng.com/#docs/set-map)
Set, WeakSet, Map, WeakMap

## [Proxy](http://es6.ruanyifeng.com/#docs/proxy)
代理可以拦截属性
实例：Web服务器的客户端， ORM层

## [Reflect](http://es6.ruanyifeng.com/#docs/reflect)
实例：使用 Proxy 实现观察者模式

## [Promise](http://es6.ruanyifeng.com/#docs/promise)
```javascript
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
```
Promise 新建后立即执行，所以首先输出的是Promise。然后，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以resolved最后输出。


下面是一个用Promise对象实现的 Ajax 操作的例子
```javascript
const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject){
    const handler = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

  });

  return promise;
};

getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});
```

then(), catch(), finally(), all(), race(), resolve(), reject(), try()

## [Iterator & for ...of](http://es6.ruanyifeng.com/#docs/iterator)
要实现Iterator，需要在构造函数的原型链上部署[Symbol.iterator]
function*函数

for...in循环读取键名，for...of循环读取键值

## [Generator 函数的异步应用](http://es6.ruanyifeng.com/#docs/generator-async)
Thunk函数

## [async](http://es6.ruanyifeng.com/#docs/async)

[esm模块](https://www.npmjs.com/package/esm)加载器支持顶层await，即await命令可以不放在 async 函数里面，直接使用
[async vs Generator vs Promise](http://es6.ruanyifeng.com/#docs/async#%E4%B8%8E%E5%85%B6%E4%BB%96%E5%BC%82%E6%AD%A5%E5%A4%84%E7%90%86%E6%96%B9%E6%B3%95%E7%9A%84%E6%AF%94%E8%BE%83)

异步遍历器 Symbol.asyncIterator

## [Class](http://es6.ruanyifeng.com/#docs/class)
class是构造函数的语法糖
class内使用严格模式
默认添加默认构造函数
class必须要new才可执行
不支持私有方法，推荐用Symbol值
```javascript
const bar = Symbol('bar');
const snaf = Symbol('snaf');

export default class myClass{
  // 公有方法
  foo(baz) {
    this[bar](baz);
  }
  // 私有方法
  [bar](baz) {
    return this[snaf] = baz;
  }
};
```
安全的this指针。3种方法bind，箭头函数，proxy。
Class 内部只有静态方法，没有静态属性。

## [class的继承](http://es6.ruanyifeng.com/#docs/class-extends)

## [修饰器](http://es6.ruanyifeng.com/#docs/decorator)
[core-decorators.js](https://github.com/jayphelps/core-decorators.js)

## [Module](http://es6.ruanyifeng.com/#docs/module)
严格模式的限制
- 变量必须声明后再使用
- 函数的参数不能有同名属性，否则报错
- 不能使用with语句
- 不能对只读属性赋值，否则报错
- 不能使用前缀 0 表示八进制数，否则报错
- 不能删除不可删除的属性，否则报错
- 不能删除变量delete prop，会报错，只能删除属性delete global[prop]
- eval不会在它的外层作用域引入变量
- eval和arguments不能被重新赋值
- arguments不会自动反映函数参数的变化
- 不能使用arguments.callee
- 不能使用arguments.caller
- 禁止this指向全局对象
- 不能使用fn.caller和fn.arguments获取函数调用的堆栈
- 增加了保留字（比如protected、static和interface）

```javascript 输出变量
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export {firstName, lastName, year};
```

```javascript 输出函数
export function multiply(x, y) {
  return x * y;
};
```

```javascript 重命名
function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
```

```javascript 
// 报错
var m = 1;
export m;

// 写法二
var m = 1;
export {m};

// 报错
function f() {}
export f;

// 正确
export function f() {};

// 正确
function f() {}
export {f};
```

```javascript
import {firstName, lastName, year} from './profile.js';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}
```

```javascript import readonly
import {a} from './xxx.js'

a = {}; // Syntax Error : 'a' is read-only;
```
import命令具有提升效果，会提升到整个模块的头部，首先执行。
import语句会执行所加载的模块，因此可以有下面的写法。
`require('module')`是CommonJS的写法，不要和import放在一起

```javascript 默认输出
// export-default.js
export default function () {
  console.log('foo');
}

// import-default.js
import customName from './export-default';
customName(); // 'foo'
```
export可以使用多次，export default只能使用一次。可同时使用export和export default。

```javascript
// constants/db.js
export const db = {
  url: 'http://my.couchdbserver.local:5984',
  admin_username: 'admin',
  admin_password: 'admin password'
};

// constants/user.js
export const users = ['root', 'admin', 'staff', 'ceo', 'chief', 'moderator'];

// constants/index.js
export {db} from './db';
export {users} from './users';

// script.js
import {db, users} from './constants/index';
```

import无法和require一样，实现动态加载

## [Module的加载实现](http://es6.ruanyifeng.com/#docs/module-loader)

## [编程风格](http://es6.ruanyifeng.com/#docs/style)
let 取代 var
优先使用const
静态字符串一律使用单引号或反引号，不使用双引号。动态字符串使用反引号。
使用数组成员对变量赋值时，优先使用解构赋值。
```javascript 
const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr;
```

```javascript
// bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;
}

// good
function getFullName(obj) {
  const { firstName, lastName } = obj;
}

// best
function getFullName({ firstName, lastName }) {
}
```
单行定义的对象，最后一个成员不以逗号结尾。多行定义的对象，最后一个成员以逗号结尾。
对象尽量静态化，一旦定义，就不得随意添加新的属性。如果添加属性不可避免，要使用Object.assign方法。
使用扩展运算符（...）拷贝数组。
```javascript
// bad
const len = items.length;
const itemsCopy = [];
let i;

for (i = 0; i < len; i++) {
  itemsCopy[i] = items[i];
}

// good
const itemsCopy = [...items];
```
使用 Array.from 方法，将类似数组的对象转为数组。
那些需要使用函数表达式的场合，尽量用箭头函数代替。因为这样更简洁，而且绑定了 this。
不要在函数体内使用 arguments 变量，使用 rest 运算符（...）代替
总是用 Class，取代需要 prototype 的操作。因为 Class 的写法更简洁，更易于理解。
首先，Module 语法是 JavaScript 模块的标准写法，坚持使用这种写法。使用import取代require。
[ESLint的使用](http://es6.ruanyifeng.com/#docs/style#ESLint-%E7%9A%84%E4%BD%BF%E7%94%A8)

## [读懂ECMAScript规格](http://es6.ruanyifeng.com/#docs/spec)
[ES2015 Spec](http://www.ecma-international.org/ecma-262/6.0/#sec-overview)
[ES2018 Spec](https://www.ecma-international.org/ecma-262/9.0/index.html)

## [Reference](http://es6.ruanyifeng.com/#docs/reference)
