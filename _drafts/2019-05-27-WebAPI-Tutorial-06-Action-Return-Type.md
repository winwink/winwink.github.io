---
layout: post2
title: ASP.NET WebAPI Tutorial 06 返回类型
description: ASP.NET WebAPI路由规则
keywords: ASP.NET WebAPI
tags: [ASP.NET]
---

## 原文

https://www.tutorialsteacher.com/webapi/action-method-return-type-in-web-api

## 开始

Web API 方法的返回值有以下几种:

1. Void
2. 简单类型或者复杂类型
3. HttpResponseMessage
4. IHttpActionResult

### Void

不是所有的方法都必须返回值, 也可以返回空.

```c#
public class StudentController : ApiController
{
    public void Delete(int id)
    {
        DeleteStudentFromDB(id);
    }
}
```

上面的方法返回空, 当你发送 HTTP delete 请求的时候, 服务器将会返回一个 204 "No Content"的结果.

### 简单类型或者复杂类型

```c#
public class Student
{
    public int Id { get; set; }
    public string Name { get; set; }
}

public class StudentController : ApiController
{
    public int GetId(string name)
    {
        int id = GetStudentId(name);

        return id;
    }

    public Student GetStudent(int id)
    {
        var student = GetStudentFromDB(id);

        return student;
    }
}
```

上面的方法 GetId 返回 int, GetStudent 返回 Student 对象.

### HttpResponseMessage

一般来说方法返回的是 Result, 控制再包装一下, 返回一个 HttpResponseMessage, 然后, 你也可以直接从方法返回 HttpResopnseMessage. 这样做的好处是,你可以自定义很多东西, 如状态返回码, 内容或者报错信息等.

```c#
public HttpResponseMessage Get(int id)
{
    Student stud = GetStudentFromDB(id);

    if (stud == null) {
        return Request.CreateResponse(HttpStatusCode.NotFound, id);
    }

    return Request.CreateResponse(HttpStatusCode.OK, stud);
}
```

上面的方法中, 如果找不到这个 Student,就返回 404, 找得到则返回 200 和数据.

### IHttpActionResult

IHttpActionResult 是 Web API2(.net 4.5)才有的. 可以返回一个 IHttpActionResult 的实现, 类似 ASP.NET MVC.

你可以自己实现一个 IHttpActionResult 的实现,或者用 ApiController 的方法返回一个 IHttpActionResult 的实例.

```c#
public IHttpActionResult Get(int id)
{
    Student stud = GetStudentFromDB(id);

    if (stud == null)
    {
        return NotFound();
    }

    return Ok(stud);
}
```

上面的例子中, 你可以直接用 NotFound()和 Ok(), 不用写太多代码, 因为`ApiController`已经写好了.

下表是 ApiController 里实现了 IHttpActionResult 的方法
|ApiController 方法|描述|
|----|----|
|BadRequest()|创建一个 BadRequestResult 对象, 并返回 404|
|Conflict()|创建一个 ConflictResult 对象, 并返回 409|
|Content()|创建一个 NegotiatedContentResult 对象, 并返回指定的状态码和数据|
|Created()|创建一个 CreatedNegotiatedContentResult 对象, 并返回 201|
|CreatedAtRoute()|创建一个 CreatedAtRouteNegotiatedContentResult 对象,并返回 201|
|InternalServerError()|创建一个 InternalServerErrorResult 对象, 并返回 500|
|NotFound()|创建一个 NotFoundResult, 并返回 404|
|Ok()|创建一个 OkResult, 并返回 200|
|Redirect()|创建一个 RedirectResult 并返回 302|
|RedirectToRoute()|创建一个 RedirectToRouteResult 并返回 302|
|ResponseMessage()|创建一个指定 HttpResponseMessage 的 ResponseMessageResult|
|StatusCode()|创建一个指定状态码的 StatusCodeResult |
|Unauthorized()|创建一个 UnauthorizedResult 并返回 401|

参考[MSDN ApiController](<https://msdn.microsoft.com/en-us/library/system.web.http.apicontroller(v=vs.118).aspx>)

### 创建自定义结果类型

你可以基于 IHttpActionResult 接口创建你自己的类.

```c#
public class TextResult : IHttpActionResult
{
    string _value;
    HttpRequestMessage _request;

    public TextResult(string value, HttpRequestMessage request)
    {
        _value = value;
        _request = request;
    }

    public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
    {
        var response = new HttpResponseMessage()
        {
            Content = new StringContent(_value),
            RequestMessage = _request
        };
        return Task.FromResult(response);
    }
}
```

这样你可以返回你自己定义的 TextResult 了

```c#
public IHttpActionResult GetName(int id)
{
    string name = GetStudentName(id);

    if (String.IsNullOrEmpty(name))
    {
        return NotFound();
    }

    return new TextResult(name, Request);
}
```
