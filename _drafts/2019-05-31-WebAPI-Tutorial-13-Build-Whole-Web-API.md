---
layout: post2
title: ASP.NET WebAPI Tutorial 13 构建一个简单完整的WebAPI例子
description: ASP.NET WebAPI教程之构建简单完整的WebAPI
keywords: ASP.NET WebAPI
tags: [ASP.NET]
---

## 说明

在学习了一系列的 WebAPI 教程之后, 决定写代码了, 从头构建一个 Web API 的例子.

实现目标如下:

-   全局错误处理过滤器
-   全局日志过滤器, 实现调用追踪, 性能追踪(用 NLog 好了)
-   多种形式的路由覆盖
-   客户端调用
-   Swagger
-   认证和授权. 包括 Basic, OAuth2, JWT.
-   自定义格式化器
-   依赖注入, Autofac
-   跨域访问 CORS
-   ModelState 验证
-   RESTful 接口规范
-   监控每个接口的调用时间, 和传输的 json 数据大小

## 开始
