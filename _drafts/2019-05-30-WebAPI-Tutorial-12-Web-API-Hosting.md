---
layout: post2
title: ASP.NET WebAPI Tutorial 12 Web API 寄宿
description: ASP.NET WebAPI教程之寄宿
keywords: ASP.NET WebAPI
tags: [ASP.NET]
---

## 原文

https://www.tutorialsteacher.com/webapi/web-api-hosting

## 开始

Web API 有 2 种寄宿方式 IIS 寄宿和自寄宿.

### IIS 寄宿

Web API 可以在 IIS 下寄宿, 和 web application 一样.

### 自寄宿

```text
注意现在很流行的宿主Kestrel
```

你可以自寄宿一个 Web API. 这意味着你可以在控制台程序或者 windows 服务或者 OWIN 或者其他.net framework.

你需要以下步骤来自寄宿一个 Web API:

1. 用 HttpConfiguration 来配置一个 Web API
2. 创建 HttpServer 并开始监听 Http 请求.

让我们开始在控制台程序中寄宿一个 Web API. 通过 nuget 安装`Microsoft ASP.NET Web API 2.2 Self Host`.添加以下代码

```c#
class Program
{
    static void Main(string[] args)
    {
        var config = new HttpSelfHostConfiguration("http://localhost:1234");

        var server = new HttpSelfHostServer(config, new MyWebAPIMessageHandler());
        var task = server.OpenAsync();
        task.Wait();

        Console.WriteLine("Web API Server has started at http://localhost:1234");
        Console.ReadLine();
    }
}
```

在上面的代码中, 我们创建了一个`HttpSelfHostConfiguration`的对象, 然后传递 config 和 HttpMessageHandler 对象给 HttpSelfHostServer, 然后开始通过`OpenAsync()`开始监听, 返回 task.

再添加`MyWebAPIMessageHandler`

```C#
class MyWebAPIMessageHandler : HttpMessageHandler
{
    protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, System.Threading.CancellationToken cancellationToken)
    {
        var task = new Task<HttpResponseMessage>(() => {
            var resMsg = new HttpResponseMessage();
            resMsg.Content = new StringContent("Hello World!");
            return resMsg;
        });

        task.Start();
        return task;
    }
}
```

输入 Request, 输出 Response. 访问`http://localhost:1234/`进行测试.

### Controller 路由

```c#
public class HomeController : ApiController
{
    public string Get() {
        return "Hello World!";
    }

    public string Get(string name) {
        return "Hello " + name;
    }
}
```

创建了一个 HomeController, 然后在 Main 里添加路由.

```c#
static void Main(string[] args)
{
    var config = new HttpSelfHostConfiguration("http://localhost:1234");
    config.Routes.MapHttpRoute("default",
                                "api/{controller}/{id}",
                                new { controller = "Home", id = RouteParameter.Optional });

    var server = new HttpSelfHostServer(config);
    var task = server.OpenAsync();
    task.Wait();

    Console.WriteLine("Web API Server has started at http://localhost:1234");
    Console.ReadLine();
}
```

访问`http://localhost:1234/api?name=steve`进行测试.
