---
layout: post2
title: 搭建自己的blog(Github Pages)
description: 介绍搭建本博客的过程
keywords: github pages
tags: [教程]
---

## 起因

准备考试写博客，记录一下平时工作和学习的感想。之前尝试在博客园写过，没有坚持下去。听说 Github Pages 是免费的自主博客，尝试搭建一个。

## 趋势

[静态网站生成器将会成为下一个大热门](http://www.infoq.com/cn/news/2015/11/LAMP-CDN)
[Static Web Page - Wikipedia](https://en.wikipedia.org/wiki/Static_web_page)
[Dynamic Web Page - Wikipedia](https://en.wikipedia.org/wiki/Dynamic_web_page)

## 探索

先是参考 [windows 安装 jekyll 步骤及问题](https://blog.csdn.net/mouday/article/details/79300135) 这篇文章，用了 Github Pages 推荐的方法，

中间出了不少问题，都陆续解决了，最终跑了起来。

2019 年 5 月, 在新的电脑上安装 jekyll 时提示 ruby 版本应该高于 2.3.0, 因而重装了 ruby,
`ruby 2.6.3p62 (2019-04-16 revision 67580) [x64-mingw32]` 用了这个版本.
gem 的版本是`3.0.3`, 重新执行`gem install jekyll`

安装的过程异常缓慢, 跟 npm 相比, 慢的不行, 下次有空迁移到 Hexo 上去吧(基于 nodejs).

但是效果不好。我又换了个主题 [jekyll bootstrap](https://github.com/plusjade/jekyll-bootstrap)，样式上还行，但还不是很理想。最终找到 [张志敏的技术专栏](https://github.com/beginor/beginor.github.io)，很喜欢这个风格，就借过来了。

## 具体步骤

1. Clone 张志敏的技术专栏

```sh
git clone --depth=1 https://github.com/beginor/beginor.github.io.git
```

2. 创建自己的 Repository

以 username.github.io 为名，如 winwink.github.io, clone 自己的 Repository

```sh
git clone https://github.com/winwink/winwink.github.io.git
```

将 beginor.github.io 的文件夹都 copy 过来，删除\_posts 下所有文件和\_site 下所有的文章。替换一些文字，去掉 images。还去除一些文件

运行

```sh
jekyll serve
```

报错
运行

```sh
gem install jekyll-coffeescript
```

报错
运行

```sh
gem install jekyll-paginate
```

成功运行
