---
layout: post2
title: EFCore Tutorial 01
description: EFCore Code First
keywords: EntityFrameworkCore
tags: [EF]
---

## 参考
https://www.entityframeworktutorial.net/efcore/entity-framework-core.aspx
https://www.entityframeworktutorial.net/efcore/querying-in-ef-core.aspx

## 开始
EFCore支持linq-to-Entities中添加自定义function.
```c#
var context = new SchoolContext();
var studentsWithSameName = context.Students
                                .Where(s => s.FirstName == GetName())
                                .ToList();
```

include支持类型判断
```c#
var context = new SchoolContext();

var studentWithGrade = context.Students
                        .Where(s => s.FirstName == "Bill")
                        .Include(s=>s.Grade)
                        .FirstOrDefault();
```

ThenInclude, s.Grade, s.Grade.Teachers
```c#
var context = new SchoolContext();

var student = context.Students.Where(s => s.FirstName == "Bill")
                        .Include(s => s.Grade)
                            .ThenInclude(g => g.Teachers)
                        .FirstOrDefault();
```

EF批量更新有问题, 会生成多条sql语句, 可以安装EntityFrmaework.Extended包来进行批量更新.
```C#
using (var efDbContext = new EfDbContext())
{
    var customers = efDbContext.Customers
        .Where(d => d.Name =="Jeffcky")
        .Update(d => new Customer(){ Email = "a@163.com"});
    efDbContext.SaveChanges();
}
```