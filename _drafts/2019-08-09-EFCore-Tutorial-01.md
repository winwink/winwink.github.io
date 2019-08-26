---
layout: post2
title: EFCore Tutorial 01
description: EFCore Code First
keywords: EntityFrameworkCore
tags: [EF]
---

## 参考
https://www.entityframeworktutorial.net/efcore/entity-framework-core.aspx

## 开始
EFCore支持EF6以下特性
1. DbContext & DbSet
2. Data Model
3. Querying using Linq-to-Entities
4. Change Tracking
5. SaveChanges
6. Migrations

EFCore不支持以下EF6特性
1. EDMX
2. Entity Data Model Wizard
3. ObjectContext API
4. Querying using Entity SQL
5. Automated Migration
6. Inheritance: Table per type(TPT)
7. Inheritance: Table per concrete class(TPC)
8. Many-to-Many without join entity
9. Entity Splitting
10.Spatial Data
11.Lazy loading of related data
12.Stored procedure mapping with DbContext for CUD operation
13.Seed data
14.Automatic migration

EFCore新特性
1. Easy relationship configuration
2. Batch Insert, update and delete operations
3. In-memory provider for testing
4. Support ofr IoC
5. Unique constraints
6. Shadow properties
7. Alternate keys
8. Global query filter
9. Field mapping
10.DbContext pooling
11.Better patterns of handing disconnected entity graphs

EFCode支持多种数据
|Database | NuGet Package|
|SQL Server |Microsoft.EntityFrameworkCore.SqlServer|
|MySQL|MySql.Data.EntityFrameworkCore|
|PostgreSQL|Npgsql.EntityFrameworkCore.PostgreSQL|
|SQLite|Microsoft.EntityFrameworkCore.SQLite|
|SQL Compact|EntityFrameworkCore.SqlServerCompack40|
|In-memory|Microsoft.EntityFrameworkCore.InMemory|
