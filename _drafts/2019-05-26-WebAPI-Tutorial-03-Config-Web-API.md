---
layout: post2
title: ASP.NET WebAPI Tutorial 03 配置Web API
description: ASP.NET WebAPI路由规则
keywords: ASP.NET WebAPI
tags: [ASP.NET]
---

## 原文

https://www.tutorialsteacher.com/webapi/configure-web-api

## 开始

Web API 只支持基于代码的配置, 不能在 web.config 中配置. 我们能自定义这些组件, 如路由 routes, 格式化器 formatters, 过滤器 filters, 依赖注入解决方案(IoC) DependencyResolver, 消息处理器 MessageHandlers, 参数绑定规则 paramterBindingRules, 属性 properties, 服务 services 等.

在 App_Start 文件夹下默认包含 WebApiConfig 类,还有 global.asax.

```c#

public class WebAPIApplication : System.Web.HttpApplication
{
    protected void Application_Start()
    {
        GlobalConfiguration.Configure(WebApiConfig.Register);

        //other configuration
    }
}

public static class WebApiConfig
{
    public static void Register(HttpConfiguration config)
    {
        config.MapHttpAttributeRoutes();

        config.Routes.MapHttpRoute(
            name: "DefaultApi",
            routeTemplate: "api/{controller}/{id}",
            defaults: new { id = RouteParameter.Optional }
        );
        // configure additional webapi settings here..
    }
}
```

应用开始启动的时候, Web API 配置程序启动. 调用`GlobalConfiguration.Configure(WebApiConfig.Register);`.

`WebApiConfig.Register()`方法包含一个`HttpConfiguration`的参数, 用来配置 Web API. 包含以下属性, 可以覆盖 Web API 默认的行为.
|属性|描述|
|DependencyResolver|读取或者设置依赖注入组件|
|过滤器|读取或者设置过滤器|
|格式化器|读取或者设置媒体类型格式化|
|包含错误详情策略|读取或者设置一个值, 用来设置错误信息中是否包含详细信息|
|消息处理器|设置消息处理器|
|参数绑定规则|读取绑定参数的规则的集合|
|属性|获取当前 Web API 关联的属性|
|路由|获取当前 WebAPI 路由配置的集合|
|服务|获取 Web API 服务|

详情请看[MSDN](<https://msdn.microsoft.com/en-us/library/system.web.http.httpconfiguration(v=vs.118).aspx>)
