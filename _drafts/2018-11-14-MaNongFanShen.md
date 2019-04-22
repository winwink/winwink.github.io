---
layout: post2
title: 码农翻身读书笔记
description: 
keywords: 通俗, 码农翻身
tags: [计算机概论] [通俗]
---

## 第三章 浪潮之巅的Web
### HTML(p207~214)
HTML是可链接的富文本
Socket通用IP和端口进行通信
防火墙禁用了其他端口,只允许HTTP(80端口)和HTTPS(443端口)通信
数据传输方式由WSDL+SOAP 转成 HTTP GET/POST + JSON

### HTTPS加密(p214~222)
HTTPS对传输的数据加密,发送时加密,接收后解密
对称加密技术,加密和解密用的是同一个密钥.存在密钥泄露的风险
RSA非对称加密技术,一个密钥分为2个,1个是私钥,1个是公钥.发送消息时用对方的公钥加密,对方接收消息时用他自己的私钥解密.
非对称加密 + 对称加密. 由于非对称加密速度上太慢,所以在第一次传输先用非对称加密,把对称加密要用的密钥传给对方.之后双方用对称加密进行数据传输.
中间人劫持, 在传输非对称加密时用到的公钥时,掉包换成自己的公钥.然后监听消息,将消息解密后,再重新用真的公钥加密,对方收到后用自己的私钥解密.
数字签名, 用于传输公钥.公钥=>(Hash算法)=>消息摘要=>(CA私钥)=>数字签名,将公钥和数字签名一起打包成数字证书,接收人收到数字证书后,解包为公钥和数字签名.将公钥计算为消息摘要,再将数字签名用CA公钥解密为消息摘要,对比消息摘要是否一致.
(p222)

### SSO单点登陆(p222~230)
认证中心
CAS(Central Authentication Service)

### 从密码到token,一个有关授权的故事(p230~p235)
OAUTH的3种认证方式
- Resource Owner Password Credentials Grant
- Implicit Grant
- Authorization Code Grant

### 后端风云 高可用方案(p235~258)

### TCP/IP(p27~)
路由机制
分包传输
三次握手
失败重传


CPU(1ns)比内存(100ns)快100倍,内存比硬盘(1ms)快1万倍, 硬盘比网络传输(20ms)快N倍
所以有CPU > CPU Cache > Memory > Memory Cache > Disk

### 互斥锁和信号量(p89~96)
互斥锁可以解决共享资源的访问问题,一次只能一个对象进行访问.
信号量是多个对象同时访问资源.

### 递归和尾递归优化(p100~105)

### JAVA(p106~110)
J2SE: 桌面, J2ME:手机, J2EE:企业
J2SE和J2ME都失败了
Build Tool: Ant, Maven, Jekins
Http Server: Tomcat, Jetty, JBoss, WebSphere, WebLogic
Web Develop: Spring, Hibernate, MyBatis, Struts
IDE: Eclipse, NetBeans, IntelliJ IDEA, JBuilder

### 我是一个Java Class(p111~119)

### 持久战:Java帝国反击战(p119~123)
JDBC接口
EJB被Hibernate取代
Spring + MyBatis + Hibernate

### 强一致性和最终一致性(p~146)
两阶段提交 JTA
利用消息队列处理分布式事务
BASE理论

### 页面装配工(p146~)
Perl, C语言以CGI的方式展示页面, 在代码中掺杂HTML进行页面输出
1996年ASP出世, 在HTML中掺杂"<%%>"的代码进行动态页面的输出
JSP出世
Java MVC和JSTL
ASP.NET

### 消息队列
JMS Java Message Service

### JAVA动态代理与AOP(p165~168)

### JAVA泛型(p~181)

### JAVA日志系统(p~187)
Log4j 
Logback, tinylog, JDK Logging
SLF4j: Simple Logging Facade for Java

### 加锁还是不加锁(p191~)
悲观锁
乐观锁 CAS(compare and swap) CPU支持原子操作,避免锁
对应.NET的就是Interlocked.CompareExchange 和Cocurrent类型

### IOC和AOP(p198~206)


### 我是一个函数(p259~)
RPC Remote Procedure Call
是把本地函数调用的提供方和调用方分开到不同的服务器上,只能通过远程调用来实现
本地有个代理,叫Stub. 远程有个代理,叫Skeleton.
RPC二进制传输, 把本地对象序列化, 通过网络传输, 到了服务端再反序列化, 进行计算后, 得到结果序列号, 通过网络传输, 到了本地再反序列化为本地对象.

有一些通过XML/JSON传输.

### HTTP Server(p267Z~)
HTTP Server 1.0. 单进程模型.容易阻塞
2.0. 多进程模型. 进程切换消耗资源.
3.0. select模型.
4.0. epoll模型.

### 源码控制软件的演进之路(p273~280)
v1: 人肉版本
v2: VSS, 锁定式
v3: CVS,SVN, 非锁定式,支持合并
v4: Bug修复与新功能开发, 分支功能
v5: 分布式管理 Git
v6: 社交网站 GitHub

### Build工具演进之路
v1: Ant, XML描述配置
v2: Maven, 约定重于配置

