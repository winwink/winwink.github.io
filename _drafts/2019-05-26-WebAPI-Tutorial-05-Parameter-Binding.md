---
layout: post2
title: ASP.NET WebAPI Tutorial 05 参数绑定
description: ASP.NET WebAPI参数绑定
keywords: ASP.NET WebAPI
tags: [ASP.NET]
---

## 原文

https://www.tutorialsteacher.com/webapi/parameter-binding-in-web-api

## 开始

控制器中的方法可以有一个或多个类型不同的参数. 参数有 2 种: 原始类型, 复杂类型. 参数是从 URL 的 Query String 中取, 还是从 Request Body 中取, 取决于参数的类型. 默认的话, 如果参数是原始类型如: int, bool, double, string, GUID, DateTime, decimal 或者其他能直接转成 string 类型的, 都从 URL 的 Query String 中取; 如果参数是复杂类型, 就从 Request Body 中取.

下表是默认的绑定规则
|HTTP 方法|Query String|Request Body|
|----|-----|----|
|GET|原始类型, 复杂类型|NA|
|POST|原始类型|复杂类型|
|PUT|原始类型|复杂类型|
|PATCH|原始类型|复杂类型|
|DELETE|原始类型, 复杂类型|NA|

### GET 方法

#### 原始类型

```c#
public class StudentController : ApiController
{
    public Student Get(int id, string name)
    {

    }
}
```

id = 1, name = "ab"
有效的 URL:

-   http://localhost/api/student?id=1&name=ab
-   http://localhost/api/student?NAME=ab&ID=1

```text
Query string的参数名和方法里的参数名必须要一致, 大小不敏感, 顺序可以不同.
```

#### 复杂类型

```c#
public class StudentController : ApiController
{
    public Student Get([FromUri]Student student)
    {

    }
}

public class Student
{
  public int id;
  public string name;
}
```

有效的 URL:

-   http://localhost/api/student?id=1&name=steve
-   http://localhost/api/student?ID=1&NAME=steve
-   http://localhost/api/student?name=steve&id=1

### POST 方法

#### 原始类型

```c#
public class StudentController : ApiController
{
    public Student Post(id id, string name)
    {

    }
}
```

URL: http://localhost/api/student?id=1&name=steve

#### 复杂类型

```c#
public class Student
{
  public int Id { get; set; }
  public string Name { get; set; }
}

public class StudentController : ApiController
{
    public Student Post(Student stud)
    {

    }
}
```

URL: http://localhost/api/student
RequestBody:

```json
{
    "id": 1,
    "name": "Steve"
}
```

#### 原始类型 + 复杂类型

```c#
public class Student
{
  public int Id { get; set; }
  public string Name { get; set; }
}

public class StudentController : ApiController
{
    public Student Post(int age, Student student)
    {

    }
}
```

URL: http://localhost/api/student?age=25
RequestBody:

```json
{
    "id": 1,
    "name": "Steve"
}
```

```text
Post方法不能包含多个复杂类型, 因为从reqeust body只能读最多一个参数
```

Put 和 Patch 和 Post 一致.

### [FromUri]和[FromBody]

默认从 query string 获取原始类型, 从 Request Body 获取复杂类型. 但是如果我们想改变默认行为呢?

用[FromUri]可以强制指定从 query string 获取, [FromBody]强制指定从 Reqeust Body 获取. 例如:

```c#
public class StudentController : ApiController
{
    public Student Post([FromUri] Student stud)
    {

    }
}
```

URL: http://localhost/api/student?id=1&name=Steve

```c#
public class StudentController : ApiController
{
    public Student Post([FromBody]string name)
    {

    }
}
```

URL: http://localhost/api/student
Request Body

```json
Steve
```
