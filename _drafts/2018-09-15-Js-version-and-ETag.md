---
layout: post2
title: Js version and ETag
description: Js的缓存控制
keywords: javascript, 缓存, ETag
tags: [javascript]
---

##web资源的获取相关的东西
- Expired，是否过期
- ETag，服务器端产生的标志
- Last-Modified， 最后更改时间

##问题
- JS无法缓存
- JS更新了，客户端没有自动更新

##常用方案
- Html引用js时，在后面添加参数，更新后，更改参数值
更新前
```
<script type="text/javascript" src="jquery.1-10-2.js?v=1"></script> 
```

更新后
```
<script type="text/javascript" src="jquery.1-10-2.js?v=2"></script> 
```
- 前端打包方式

200, 200(from memory cache), 200 (from disk cache), 
304, 304(from memory cache)

![browser cacche flow](/assets/imgs/browser-cache-flow.png)


##参考
- [ETag - Wikipedia](https://en.wikipedia.org/wiki/HTTP_ETag)
- [IIS配置ETag](https://www.cnblogs.com/wangqiideal/articles/5814142.html)
- [http codes 200 from cache 304](http://www.benhallbenhall.com/2012/03/http-codes-200-from-cache-304/)
- [solve-caching-conundrums](https://www.sitepoint.com/solve-caching-conundrums/)
- [正确使用Etag和Expires标识处理，可以使得页面更加有效被Cache。](https://www.sulabs.net/?p=57)