---
layout: post2
title: ASP.NET WebAPI Tutorial 07 数据格式
description: ASP.NET WebAPI数据格式
keywords: ASP.NET WebAPI
tags: [ASP.NET]
---

## 原文

https://www.tutorialsteacher.com/webapi/request-response-data-formats-in-web-api

## 开始

### 数据类型

数据类型的格式是 类型/子类型, 如 text/html, application/json, image/jpeg 等

在 Http 请求中, 类型用 2 个属性"Accept"和"Content-Type"来指定. Accept 表示接收服务端返回的数据类型, Content-Type 表示发送给服务端的请求的数据类型.

例如, 一个客户端希望服务端返回 JSON 格式, 它就会发送这些 http 头信息

```Http
GET http://localhost:60464/api/student HTTP/1.1
User-Agent: Fiddler
Host: localhost:1234
**Accept: application/json**

```

同样的客户端是以 JSON 格式发送数据给服务端, 如下:

```Http
POST http://localhost:60464/api/student?age=15 HTTP/1.1
User-Agent: Fiddler
Host: localhost:60464
Content-Type: application/json
Content-Length: 13

{
  id:1,
  name:'Steve'
}
```

Web API 将请求的数据转成 CLR 对象, 并且基于`Accept`和`Content-Type`进行序列化. 内置支持 JSON, XML, BSON 和 form-urlencoded 数据.

```c#
public class Student
{
    public int Id { get; set; }
    public string Name { get; set; }
}

public class StudentController : ApiController
{
    public Student Post(Student student)
    {
        // save student into db
        var insertedStudent = SaveStudent(student);

        return insertedStudent;
    }
}
```

Post 方法接受 Student 对象类型的参数, 保存进数据库并返回包含插入后的 id 的实体数据. Web API handler 处理 http 请求(JSON/XML), 并按照 Content-Type 把它转成对象, 并将结果`insertedStudent`按照 Accept 转成 JSON 或者 XML.
