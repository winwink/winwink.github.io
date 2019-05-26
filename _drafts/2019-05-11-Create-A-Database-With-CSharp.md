---
layout: post2
title: Create a database with Csharp
description: create a simple database with c# language
keywords: CSharp, .net core
tags: [CSharp] [.Net Core] [database]
---

在刘大的知识星球上看到一个有趣的项目--[用 C 开发一个简单的数据库](https://cstack.github.io/db_tutorial/)

非常有意思, 决定学习一下, 试着翻译和用 c#实现一遍.
[Github 库地址](https://github.com/winwink/db_tutorial), 直接查看[代码](</asserts/sourcecode/Winwink.MySqlite(bak20190511).7z>)
目前翻译到了 part5, 简单的实现一个固定单表的数据库, 存储没有使用 B 树, 而是使用了更简单的数组, 而且只支持 insert 和 select 语句, 其中 insert 只能在末尾插入, select 只能查询全表.

## 主要流程

这个是一个.net core 的控制台程序, 主体由一个`while`循环构成, 不断接收用户输入, 执行命令.

```csharp
  static void Main(string[] args)
  {
      UserTable.Load();
      while(true)
      {
          var input = Console.ReadLine();
          CommaParser parser = new CommaParser();
          parser.Parser(input);
      }
  }
```

`Parser`方法主要分成了 3 部分, `DoMetaCommand`命令分析, `PrepareCommand`命令预处理, `ExecuteStatement`命令执行.

```csharp
  public void Parser(string input)
  {
      var mataCommandResult = DoMetaCommand(input);
      switch ((int)mataCommandResult)
      {
          case (int)MetaCommandResult.META_COMMAND_SUCCESS:
              break;
          case (int)MetaCommandResult.META_COMMAND_UNRECOGNIZED_COMMAND:
              Console.WriteLine($"Unrecognized command '{input}'");
              return;
              break;
      }
      PrepareResult prepareResult = PrepareCommand(input, out var statement);
      switch ((int)prepareResult)
      {
          case (int)PrepareResult.PREPARE_SUCCESS:
              break;
          case (int)PrepareResult.PREPARE_UNRECOGNIZED_STATEMENT:
              Console.WriteLine($"Unrecognized keyword at start '{input}'");
              return;
              break;
      }
      ExecuteStatement(statement);
  }
```

`DoMetaCommand`有两种结果, `META_COMMAND_SUCCESS`命令成功, `META_COMMAND_UNRECOGNIZED_COMMAND`命令不可识别.
处理 `exit`命令.

`PrepareCommand`有 3 种结果, `STATEMENT_INSERT`插入, `STATEMENT_SELECT`查询, `STATEMENT_SAVE`保存.
处理 `insert`, `select`, `save`等命令. 并返回一个`Statement`对象

```c#
  public class Statement
  {
      public StatementType_T StatementType { get; set; }
      public UserRow Row;
  }
```

## 实现过程

表的结构是固定的, 有 3 个字段 id(int), username(varchar(32)), email(varchar(255)). 所以单行的大小是 4+32+255=291,
作者设定了数据按页存储, 单页大小 4kB, 且单行数据不跨页, 4096/291 = 14.07, 所以 1 个页中最多存 14 行数据.
设定单表最大页数 100, 所以整个表最大行数为 100\*14 = 1400. 所以我定义了一个二维数据`UserTable.Pages`来存储数据.

```c#
  public class UserRow
  {
      public int id;
      public string username;//varchar(32)
      public string email;//varchar(255)
      public const int RowSize = 4 + 32 + 255;//单行大小
      public const int RowPerPage = UserTable.PageSize / RowSize;//单页最大行数 14
  }

  public class UserTable
  {
      private static readonly byte[][] Pages = new byte[TableMaxPages][];
  }
```

### insert

每插入一条数据, 会先将行数据序列化成`byte[]`, 然后 Copy 到 Pages 指定页的指定 offset 中. 同时更新当前页`MaxPage`和当前行数信息`MaxRowNumber`.

```c#
  public static void Insert(UserRow row)
  {
      if (MaxRowNumber >= TableMaxRows)
      {
          Console.WriteLine("Table Full");
          return;
      }
      var bytes = row.Serialize();
      var pageNumber = MaxRowNumber / UserRow.RowPerPage;
      var rowNumberInPage = MaxRowNumber % UserRow.RowPerPage;
      var offset = rowNumberInPage * UserRow.RowSize;
      if (Pages[pageNumber] == null)
      {
          Pages[pageNumber] = new byte[PageSize];
          MaxPage = pageNumber;
      }
      Array.Copy(bytes, 0, Pages[pageNumber], offset, UserRow.RowSize);
      MaxRowNumber++;
  }
```

### select

查询时, 取到行数据, 反序列化, 然后输出.

```c#
  public static UserRow[] Select()
  {
      UserRow[] result = new UserRow[MaxRowNumber];
      Console.WriteLine("Count:" + (MaxRowNumber + 1));
      Console.WriteLine("id\tusername\temail");
      for (int i = 0; i < MaxRowNumber; i++)
      {
          var pageNumber = i / UserRow.RowPerPage;
          var rowNumberInPage = i % UserRow.RowPerPage;
          var offset = rowNumberInPage * UserRow.RowSize;
          byte[] rowData = new byte[UserRow.RowSize];
          Array.Copy(Pages[pageNumber], offset, rowData, 0, UserRow.RowSize);
          var row = UserRow.DeSerialize(rowData);
          Console.WriteLine($"{row.id}\t{row.username}\t{row.email}");
          result[i] = row;
      }
      return result;
  }
```

### save

直接将 Pages 保存到文件, 以二进制存储.

```c#
  public static void Save()
  {
      using FileStream fs = new FileStream(SavePath, FileMode.Create);
      using BinaryWriter writer = new BinaryWriter(fs);
      for (int i = 0; i <= MaxPage; i++)
      {
          writer.Write(Pages[i]);
      }
      writer.Close();
      fs.Close();
  }
```

### load

当程序再次打开时, 需要先从文件中加载 Pages, 并计算当前页和当前行数.

```c#
  public static void Load()
  {
      if (!File.Exists(SavePath)) return;
      using FileStream fs = new FileStream(SavePath, FileMode.Open);
      var index = 0;
      while (index < TableMaxPages)
      {
          Pages[index] = new byte[PageSize];
          var read = fs.Read(Pages[index], 0, PageSize);
          if (read == 0)
          {
              break;
          }
          index++;
      }
      MaxPage = index - 1;
      MaxRowNumber = MaxPage * UserRow.RowPerPage;
      for (int i = 0; i < UserRow.RowPerPage; i++)
      {
          if (Pages[MaxPage][i * UserRow.RowSize] == 0)
          {
              break;
          }
          MaxRowNumber++;
      }
  }
```

## 测试

用 MSUnit Test 编写了一个单元测试, 插入 1400 条数据

```c#
  [TestMethod]
  public void InsertTest()
  {
      CommaParser parser = new CommaParser();
      for (int i = 0; i < 1400; i++)
      {
          parser.Parser($"insert {i} {i+"a"} {i+"b"}");
      }
      parser.Parser("save");
      parser.Parser("exit");
  }
```

然后重新运行主程序, 输入`select`语句测试.
