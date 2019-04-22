---
layout: post2
title: Visual Studio Code Build C Workspace
description: build c development environment with visual studio code
keywords: C, Visual Studio Code
tags: [C] [Visual Studio Code]
---

## 安装Visual Studio Code
正常安装

## 安装Mingw-w64
安装Mingw-w64时，在Architecture一栏如果32位就选i686，如果64位就选择x86_64
配置系统Path路径, 在系统Path上添加mingw-w64的bin路径, 例如下面
```
D:\Software\mingw-w64\x86_64-8.1.0-posix-seh-rt_v6-rev0\mingw64\bin
```

## 安装c/c++支持插件
打开VS Code在插件商店搜索C/C++这个插件进行安装

## 运行
新建HelloWorld.c文件, 用Vs Code打开所在文件夹, 输入以下代码
```c
#include <stdio.h>

void main()
{
    printf("Hello World!");
}
```
右键"Run Code", 可以看到Output窗口输出"Hello World!"

## Debug
点击Vs Code的Debug窗口, 点击DEBUG按钮(绿色三角形), 弹出选项, 选择"C++(GDB/LLDB)" > "gcc.exe"
, 会出现一个launch.json的配置. 如下
```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "(gdb) Launch",
            "type": "cppdbg",
            "request": "launch",
            "program": "${workspaceFolder}/${fileBasenameNoExtension}.exe",
            "args": [],
            "stopAtEntry": false,
            "cwd": "${workspaceFolder}",
            "environment": [],
            "externalConsole": true,
            "MIMode": "gdb",
            "miDebuggerPath": "D:/Software/mingw-w64/x86_64-8.1.0-posix-seh-rt_v6-rev0/mingw64/bin/gdb.exe",
            "preLaunchTask": "gcc",
            "setupCommands": [
                {
                    "description": "Enable pretty-printing for gdb",
                    "text": "-enable-pretty-printing",
                    "ignoreFailures": true
                }
            ]
        }
    ]
}
```

创建task.json, 如下
```json
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "command": "gcc",
    "args": ["-Wall", "-g", "${file}", "-o", "${fileBasenameNoExtension}.exe"],
    "echoCommand": true,
    "problemMatcher": {
        "owner": "cpp",
        "fileLocation": ["relative", "${workspaceFolder}"],
        "pattern": {
            "regexp": "^(.*):(\\d+):(\\d+):\\s+(warning|error):\\s+(.*)$",
            "file": 1,
            "line": 2,
            "column": 3,
            "severity": 4,
            "message": 5
        }
    }
}
```

打开HelloWorld.c, 打个断点, 在调试窗口点击Debug按钮, 即可开始调试

## 智能提示, 设置includePath
有时候, include包的时候提示找不到, 这个时候需要`c_cpp_properties.json` 这个设置, 如下

```json
{
    "configurations": [
        {
            "name": "Win32",
            "includePath": [
                "${workspaceFolder}/**",
                "D:/Software/mingw-w64/x86_64-8.1.0-posix-seh-rt_v6-rev0/mingw64/bin/../lib/gcc/x86_64-w64-mingw32/8.1.0/include/c++",
                "D:/Software/mingw-w64/x86_64-8.1.0-posix-seh-rt_v6-rev0/mingw64/bin/../lib/gcc/x86_64-w64-mingw32/8.1.0/include/c++/x86_64-w64-mingw32",
"D:/Software/mingw-w64/x86_64-8.1.0-posix-seh-rt_v6-rev0/mingw64/bin/../lib/gcc/x86_64-w64-mingw32/8.1.0/include/c++/backward",
"D:/Software/mingw-w64/x86_64-8.1.0-posix-seh-rt_v6-rev0/mingw64/bin/../lib/gcc/x86_64-w64-mingw32/8.1.0/include",
"D:/Software/mingw-w64/x86_64-8.1.0-posix-seh-rt_v6-rev0/mingw64/bin/../lib/gcc/x86_64-w64-mingw32/8.1.0/include-fixed",
"D:/Software/mingw-w64/x86_64-8.1.0-posix-seh-rt_v6-rev0/mingw64/bin/../lib/gcc/x86_64-w64-mingw32/8.1.0/../../../../x86_64-w64-mingw32/include",
"D:/OpenSourceCode/C/**"
            ],
            "defines": [
                "_DEBUG",
                "UNICODE",
                "_UNICODE"
            ],
            "intelliSenseMode": "msvc-x64"
        }
    ],
    "version": 4
}
```

其中includePath后面的部分需要自己添加, 你可以在命令行中输入
```shell
gcc -v -E -x c++ -
```
找到下面有一段`#include <...> search starts here:`后面的所有路径挨个加到includePath中即可