---
layout: post2
title: 我为什么要写可重复执行SQL
description: 
keywords: SQL, 可重复执行
tags: [SQL]
---

## 为什么
我们有4套环境,sandbox > Dev > Test > Production.
一般的开发步骤是这样的, 先在sandbox开发, 单元测试, 系统测试.
然后打包发Dev, 系统测试, 回归测试, 反馈, 在sandbox调整, 重新打包发Dev, 测试, 反馈.
直到Dev测试通过, 打包发Test. 系统测试, 回归测试.
没有问题后, UAT. UAT通过后, 发Production.

## 怎么做
