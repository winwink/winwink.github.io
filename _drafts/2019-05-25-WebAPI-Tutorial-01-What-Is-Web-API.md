---
layout: post2
title: ASP.NET WebAPI Tutorial 01 Web API是什么
description: ASP.NET WebAPI路由规则
keywords: ASP.NET WebAPI
tags: [ASP.NET]
---

## 原因

由于对 Web API 参数绑定规则有很多疑惑, 看到这个[文章](https://www.tutorialsteacher.com/webapi/parameter-binding-in-web-api)后, 发现这是一系列的好文章, 所以想翻译以下, 正好系统学习下 ASP.NET Web API.

## 开始

这篇翻译的原文, https://www.tutorialsteacher.com/webapi/what-is-web-api

### Web API 是什么

在理解 Web API 之前, 让我们理解下什么是 API(Application Programing Interface).

参考[维基百科](https://en.wikipedia.org/wiki/Application_programming_interface), 在电脑编程中, 一个应用程序接口(API)是一系列的子程序定义, 协议, 和构建软件和应用的工具的集合.

简而言之, API 是一种接口, 允许编程人员访问特定的功能或数据, 可能是应用接口, 操作系统接口或者其他服务接口.

Web API 如名字所述, 是一个存在 web 上的基于 HTTP 协议的 API. 这是一个概念, 而不是特定的技术. 我们可以用不同的技术构建 API, 如 Java, .NET 等. 例如, Twitter 的[API](https://dev.twitter.com/rest/public)提供编程接口, 使得人们可以读写 Twitter 的数据, 这样我们就可以把 Twitter 集成进我们的应用程序中.

### ASP.NET Web API

ASP.NET Web API 是一个基于 HTTP 服务的灵活可扩展的框架, 可以被不同平台的不同应用所访问, 如 Web, Windows, 移动端等. 它的方式同 ASP.NET MVC 很相似, 区别是它是以 Response 的方式返回数据, 而 MVC 是返回 html 页面. 它很像 WCF 服务, 但只支持 HTTP 协议.

### ASP.NET Web API 特点

1. 是一个构建 RESTful 服务的理想平台
2. 构建在 ASP.NET 之上, 支持 request/response 管道
3. 支持 http 动词到方法名的映射
4. 支持多种返回数据的格式, 如 json, xml, bson 等
5. 参能寄宿在 IIS 上, 也可以自运行, 或者运行在其他支持.net 4.0 以上的 http 服务器上
6. 支持 HttpClient 访问 Web API 服务. HttpClient 可以用在 ASP.NET MVC 服务端, Windows form 程序, 控制台程序或其他.

### ASP.NET Web API 版本

| Web API Version | Supported .net Framework | Coincides with | supported in  |
| --------------- | ------------------------ | -------------- | ------------- |
| Web API 1.0     | .NET Framework 4.0       | ASP.NET MVC 4  | vs2010        |
| Web API 2.0     | .NET Framework 4.5       | ASP.NET MVC 5  | vs 2012, 2013 |

### ASP.NET Web API vs WCF

| Web API                                 | WCF                             |
| --------------------------------------- | ------------------------------- |
| 开源的,基于.net framework               | 基于.net framework              |
| 只支持 HTTP 协议                        | 支持 HTTP,TCP,UDP 和自定义协议  |
| 映射 http 动词到方法                    | 使用基于属性的编程模型          |
| 使用类似 ASP.NET MVC 的控制器和路由模型 | 使用服务,操作和数据契约         |
| 不支持可靠的消息和事务                  | 支持可靠的消息和事务            |
| 支持代码配置, 不支持 web.config 配置    | 使用 web.confg 和属性来配置服务 |
| 构建 RESTful 服务的理想工具             | 支持 RESTful 服务, 但是有限制   |

## 什么时候选择 WCF

-   .net framework3.5 及以下
-   需要支持多种协议, 如 HTTP,TCP,命名管道
-   构建`WS-*`标准的服务器, 如可靠消息, 事务, 消息安全等
-   希望使用 Request-Reply, 单工, 双工消息交换模式

## 什么时候选择 ASP.NET Web API

-   .net framwork4.0 及以上
-   构建只支持 http 协议的服务
-   构建 RESTful 服务
-   熟悉 ASP.NET MVC
