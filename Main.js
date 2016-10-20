//CentOS 6.8 x64 - PhantomJS 2.1.1
//注意：
//    因为这PhantomJS与js语言的限制，你在外部运行一次Main.js时，同时只能加载一个url。不要试图直接在这个工程里，并行加载多个url。
//    如果一定需要加载多个url，建议两种方法：
//    1.改造Main.js，从外部txt按行读取url，然后串行加载url。
//    2.使用外部语言，推荐Java或Python，来调用这个Main.js，开多个线程或进程调用，就可以实现并行加载多个url。

//加载模块，这部分不要改
var Lib_DateTimeTool = require( "./Lib_DateTimeTool" ).create();
var Lib_NumberTool = require( "./Lib_NumberTool" ).create();
var Lib_OutputTool = require( "./Lib_OutputTool" ).create();
var Lib_StringTool = require( "./Lib_StringTool" ).create();
var Lib_ValidateTool = require( "./Lib_ValidateTool" ).create();

//这里修改测试版本，建议每次更改代码后，在运行前，把版本号加1.
//建议在终端使用【reset; pjs Main.js;】来运行这个脚本。
Lib_OutputTool.Function_Output("Main.js::Main", "Test V 1 Start");


Lib_OutputTool.Function_Output("Main.js::Main", "Define Page");
//访问url的路径，你要访问哪个url，就在这里改
var testURL = "http://www.baidu.com/";
//访问url完毕后，给网页截图，jpg的存储路径
var test_renderFileSavePath = "/tmp/_xTemp/pjsTest/fileStore/";
//访问url完毕后，是否需要给网页截图。默认截图
var test_willRenderPage = true;
//给要访问的url定义一个名称，作为标记，就像数据库的主键一样。
var test_userDefineName = "Test1-Baidu";
//访问过程，是否加载图片。默认加载。不加载图片可以节省时间。
var test_loadImage = true;

//-----------------------------------------------
//-----------------------------------------------
//如果你需要添加自定义方法、变量，请在这个位置的下方添加

var UserMsg = "Hello world";

function UserFunction()
{
	//请用Lib_OutputTool.Function_Output来代替console.log
	Lib_OutputTool.Function_Output("Main.js::UserFunction", UserMsg);
}

//如果你需要添加自定义方法、变量，请在这个位置的上方添加
//-----------------------------------------------
//-----------------------------------------------

//这个函数是页面加载完成后执行的
var test_function_onEventComplete = function(arg_state)
{
	Lib_OutputTool.Function_Output("Main.js::test_function_onEventComplete", "arg_state = [" + JSON.stringify(arg_state) + "]\n Program exit.");
	//拍照
	if( test_willRenderPage )
	{
		var picPath = test_renderFileSavePath + Lib_PhantomJS_Page.Var_Global_Const_userDefinedName + ".jpg";
		Lib_OutputTool.Function_Output("Main.js::test_function_onEventComplete", "Render page to [" + picPath + "]");
		Lib_PhantomJS_Page.Function_AfterComplete_TakeScreenshot(picPath);
	}
	//处理用户代码
	UserFunction();
	//下面的别改
	phantom.exit();
	Lib_OutputTool.Function_Output("Main.js::Main", "Test End");
}

//注意，这个变量名字不能改，因为Lib_PhantomJS_Page的回调函数中的this指向当前js文件，会通过this.Lib_PhantomJS_Page.XX来调用Lib_PhantomJS_Page下面的东西。
var Lib_PhantomJS_Page = require( "./Lib_PhantomJS_Page" ).create(testURL, test_userDefineName, test_loadImage, test_function_onEventComplete);

Lib_OutputTool.Function_Output("Main.js::Main", "Lib_PhantomJS_Page.Var_Global_Const_URL = [" + Lib_PhantomJS_Page.Var_Global_Const_URL + "]");
Lib_OutputTool.Function_Output("Main.js::Main", "Page Open URL.");

Lib_PhantomJS_Page.Function_Open();