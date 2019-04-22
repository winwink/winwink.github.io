---
layout: post2
title: Add https for ASP.NET Web API
description:
keywords: WebAPI https
tags: [https] [WebAPI]
---

## 在 Visual Studio 中设置 https

选择 WebAPI 的 Project, 在 Properties 窗口中设置`SSL Enabled` 为 true, 可以看到下面有 2 个属性, `SSL URL`和`URL`.
其中`SSL URL`大概为https://localhost:443xx/, 启动调试, 可以在 iis express 中看到 2 个 url, 选中 https 的那个, 现在是 https 页面了.

## 在 IIS 中设置 https

打开 IIS, 在`Server Certificates`中点击"Create Self-Signed Cetificate", 输入名字, 点击 OK 按钮.
