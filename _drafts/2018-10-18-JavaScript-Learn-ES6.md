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
