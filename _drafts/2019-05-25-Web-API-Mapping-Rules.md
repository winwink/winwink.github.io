---
layout: post2
title: ASP.NET WebAPI Mapping Rules
description: ASP.NET WebAPI路由规则
keywords: ASP.NET WebAPI
tags: [ASP.NET]
---

最近在做一个前后端分离的项目, 后端是 ASP.NET WebAPI, 前端是 Vue.
经常遇到路由匹配不到的问题, 找了篇文章并自己实践总结规律.

HTTP Method | Query String | Request Body
Get | Primitive Type, Complex Type | NA
POST | Primitive Type | Complex Type
PUT | Primitive Type | Complex Type
PATCH | Primitive Type | Complex Type
DELETE | Primitive Type, Complex Type | NA

get: axios.get('apiUrl', {params: {id: id, type: type}}
post 传对象+参数: axios.post('apiUrl', object, {params: {id: id}})
post 传对象, 参数放在路径里: axios.post('apiUrl/\${id}', object)
post 只传参数: axios.post('apiUrl', null, {params: {id: id}})

对象一次只能传一个, 如果有多个对象, 需要嵌套

## 参考

https://www.tutorialsteacher.com/webapi/parameter-binding-in-web-api
