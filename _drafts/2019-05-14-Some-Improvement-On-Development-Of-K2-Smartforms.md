---
layout: post2
title: Some Improvement on Development of K2 Smartforms
description: K2 Smartforms表单开发的一些改进
keywords: K2 Smartforms, SmartService, SmartObject
tags: [K2] [Smartforms] [SmartService] [SmartObject]
---

在开发第一个 K2 Smartforms 项目的时候, 有很多体验很糟糕的地方, 所以在做第 2 个项目的时候, 做了一些改进.

-   SvcConfigurations, 在任何地方都能访问 SmartService Configurations.
-   使用 EF6 代替 K2 SQL Server Service
-   每个 SmartObject 的调用报错增加了日志, 记录到了数据库. 每个报错增加了关联的申请 ID(部分实现有问题, 没做到每个报错与申请关联)
-   Smartforms 表单开发规范化
-   所有 SmartObject 直接引用 SmartService, 1:1 的关系. (File 类型要处理)
