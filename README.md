2020-09-25更新：
这个破玩意是很多年前写的，别用了！
===================================================
# PhantomJSHelper

帮助快速使用PhantomJS的简单框架。



一、框架优点：

    1.尽量的OO。如果你熟练或精通C、C++、C#、Java，使用这玩意你会比较轻松愉快。
    
    2.尽力屏蔽了js的一些不好的特性，当然，前提是你需要按照这个文档以及代码注释的方式来用这个框架。
    
    3.监听了所有的事件。
    
        (1).事件说明：【http://phantomjs.org/api/webpage/property/pages.html 】->
    
            网页左侧下方->
      
            图标为H的都是事件
    
        (2).监听开关（如果你不需要监听所有事件，可以在这里开闭）：
            【Lib_PhantomJS_Page.js】->
    
            【Class_Lib_PhantomJS_Page.prototype.Function_Open = function ()】->
    
            【this.Var_Global_page.onXXX = Event_OnXXX;】。其中，【Event_OnXXX】的定义与实现也是在这个js文件里。



二、测试环境：CentOS 6.8 x64 - PhantomJS 2.1.1

    1.CentOS下载地址（国内高速镜像）：
        http://mirrors.aliyun.com/centos/6.8/isos/x86_64/CentOS-6.8-x86_64-bin-DVD1.iso
        http://mirrors.aliyun.com/centos/6.8/isos/x86_64/CentOS-6.8-x86_64-bin-DVD2.iso

    2.PhantomJS下载地址（不用翻墙）：
        http://phantomjs.org/download.html



三、注意：

    1.因为PhantomJS与js语言的限制，你在外部运行一次Main.js时，同时只能加载一个url。
    
    2.不要试图直接在这个工程里，并行加载多个url。

    3.如果一定需要加载多个url，建议两种方法：
    
        (1).把Main.js改造为【从外部txt按行读取url，然后串行加载url】，由于串行化，速度会比较慢。
    
        (2).使用外部语言，推荐Java或Python，来调用这个Main.js。开多线程或多进程，就可以实现并行加载多个url。推荐这种方法，速度快。



四、框架使用方法：

    1.按照上文的【测试环境】所要求的OS版本、PhantomJS版本，来制作测试环境。当然你牛逼的话也可以无视版本号。
    
    2.打开Main.js。
    
    3.把【var testURL = "http://www.baidu.com/"; 】改为你要访问的URL。
    
    4.把【function UserFunction()】里面的代码，改成URL加载结束后，要进行处理的代码。
    
    5.Main.js已经添加了详细的注释，建议先看看。



五、文件说明：

    Main.js：程序入口文件。
    
    Lib_PhantomJS_Page.js：包装了PhantomJS的Page类。使用这个框架，你需要关注一下里面的属性与方法。
    
    Lib_DateTimeTool.js：处理时间的类。
    
    Lib_NumberTool.js：处理数字的类。
    
    Lib_OutputTool.js：处理输出的类。
    
    Lib_StringTool.js：处理字符串的类。
    
    Lib_ValidateTool.js：处理验证的类。



六、有问题，欢迎去segmentfault给我发私信撕逼：https://segmentfault.com/u/laminux29
