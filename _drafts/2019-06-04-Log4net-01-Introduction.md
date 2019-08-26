---
layout: post2
title: Log4net Introduction
description: Log4net 介绍
keywords: Log4net
tags: [Log4net]
---

## 原文

http://logging.apache.org/log4net/release/manual/introduction.html

## 开始

三个概念: loggers, appenders, layouts.

### Logger 层次

logger 的名字是大小写敏感的.
logger 是有层次的,如果一个 logger 的名字是另一个 logger 名字的前缀(以点号分隔), 则第一个 logger 是第二个 logger 的父亲. 举个例子, logger "Foo.Bar"是 logger "Foo.Bar.Baz"的父亲, 同样 "System"是"System.Text"的父亲, 是"System.Text.StringBuilder"的祖先.

`root` logger 是存在所有 logger 的顶级, 它有 3 个特点:

1. 总是存在
2. 不能以名字调用
3. 总是有一个分配的 Level

Logger 可以通过 LogManager.GetLogger()获取到.

```c#
namespace log4net
{
    public class LogManager
    {
        public static ILog GetLogger(string name);
        public static ILog GetLogger(Type type);
    }
}
```

GetLogger 返回的是 ILog 接口, 接口定义如下

```c#
namespace log4net
{
    public interface ILog
    {
        /* Test if a level is enabled for logging */
        bool IsDebugEnabled { get; }
        bool IsInfoEnabled { get; }
        bool IsWarnEnabled { get; }
        bool IsErrorEnabled { get; }
        bool IsFatalEnabled { get; }

        /* Log a message object */
        void Debug(object message);
        void Info(object message);
        void Warn(object message);
        void Error(object message);
        void Fatal(object message);

        /* Log a message object and exception */
        void Debug(object message, Exception t);
        void Info(object message, Exception t);
        void Warn(object message, Exception t);
        void Error(object message, Exception t);
        void Fatal(object message, Exception t);

        /* Log a message string using the System.String.Format syntax */
        void DebugFormat(string format, params object[] args);
        void InfoFormat(string format, params object[] args);
        void WarnFormat(string format, params object[] args);
        void ErrorFormat(string format, params object[] args);
        void FatalFormat(string format, params object[] args);

        /* Log a message string using the System.String.Format syntax */
        void DebugFormat(IFormatProvider provider, string format, params object[] args);
        void InfoFormat(IFormatProvider provider, string format, params object[] args);
        void WarnFormat(IFormatProvider provider, string format, params object[] args);
        void ErrorFormat(IFormatProvider provider, string format, params object[] args);
        void FatalFormat(IFormatProvider provider, string format, params object[] args);
    }
}
```

Logger 可能有 Level, 如下:

-   ALL
-   DEBUG
-   INFO
-   WARN
-   ERROR
-   FATAL
-   OFF

假如一个 Logger 没有分配 Level, 那么它会从最近的祖先继承 Level.
`root` logger 的默认级别是`DEBUG`.

记录日志的请求可以通过调用 ILog 的方法来触发, 这些方法包括`Debug, Info, Warn, Error, and Fatal`, 如果请求的日志级别高于或者等于 logger 的日志级别, 那么这个请求有效, 否则这个请求无效.

级别优先级为: DEBUG < INFO < WARN < ERROR < FATAL.

通过同一个名字获取 logger 的话, 实际会取到同一个内部的对象

```c#
ILog x = LogManager.GetLogger("wombat");
ILog y = LogManager.GetLogger("wombat");
var result = x.Equals(y); // result is true
```

logger 的定义可以是无序的, 父 logger 可以很轻松的找到子 logger.
一般是在应用初始化的时候配置 log4net 的环境.

### Appenders

log4net 允许一个 logger 向多个地方记录日志, 输出的地方叫`Appender`, Appenders 必须继承`log4net.Appenders.IAppender`接口.
默认提供了很多种 Appender, 这里着重看这几个:

1. log4net.Appender.AdoNetAppender, 向数据库写
2. log4net.Appender.FileAppender, 向单个文件写
3. log4net.Appender.RollingFileAppender, 向文件写, 可以根据日期或者文件大小, 去生成新的文件. 如每天生成一个新的文件, 每个文件超过 10M 大小自动生成新的文件.
4. log4net.Appender.SmtpAppender, 日志报警邮件
5. log4net.Appender.TraceAppender, .net trace 日志

一个 logger 会默认继承它的所有祖先的 Appender, 也可以设置`Additivity Flag`为 false 来停止继承.
例如, x 有 Appender `A-x`, x.y 有 Appender `A-xy`, 则向 x.y 输出 log 请求, 则会向`A-x`和`A-xy`发出 log 请求.

### Filters

在 log 请求到写入 log 之间可以加上过滤器, 做一些控制. 最常见的一种控制就是设置一个阈值, 高于或者等于这个 level 的才写入 log.
还有可以自定义 filter, 必须继承`log4net.Filter.IFilter interface`.

### Layouts

输出的格式, 可以设置类似`%date [%thread] %-5level %logger - %message%newline`, 效果如下:

```text
2019-06-04 16:40:50,232 [176] INFO  Com.Foo.Bar - Located nearest gas station.
```

最常用的是 log4net.Layout.PatternLayout
