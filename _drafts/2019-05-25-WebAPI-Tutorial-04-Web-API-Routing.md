---
layout: post2
title: ASP.NET WebAPI Tutorial 04 Web API 路由
description: ASP.NET WebAPI路由规则
keywords: ASP.NET WebAPI
tags: [ASP.NET]
---

## 原文

https://www.tutorialsteacher.com/webapi/web-api-routing

## 开始

Web API 路由同[MVC 路由](https://www.tutorialsteacher.com/mvc/routing-in-mvc)相似. 将到来的 HTTP 请求路由到指定的路由器的方法中.

支持 2 种类型的路由:

1. 基于约定的路由
2. 属性路由

### 基于约定的路由

路由模板用来确定用哪个控制器和方法来执行. 至少要有一个路由模板.

```c#
public static class WebApiConfig
{
    public static void Register(HttpConfiguration config)
    {
        // Enable attribute routing
        config.MapHttpAttributeRoutes();

        // Add default route using convention-based routing
        config.Routes.MapHttpRoute(
            name: "DefaultApi",
            routeTemplate: "api/{controller}/{id}",
            defaults: new { id = RouteParameter.Optional }
        );
    }
}
```

`config.MapHttpAttributeRoutes()`开启了属性路由. `config.Routes`是一个路由表或者`HttpRouteCollection`的路由集合. 上面的代码种使用了扩展方法`MapHttpRoute`来添加了一个名为`DefaultApi`的路由. 这个方法内部, 新创建了一个 IHttpRoute 的实例, 并添加到 HttpRouteCollection. 然后, 我们也可以手动创建一个新路由到集合种. 代码如下:

```c#
public static class WebApiConfig
{
    public static void Register(HttpConfiguration config)
    {
        config.MapHttpAttributeRoutes();

        // define route
        IHttpRoute defaultRoute = config.Routes.CreateRoute("api/{controller}/{id}",
                                            new { id = RouteParameter.Optional }, null);

        // Add route
        config.Routes.Add("DefaultApi", defaultRoute);

    }
}
```

下表列出了`MapHttpRoute()`方法的属性
|属性|描述|
|----|-----|
|name|路由的名字|
|routeTemplate|路由的 URL 行式|
|defaults|一个对象参数, 包含了默认的路由值|
|constraints|指定路由值属性的正则表达式|
|handler|请求将要被处理的处理器|

现在让我们看看 Web API 处理器是怎么处理请求, 并发送回复的.
下面是一个 HTTP Get 请求的例子

```http
GET http://localhost:1234/api/values/ HTTP/1.1
User-Agent: Fiddler
Host: localhost: 60464
Content-Type: application/json
```

考虑到上面配置的`DefaultApi`路由, 上面的 http 请求将会路由到 ValuesController 的 Get()方法, 因为是 HttpGet 请求, 所以是 Get 类型的方法, `api/{controller}/{id}`, 其中已经说明了 id 是可选的, 符合`DefaultApi`路由, 所以路由到`ValuesController`的`Get()`方法. 如果找不到该方法, 就抛出 404 错误.

```c#
  // GET: api/student
  public IEnumerable<string> Get()
  {
      return new string[] { "value1", "value2" };
  }
  // GET: api/student/5
  public string Get(int id)
  {
      return "value";
  }
```

略...

### 配置多个路由表

上面我们配置了一个路由表, 然后, 我们可以用`HttpConfiguration`对象配置多个路由表. 代码如下:

```c#
public static class WebApiConfig
{
                public static void Register(HttpConfiguration config)
    {
        config.MapHttpAttributeRoutes();

                // school route
        config.Routes.MapHttpRoute(
            name: "School",
            routeTemplate: "api/myschool/{id}",
            defaults: new { controller="school", id = RouteParameter.Optional }
            constraints: new { id ="/d+" }
        );

                // default route
        config.Routes.MapHttpRoute(
            name: "DefaultApi",
            routeTemplate: "api/{controller}/{id}",
            defaults: new { id = RouteParameter.Optional }
        );
    }
}
```

在上面的例子中, School 路由在 DefaultApi 路由前. 所以任何请求会优先匹配 School 路由, 如果不符合再匹配 DefaultApi 路由.

### 属性路由

Web API 2 支持属性路由. 用`[Route()]`属性来定义路由, Route 属性可以定义在任何一个控制器或者方法上. 为了使属性路由生效, 需要在 WebApiConfig 中调用`config.MapHttpAttributeRoutes();`.

```C#
public class StudentController : ApiController
{
    [Route("api/student/names")]
                public IEnumerable<string> Get()
    {
                return new string[] { "student1", "student2" };
    }
}
```

在上面的例子中, Route 属性重新定义了新的路由`api/student/names`来映射到 Get()方法, 因而一个 HTTP GET 请求`http://localhost:1234/api/student/names`将会返回学生的列表.

详情参考[属性路由](http://www.asp.net/web-api/overview/web-api-routing-and-actions/attribute-routing-in-web-api-2)
