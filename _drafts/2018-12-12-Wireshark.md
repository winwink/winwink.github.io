---
layout: post2
title: Wireshark learn
description: Wireshark Learn
keywords: Wireshark, Network
tags: [Wireshark] [Network]
---

Wireshark数据包分析实战
集线器会将数据发给同个网络的所有计算机, 又称Hub
交换机会按MAC地址发给指定的计算机
交换机是在同网段操作, 路由器是在不同网段传输数据
网络分析利器: 集线器或者网络分流器
使用cain & abel进行ARP攻击和嗅探
[带你了解ARP协议](https://blog.csdn.net/ruixj/article/details/5612056)
部署嗅探器指南: p56

## 首地址与广播地址
192.168.0.0/24
网络号: 192.168.0.0
首地址: 192.168.0.1
广播地址: 192.168.0.255
网关一般是首地址

## 各协议
ARP: IP地址 -> MAC地址

## 常用命令
### ARP
arp -a 查看ARP缓存
arp -d 删除ARP缓存

### netstat
netstat -ano 查看本机所有端口使用情况
netstat -ano|findstr "443" 查看具体端口

