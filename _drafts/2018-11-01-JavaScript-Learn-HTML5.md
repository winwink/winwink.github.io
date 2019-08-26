---
layout: post2
title: HTML5 part of JavaScript Learn
description: JavaScript学习笔记之HTML5
keywords: javascript, 教程
tags: [javascript]
---

From犀牛书JavaScript权威指南第6版
## 22.1地理位置
navigator.geolocation.getCurrentPosition(callback)
navigator.geolocation.watchPosition(callback)
navigator.geolocation.clearWatch(watchId)

```javascript
navigator.geolocation.getCurrentPosition(function(pos){
    var latitude = pos.coords.latitude;
    var longitude = pos.coords.longitude;
    console.log("Your position:"+ latitude+", "+longitude);
})
```

## 22.2历史记录管理
history.pushState()
history.replaceState()

## 22.3跨域消息传递
window.postMessage()

## 22.4 Web Worker

## 22.5 类型化数组和ArrayBuffer

## 22.6 Blob
Binary Large Object

## 22.7 文件系统API

## 22.8 客户端数据库
IndexedDB

## 22.9 Web套接字
WebSocket