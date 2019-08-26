---
layout: post2
title: 搭建自己的blog(Github Pages)
description: 介绍搭建本博客的过程
keywords: github pages
tags: [教程]
---

## 起因

准备考试写博客，记录一下平时工作和学习的感想。之前尝试在博客园写过，没有坚持下去。听说Github Pages是免费的自主博客，尝试搭建一个。

## 趋势
[静态网站生成器将会成为下一个大热门](http://www.infoq.com/cn/news/2015/11/LAMP-CDN)


## 探索

先是参考 [windows安装jekyll步骤及问题](https://blog.csdn.net/mouday/article/details/79300135) 这篇文章，用了Github Pages推荐的方法，

中间出了不少问题，都陆续解决了，最终跑了起来。

但是效果不好。我又换了个主题 [jekyll bootstrap](https://github.com/plusjade/jekyll-bootstrap)，样式上还行，但还不是很理想。最终找到 [张志敏的技术专栏](https://github.com/beginor/beginor.github.io)，很喜欢这个风格，就借过来了。

## 具体步骤
1. Clone 张志敏的技术专栏
``` sh
git clone --depth=1 https://github.com/beginor/beginor.github.io.git
```


2. 创建自己的Repository

以username.github.io为名，如winwink.github.io, clone自己的Repository
``` sh
git clone https://github.com/winwink/winwink.github.io.git
```

将beginor.github.io的文件夹都copy过来，删除_posts下所有文件和_site下所有的文章。替换一些文字，去掉images。还去除一些文件

运行
``` sh
jekyll serve
```
报错
运行 
``` sh
gem install jekyll-coffeescript
```
报错
运行
``` sh
gem install jekyll-paginate
```
成功运行

