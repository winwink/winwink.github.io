---
layout: post2
title: ASP.NET WebAPI Tutorial 09 过滤器
description: ASP.NET WebAPI路由规则
keywords: ASP.NET WebAPI
tags: [ASP.NET]
---

## 原文

https://www.tutorialsteacher.com/webapi/web-api-filters

## 开始

过滤器可以在方法执行前后添加额外的逻辑(参考 AOP). 能够提供以下功能, 如日志, 错误处理, 性能监控, 认证和授权.

过滤器可以以属性的方式应用于控制器或者方法上. 每个过滤器属性必须实现`IFilter`接口. 然后`system.Web.Http.Filters`还包含其它接口和类, 帮助创建过滤器.

以下是过滤器有关的重要的接口和类
|过滤器类型|接口|类型|描述|
|---|---|---|---|
|Simple Filter|IFilter|NA|定义使用过滤器的方法|
|Action Filter|IActionFilter|ActionFilterAttribute|用来在方法执行前后添加逻辑|
|Authentication Filter|IAuthenticationFilter|NA|用来在用户调用方法前添加认证|
|Authorization Filter|IAtuthorizationFilter|AuthorizationFilterAttribute|用于限制特定的用户或组访问方法|
|Exception Filter|IExceptionFilter|ExceptionFilterAttribute|用来处理所有未处理的异常|
|Override Filter|IOverrideFilter|NA|
对于特定的某个方法覆盖过滤器的行为|

上面提供了类和接口, 接口需要你实现所有的方法, 类的话, 可以直接覆盖你想改变的方法, 其他的仍然使用已经实现的方法. 例如, ActionFilterAttribute 包含了可以覆盖的方法, 我们只要覆盖我们感兴趣的方法即可. IActionFilter 的话, 就需要我们实现所有的方法.

查看[更多](<https://docs.microsoft.com/en-us/previous-versions/aspnet/hh834645(v=vs.118)>)

首先我们来创建一个继承自`ActionFilterAttribute`的`LogAttribute`来记录日志, 代码如下:

```c#
public class LogAttribute : ActionFilterAttribute
 {
    public LogAttribute()
    {

    }

    public override void OnActionExecuting(HttpActionContext actionContext)
    {
        Trace.WriteLine(string.Format("Action Method {0} executing at {1}", actionContext.ActionDescriptor.ActionName, DateTime.Now.ToShortDateString()), "Web API Logs");
    }

    public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
    {
        Trace.WriteLine(string.Format("Action Method {0} executed at {1}", actionExecutedContext.ActionContext.ActionDescriptor.ActionName, DateTime.Now.ToShortDateString()), "Web API Logs");
    }
}
```

在上面的例子中, LogAttribute 继承自 ActionFilterAttribute, 覆盖了 OnActionExecuting 和 OnActionExecuted 方法. 另外一种实现 LogAttribute 的方式, 是继承 IActionFilter.

```c#
public class LogAttribute : Attribute, IActionFilter
{
    public LogAttribute()
    {

    }

    public Task<HttpResponseMessage> ExecuteActionFilterAsync(HttpActionContext actionContext, CancellationToken cancellationToken, Func<Task<HttpResponseMessage>> continuation)
    {
        Trace.WriteLine(string.Format("Action Method {0} executing at {1}", actionContext.ActionDescriptor.ActionName, DateTime.Now.ToShortDateString()), "Web API Logs");

        var result = continuation();

        result.Wait();

        Trace.WriteLine(string.Format("Action Method {0} executed at {1}", actionContext.ActionDescriptor.ActionName, DateTime.Now.ToShortDateString()), "Web API Logs");

        return result;
    }

    public bool AllowMultiple
    {
        get { return true; }
    }
}
```

现在你可以在控制器或者方法上添加`[Log]`属性了.

```C#
[Log]
public class StudentController : ApiController
{
    public StudentController()
    {

    }

    public Student Get()
    {
        //provide implementation
    }
}
```
