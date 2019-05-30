---
layout: post2
title: ASP.NET WebAPI Tutorial 10 HttpClient
description: ASP.NET WebAPI教程之客户端调用
keywords: ASP.NET WebAPI
tags: [ASP.NET]
---

## 原文

https://www.tutorialsteacher.com/webapi/consuming-web-api-in-dotnet-using-httpclient

## 开始

.net 2.0 提供了`WebClient`对象来用 http 协议与 web 服务器交互. 然后有些限制. .net 4.5 提供了`HttpClient`来克服 WebClient 的限制. 这里我们用 HttpClient 在控制台程序发送和接收数据. 你也可以在 MVC Web 应用, winform 程序, windows 服务等.

Web API 代码如下:

```c#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MyWebAPI.Controller
{
    public class StudentController : ApiController
    {
        public IHttpActionResult GetAllStudents(bool includeAddress = false)
        {
            IList<StudentViewModel> students = null;

            using (var ctx = new SchoolDBEntities())
            {
                students = ctx.Students.Include("StudentAddress").Select(s => new StudentViewModel()
                {
                    Id = s.StudentID,
                    FirstName = s.FirstName,
                    LastName = s.LastName,
                    Address = s.StudentAddress == null || includeAddress == false ? null : new AddressViewModel()
                    {
                        StudentId = s.StudentAddress.StudentID,
                        Address1 = s.StudentAddress.Address1,
                        Address2 = s.StudentAddress.Address2,
                        City = s.StudentAddress.City,
                        State = s.StudentAddress.State
                    }
                }).ToList<StudentViewModel>();
            }

            if (students.Count == 0)
            {
                return NotFound();
            }

            return Ok(students);
        }

        public IHttpActionResult PostNewStudent(StudentViewModel student)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid data");

            using (var ctx = new SchoolDBEntities())
            {
                ctx.Students.Add(new Student()
                {
                    StudentID = student.Id,
                    FirstName = student.FirstName,
                    LastName = student.LastName
                });

                ctx.SaveChanges();
            }
            return Ok();
        }

        public IHttpActionResult Put(StudentViewModel student)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid data");

            using (var ctx = new SchoolDBEntities())
            {
                var existingStudent = ctx.Students.Where(s => s.StudentID == student.Id).FirstOrDefault<Student>();

                if (existingStudent != null)
                {
                    existingStudent.FirstName = student.FirstName;
                    existingStudent.LastName = student.LastName;

                    ctx.SaveChanges();
                }
                else
                {
                    return NotFound();
                }
            }
            return Ok();
        }


        public IHttpActionResult Delete(int id)
        {
            if (id <= 0)
                return BadRequest("Not a valid studet id");

            using (var ctx = new SchoolDBEntities())
            {
                var student = ctx.Students
                    .Where(s => s.StudentID == id)
                    .FirstOrDefault();

                ctx.Entry(student).State = System.Data.Entity.EntityState.Deleted;
                ctx.SaveChanges();
            }
            return Ok();
        }
    }
}
```

步骤 1:
创建一个控制台程序
步骤 2:
打开 Tools > NuGet Package Manager > Package Manager Console, 输入下面的指令

```bash
Install-Package Microsoft.AspNet.WebApi.Client
```

步骤 3:
创建一个 Student model

```c#
public class Student
{
    public int Id { get; set; }
    public string Name { get; set; }
}
```

### 发送 Get 请求

```c#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Headers;

namespace HttpClientDemo
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://localhost:60464/api/");
                //HTTP GET
                var responseTask = client.GetAsync("student");
                responseTask.Wait();

                var result = responseTask.Result;
                if (result.IsSuccessStatusCode)
                {

                    var readTask = result.Content.ReadAsAsync<Student[]>();
                    readTask.Wait();

                    var students = readTask.Result;

                    foreach (var student in students)
                    {
                        Console.WriteLine(student.Name);
                    }
                }
            }
            Console.ReadLine();
        }
    }
}
```

让我们来理解下上面的代码. 首先我们创建了要给 HttpClient 对象并分配了基地址. GetAsync()方法给指定的 URL 发送了 http get 请求. GetAsync()方法是异步的,并返回一个 Task. Task.wait()暂停了执行, 直到 GetAsync()方法完成了执行并返回了结果.

一旦执行完成, 我们从 Task.Result 中拿到 HttpResopnseMessage. 现在你可以用 IsSuccessStatusCode 来检查是否成功. 从 ReadAsAsync()方法中读取数据结果.

### 发送 POST 请求

相似的,你也有用 PostAsAsync()方法发送 HTTP POST 请求.

```c#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Headers;

namespace HttpClientDemo
{
    class Program
    {
        static void Main(string[] args)
        {
            var student = new Student() { Name = "Steve" };

            var postTask = client.PostAsJsonAsync<Student>("student", student);
            postTask.Wait();

            var result = postTask.Result;
            if (result.IsSuccessStatusCode)
            {

                var readTask = result.Content.ReadAsAsync<Student>();
                readTask.Wait();

                var insertedStudent = readTask.Result;

                Console.WriteLine("Student {0} inserted with id: {1}", insertedStudent.Name, insertedStudent.Id);
            }
            else
            {
                Console.WriteLine(result.StatusCode);
            }
        }
    }
}
```

下表列出了 HttpClient 所有的方法
|方法名字|描述|
|---|---|
|GetAsync|异步发送 Get 请求|
|GetByteArrayAsync

### 参考

https://code-maze.com/different-ways-consume-restful-api-csharp/
