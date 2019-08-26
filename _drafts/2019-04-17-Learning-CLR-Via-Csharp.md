---
layout: post2
title: Learning CLR Via Csharp
description:
keywords: Csharp
tags: [Csharp]
---

### throw 与 throw ex 的区别

throw ex 是重新抛出新的错误, 调用栈已经破坏
throw 会将捕捉的 exception 继续抛出, 不影响原调用栈

### exception Data 属性

```C#
private static void SomeMethod(string fileName)
{
  try
  {
    //do something
  }
  catch(IOException e)
  {
    e.Data.Add("FileName",fileName);
    throw;
  }

}
```

### 捕捉 UnhanledException (p.442)

-   任何应用程序, AppDomain.UnhandledException
-   对于 Winform, System.Windows.Forms.NativeWindow.OnThreadException 方法, System.Windows.Forms.Application.OnThreadException 方法, System.Windows.Forms.Application.ThreadException 事件
-   对于 WPF, System.Windows.Application.DispatchedUnhandledException 事件, System.Windows.Threading.Dispatcher.UnhandledException & UnhandledExceptionFilter 事件
-   对于 Sliverlight, System.Windows.Application.UnhandledException 事件
-   对于 ASP.NET WebForm, System.Web.UI.TemplateControl 的 Error 事件,System.Web.HTTPApplication 的 Error 事件
-   对于 WCF, System.ServiceModel.Dispatcher.ChannelDispatcher 的 Errorhandlers 属性

### fixed 语句块

非托管对象(下文中的 byte\* ip)指向托管对象(bytes)时, 防止 GC 在回收时移动托管对象(bytes), 因为 GC 无法影响非托管对象.
所以为了保证非托管对象的正确性, 必须要使用 fixed.

```c#
unsafe public static void Go()
{
  for(int x=0;x<10000;x++) new Object();
  byte[] bytes = new byte[10];
  fixed (byte* ip = bytes)
  {
    for(int i=0;i<10;i++)
    {
      ip[i]  = (byte)new Random(Guid.NewGuid().GetHashCode()).Next(0,256);
    }
  }
  GC.Collect();
  Console.WriteLine("After GC:");
  Array.ForEach(bytes, m=>Console.WriteLine(m));
}

```

### 堆和栈

-   值类型保存在栈上, 引用类型保存在堆上. struct 属于值类型. 类的值成员保存在堆上.
-   `int a = 2; object o = a;`, 值类型隐式转换为引用类型会装箱.
-   值类型的复制会将所有成员挨个复制. 引用类型的复制只是复制指针.
-   struct 类型默认的 Equals 和 GetHashCode 方法效率很低, 需要重写提高效率
-   dynamic 类型能方便一些与其他动态语言的交互, 如 Python, COM 对象等.
