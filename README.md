# PhantomJSHelper

帮助快速使用PhantomJS的简单框架。


测试环境：CentOS 6.8 x64 - PhantomJS 2.1.1



注意：

    因为PhantomJS与js语言的限制，你在外部运行一次Main.js时，同时只能加载一个url。
    
    不要试图直接在这个工程里，并行加载多个url。

    如果一定需要加载多个url，建议两种方法：
    
    1.改造Main.js，从外部txt按行读取url，然后串行加载url。
    
    2.使用外部语言，推荐Java或Python，来调用这个Main.js，开多个线程或进程调用，就可以实现并行加载多个url。



使用方法：

    1.按照上文的【测试环境】所要求的OS版本、PhantomJS版本，来制作测试环境。当然你牛逼的话也可以无视它。
    
    2.打开Main.js。
    
    3.把【var testURL = "http://www.baidu.com/";】改为你要访问的URL。
    
    4.把【function UserFunction()】里面的代码，改成URL加载结束后，要进行处理的代码。
    
    5.Main.js已经添加了详细的注释，建议先看看。



文件说明：

    Main.js：程序入口文件。
    
    Lib_PhantomJS_Page.js：包装了PhantomJS的Page类。
    
    Lib_DateTimeTool.js：处理时间的类。
    
    Lib_NumberTool.js：处理数字的类。
    
    Lib_OutputTool.js：处理输出的类。
    
    Lib_StringTool.js：处理字符串的类。
    
    Lib_ValidateTool.js：处理验证的类。



有问题，欢迎去segmentfault给我发私信撕逼：

https://segmentfault.com/u/laminux29
