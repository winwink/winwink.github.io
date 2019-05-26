---
layout: post2
title: ASP.NET WebAPI Tutorial 02 创建Web API项目
description: ASP.NET WebAPI路由规则
keywords: ASP.NET WebAPI
tags: [ASP.NET]
---

## 原文

https://www.tutorialsteacher.com/webapi/create-web-api-project

## 开始

Create Web API 和 Test Web API 都有点老, 我们现在可以基于 ASP.NET Core 和 Swagger 来构建 WebAPI, 客户端测试用 Postman, 所以这 2 章先跳过. 从 Web API Controller 开始.
https://www.tutorialsteacher.com/webapi/web-api-controller

## Web API Controller

Web API 控制器和 ASP.NET MVC 控制器很相似, 它接收到来的 HTTP 请求, 并将回复发给调用者

Web API 控制器是一个类, 可以在 Controllers 文件夹下创建, 或者在任何你项目的根文件夹下创建. 名字必须以`Controller`结尾, 必须继承`System.Web.Http.ApiController`.(.net core 是继承 ControllerBase)

接下来是一个简单的实例.

```c#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MyWebAPI.Controllers
{
    public class ValuesController : ApiController
    {
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

        // POST: api/student
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/student/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/student/5
        public void Delete(int id)
        {
        }
    }
}
```

在上面例子中, 你可以看到`ValuesController`继承于`ApiController`, 并包含多个方法, 名字都与 HTTP 动词相匹配, 如`Get`,`Post`,`Put`,`Delete`.

基于请求 Url 和动词, Web API 决定用哪个控制器的哪个方法来处理. 如 Get()方法将会处理 HTTP GET 请求, Post()方法将会处理 HTTP POST 请求, Put()方法将会处理 HTTP PUT 请求, Delete()方法将会处理 HTTP DELETE 请求.

下图详细描述了控制器和方法与请求 URL 是如何对应的.

假如你的方法不想以 HTTP 动词开头, 你可以在方法上面设置一个 HTTP 动词属性, 如 HttpGet, HttpPost, HttpPut 等.

```c#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MyWebAPI.Controllers
{
    public class ValuesController : ApiController
    {
        [HttpGet]
        public IEnumerable<string> Values()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet]
        public string Value(int id)
        {
            return "value";
        }

        [HttpPost]
        public void SaveNewValue([FromBody]string value)
        {
        }

        [HttpPut]
        public void UpdateValue(int id, [FromBody]string value)
        {
        }

        [HttpDelete]
        public void RemoveValue(int id)
        {
        }
    }
}
```

### 控制器特点

1. 必须继承`System.Web.Http.ApiController`
2. 必须在根文件夹下创建, 尽管如此, 一般推荐在`Controllers`文件夹下创建
3. 方法名必须是 HTTP 动词或者以 HTTP 动词开头 (大小写敏感), 或者加上 HTTP 动词属性.
4. 返回值可以上原始类型或者复杂类型.

### 命名要点

| Http 动词|有效的命名|作用|
|GET|Get(), get(), GET(), GetAllStudent(), _任何以 Get 开头的命名_|获取数据|
|POST|Post(), post(), POST(), _Post 开头_|插入新的数据|
|PUT|Put(), put(), PUT(), PutStudent, _Path 开头_|更新已有数据|
|PATCH|Patch(), patch(), PATCH(), PatchStudent(), _Patch 开头哦_|更新数据的部分属性|
|DELETE|Delete(), delete(), DELETE(), _Delete 开头_|删除数据|

下图演示了 申请/回复的管道, Client Send Request => Web API Hosting Server => Controller => Action Method, Action Method Send Response => Controller => Web API Hosting Server => Client.

### Web API 和 MVC 的区别

| Web API 控制器 | MVC 控制器|
|继承 System.Web.Http.ApiController | 继承 System.Web.Mvc.Controller|
|方法名字可以是 http 动词,或者加上 http 属性| 方法名必须加上 http 动词|
|返回数据|返回视图|
|返回数据基于 accept-type, 返回 json 或者 xml|返回 ActionResult 或者继承类型|
|要求.net 4.0 或以上|要求.net 3.5 或以上|
