---
layout: post2
title: ASP.NET WebAPI Tutorial 11 依赖注入
description: ASP.NET WebAPI教程之依赖注入
keywords: ASP.NET WebAPI
tags: [ASP.NET]
---

## 原文

https://www.tutorialsteacher.com/webapi/configure-dependency-injection-with-web-api

## 开始

有很多 IoC 容器, 如 Ninject, Unity, castleWidsor, structuremap 等. 这里我们用 Ninject 来做依赖注入.

```c#
public class StudentController : ApiController
{
    private IRepository _repo = null;

    public StudentController(IRepository repo)
    {
        _repo = repo;
    }

    public IList<Student> Get()
    {
        return  _repo.GetAll();
    }
}

public interface IRepository
{
    IList<Student> GetAll();
}

public class StudentRepository : IRepository
{
    public IList<Student> GetAll()
    {
        //return students from db here
    }
}
```

让我们用 Ninjet 在 StudentController 中注入 StudentRepository.
需要先安装 Ninject, 这里略去.
为了能在 Web API 中使用依赖注入, 我们需要创建一个继承 IDependencyResolver 的 resolver. 代码如下:

```c#
public class NinjectResolver : IDependencyResolver
{
    private IKernel kernel;

    public NinjectResolver() : this(new StandardKernel())
    {
    }

    public NinjectResolver(IKernel ninjectKernel, bool scope = false)
    {
        kernel = ninjectKernel;
        if (!scope)
        {
            AddBindings(kernel);
        }
    }

    public IDependencyScope BeginScope()
    {
        return new NinjectResolver(AddRequestBindings(new ChildKernel(kernel)), true);
    }

    public object GetService(Type serviceType)
    {
        return kernel.TryGet(serviceType);
    }

    public IEnumerable<object> GetServices(Type serviceType)
    {
        return kernel.GetAll(serviceType);
    }

    public void Dispose()
    {

    }

    private void AddBindings(IKernel kernel)
    {
        // singleton and transient bindings go here
    }

    private IKernel AddRequestBindings(IKernel kernel)
    {
        kernel.Bind<IRepository>().To<StudentRepository>().InSingletonScope();
        return kernel;
    }
}
```

现在我们需要在 WebApiConfig 中配置 NinjectResolver.

```C#
public static class WebApiConfig
{
    public static void Register(HttpConfiguration config)
    {
        config.DependencyResolver = new NinjectResolver();

        config.MapHttpAttributeRoutes();

        config.Routes.MapHttpRoute(
            name: "DefaultApi",
            routeTemplate: "api/{controller}/{id}",
            defaults: new { id = RouteParameter.Optional }
        );

    }
}
```

如上所述, HttpConfiguration.DependencyResolver 被设置成 NinjectResolver.
