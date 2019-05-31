---
layout: post2
title: ASP.NET WebAPI Tutorial 08 数据类型格式化器
description: ASP.NET WebAPI序列化和反序列化
keywords: ASP.NET WebAPI
tags: [ASP.NET]
---

## 原文

https://www.tutorialsteacher.com/webapi/web-api-formatters

## 开始

上篇讲了 Web API 可以支持请求/回复支持 JSON/XML, 它是怎么处理的呢? 答案是: 用 Media-Type 格式化器.
|数据格式化的类|MIME 类型|描述|
|----|-----|----|
|JsonMediaTypeFormatter |application/json, text/json|处理 JSON|
|XmlMediaTypeFormatter|application/xml, text/json|处理 XML|
|FormUrlEncodedMediaTypeFormatter|application/x-www-form-urlencoded|处理表单 URL-编码 的数据|
|JQueryMvcFormUrlEncodedFormatter|application/x-www-form-urlencoded|处理基于 model 的表单 URL-编码的数据|

### 获取内置的数据类型格式化器

Web API 默认包含了以上的格式化器. 然后你可以自己添加, 删除或者改变格式化的顺序.

代码如下:

```c#
public class FormattersController : ApiController
{
    public IEnumerable<string> Get()
    {
        IList<string> formatters = new List<string>();

        foreach (var item in GlobalConfiguration.Configuration.Formatters)
        {
            formatters.Add(item.ToString());
        }

        return formatters.AsEnumerable<string>();
    }
}
```

在上面的例子中, `GlobalConfiguration.Configuration.Formatters`返回了内置的所有格式化器.

另外, `MediaTypeFormatterCollection`也提供了直接访问内置的格式化器的方式. 代码如下:

```c#
public class FormattersController : ApiController
{
    public IEnumerable<string> Get()
    {
        IList<string> formatters = new List<string>();

        formatters.Add(GlobalConfiguration.Configuration.Formatters.JsonFormatter.GetType().FullName);
        formatters.Add(GlobalConfiguration.Configuration.Formatters.XmlFormatter.GetType().FullName);
        formatters.Add(GlobalConfiguration.Configuration.Formatters.FormUrlEncodedFormatter.GetType().FullName);

        return formatters.AsEnumerable<string>();
    }
}
```

### BSON 格式化器

Web API 也支持 BSON 格式. 顾名思义, BSON 是 Binary JSON, 二进制 JSON. 现在对 BSON 的支持比较少, 一般都用在 MongoDB 中, 也不能直接在 javascript 中把 BSON 对象转成 json 对象.

Web API 内置了`BsonMediaTypeFormatter`用于支持 BSON, 不过默认是禁用的. 了解更多可以参看[BSON](https://docs.microsoft.com/en-us/aspnet/web-api/overview/formats-and-model-binding/bson-support-in-web-api-21)

### JSON 格式化器

Web API 使用`JsonMediaTypeFormatter`进行 JSON 的序列化和反序列化.

它使用的第三方开源库`Json.NET`来实现序列化和反序列化.

### 配置 JSON 序列化

JSON 格式化器可以在 WebApiConfig 中进行配置. 包含了多个属性和方法可以自定义你的格式化. 例如, 默认序列化的属性名称是`PascalCase`的, 你也可以改成`camelCase`的, 只要修改 CamelCasePropertyNamesContractResolver 就可以了.

```c#
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

        // configure json formatter
        JsonMediaTypeFormatter jsonFormatter = config.Formatters.JsonFormatter;

        jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
    }
}
```

### XML 格式化器

使用的是`System.Runtime.DataContractSerializer`来生成 XML 数据.

想要了解更多关于配置 JSON 和 XML 序列化的, 点[链接](https://docs.microsoft.com/en-us/aspnet/web-api/overview/formats-and-model-binding/json-and-xml-serialization)
