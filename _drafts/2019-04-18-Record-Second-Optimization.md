---
layout: post2
title: 记一次代码优化2
description:
keywords: Optimization
tags: [SharePoint]
---

有一个任务, 要从一个 SharePonit list 的附件, 迁移到另一个 SharePoint 文档库中

### 阶段 1: 单线程稳定版本

先实现单线程版本, 在容易报错的地方 try catch 并记录日志, 查看日志, 发现几个常见的报错

1. 有时候 time out
2. 部分文件迁移失败, 提示 404 文件找不到.

针对以上 2 个问题, 做了 2 个应对.

1. 如果 time out, 把该实例保存, 等待下次重试
2. 记录 404 的实例

发现 404 的确实是找不到, 手工打开改表单, 附件已经丢失.针对这种情况, 记录情况, 不处理.

### 阶段 2: 多线程版本

将所有要操作的附件加入一个 CocurrentQueue, 开启多个线程轮流处理
发现内存一直涨, 甚至多的时候达到 1G. 判断有内存泄漏, 开启 dotMemory 进行分析.

找到比较大的 2 种对象, netstream 和 byte[]. 尝试优化, 发现比较困难.
发现 Queue 是 static 对象, 去掉 static, 使之成为实例对象, 否则会一直常驻内存.

开启 dottrace 进行运行时间分析, 超过 50%的时间花在一个 webservice 调用上面, 发现这个调用有异步版本, 使用异步版本后,
运行时间下降了不少.
