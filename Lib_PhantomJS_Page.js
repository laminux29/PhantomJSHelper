/*
------------------------------
------------------------------
	Lib_PhantomJS_Page.js
注意，请确保调用此文件的最外层，有且只有一个此文件的实例，并且实例名必须是Lib_PhantomJS_Page。
因为这个Class的回调函数中的this指向调用此Class的js文件，并且会通过this.Lib_PhantomJS_Page.XX来调用这个Class的属性。
------------------------------
------------------------------
*/

//注意：
//    arg_url必须为非null非undefined且非空白字符串
//    arg_userDefinedName必须为非null非undefined且非空白字符串
//    arg_loadImage必须为非null非undefined且必须为boolean
//    arg_function_OnEventComplete必须为非null非undefined且必须为function
var Class_Lib_PhantomJS_Page = function (arg_url, arg_userDefinedName, arg_loadImage, arg_function_OnEventComplete)
{
	//Include Lib
	var Lib_ValidateTool = require( "./Lib_ValidateTool" ).create();
	//
	//1.检查参数
	//----arg_url
	var isArgNullOrUndefined_url = Lib_ValidateTool.Function_CheckArgIsNullOrUndefined(arg_url);
	if( isArgNullOrUndefined_url == true )
	{
		throw "Argument Exception: arg_url is null or undefined"; 
	}
	//----arg_userDefinedName
	var isArgNullOrUndefined_userDefinedName = Lib_ValidateTool.Function_CheckArgIsNullOrUndefined(arg_userDefinedName);
	if( isArgNullOrUndefined_userDefinedName == true )
	{
		throw "Argument Exception: arg_userDefinedName is null or undefined"; 
	}
	//----arg_loadImage
	var isArgNullOrUndefined_loadImage = Lib_ValidateTool.Function_CheckArgIsNullOrUndefined(arg_loadImage);
	if( isArgNullOrUndefined_loadImage == true )
	{
		throw "Argument Exception: arg_loadImage is null or undefined"; 
	}
	if( !(typeof arg_loadImage === 'boolean') )
	{
		throw "Argument Exception: arg_loadImage is not boolean"; 
	}
	//----arg_function_OnEventComplete
	var isArgNullOrUndefined_function_OnEventComplete = Lib_ValidateTool.Function_CheckArgIsNullOrUndefined(arg_function_OnEventComplete);
	if( isArgNullOrUndefined_function_OnEventComplete == true )
	{
		throw "Argument Exception: arg_function_OnEventComplete is null or undefined"; 
	}
	if( !(typeof arg_function_OnEventComplete === 'function') )
	{
		throw "Argument Exception: arg_function_OnEventComplete is not function"; 
	}
	this.Var_Global_Const_URL = arg_url;
	this.Var_Global_Const_userDefinedName = arg_userDefinedName;
	this.Var_Global_Const_LoadImage = arg_loadImage;
	this.Var_Global_Const_OnEventComplete = arg_function_OnEventComplete;
};

exports.create = function(arg_url, arg_userDefinedName, arg_loadImage, arg_function_OnEventComplete)
{
    return new Class_Lib_PhantomJS_Page(arg_url, arg_userDefinedName, arg_loadImage, arg_function_OnEventComplete);
};

//--------------------------------------------------------------
//--------------------------------------------------------------
//--------------------------------------------------------------
//--------------------------------------------------------------
//--------------------------------------------------------------

//URL
Class_Lib_PhantomJS_Page.prototype.Var_Global_Const_URL = null;
//Page对象
Class_Lib_PhantomJS_Page.prototype.Var_Global_page = null;
//是否加载图片
Class_Lib_PhantomJS_Page.prototype.Var_Global_Const_LoadImage = false;
//开始时间。用于计算访问一个页面到底花了多久时间
Class_Lib_PhantomJS_Page.prototype.Var_Global_time_start = null;
//给URL自定义的名字
Class_Lib_PhantomJS_Page.prototype.Var_Global_Const_userDefinedName = null;
//当url加载完毕后的回调方法
Class_Lib_PhantomJS_Page.prototype.Var_Global_Const_OnEventComplete = null;

//--------------------------------------------------------------
//--------------------------------------------------------------
//--------------------------------------------------------------
//--------------------------------------------------------------
//--------------------------------------------------------------

//功能：格式化输出
//注意：
//    arg_location必须为非null非undefined且非空白字符串
//    arg_msg必须为非null非undefined.
Class_Lib_PhantomJS_Page.prototype.privateFunction_Output = function (arg_location, arg_msg)
{
	//Include Lib
	var Lib_ValidateTool = require( "./Lib_ValidateTool" ).create();
	var Lib_OutputTool = require( "./Lib_OutputTool" ).create();
	//
	//1.检查参数
	//----arg_location
	var isArgNullOrUndefinedorEmpty_location = Lib_ValidateTool.Function_CheckArgIsNullOrUndefineOrEmptyString(arg_location);
	if( isArgNullOrUndefinedorEmpty_location == true )
	{
		throw "Argument Exception: arg_location is null or undefined or empty"; 
	}
	//----arg_msg
	var isArgNullOrUndefinedorEmpty_msg = Lib_ValidateTool.Function_CheckArgIsNullOrUndefined(arg_msg);
	if( isArgNullOrUndefinedorEmpty_msg == true )
	{
		throw "Argument Exception: arg_msg is null or undefined"; 
	}
	//
	//2.主逻辑
	//注意，第1行不加【Lib_OutputTool.Var_Global_Const_SplitString】是因为Lib_OutputTool的Function_Output，会给第一行自动加一个Lib_OutputTool.Var_Global_Const_SplitString。
	//    第2、3行之所以要加两次Lib_OutputTool.Var_Global_Const_SplitString，是因为Lib_OutputTool的Function_Output只给第一行加一个Lib_OutputTool.Var_Global_Const_SplitString。
	//    为了对齐，这里需要为非第1行内容加两次Lib_OutputTool.Var_Global_Const_SplitString。
	var outputMsg = 
	    "PageName: " + this.Var_Global_Const_userDefinedName + "\n" + 
		Lib_OutputTool.Var_Global_Const_SplitString + Lib_OutputTool.Var_Global_Const_SplitString + "URL: " + this.Var_Global_Const_URL + "\n" + 
		Lib_OutputTool.Var_Global_Const_SplitString + Lib_OutputTool.Var_Global_Const_SplitString + "Msg: " + arg_msg;
	Lib_OutputTool.Function_Output(arg_location + " --> Class_Lib_PhantomJS_Page::privateFunction_Output", outputMsg);
}

//打开一个URL页面
Class_Lib_PhantomJS_Page.prototype.Function_Open = function ()
{
	//1.取得信息
	this.privateFunction_Output("Class_Lib_PhantomJS_Page::Function_Open", "Target URL :[" + this.Var_Global_Const_URL + "]");
	//2.打开链接
	this.Var_Global_page = require('webpage').create();
	//
	this.Var_Global_page.onAlert = Event_OnAlert;
	this.Var_Global_page.onCallback = Event_OnCallback;
	this.Var_Global_page.onClosing = Event_OnClosing;
	this.Var_Global_page.onConfirm = Event_OnConfirm;
	this.Var_Global_page.onConsoleMessage = Event_OnConsoleMessage;
	this.Var_Global_page.onError = Event_OnError;
 	this.Var_Global_page.onFilePicker = Event_OnFilePicker;
	this.Var_Global_page.onInitialized = Event_OnInitialized;
	this.Var_Global_page.onLoadFinished = Event_OnLoadFinished;
	this.Var_Global_page.onLoadStarted = Event_OnLoadStarted;
	this.Var_Global_page.onNavigationRequested = Event_OnNavigationRequested;
	this.Var_Global_page.onPageCreated = Event_OnPageCreated;
	this.Var_Global_page.onPrompt = Event_OnPrompt;
	this.Var_Global_page.onResourceError = Event_OnResourceError;
	this.Var_Global_page.onResourceReceived = Event_OnResourceReceived;
	this.Var_Global_page.onResourceRequested = Event_OnResourceRequested;
	this.Var_Global_page.onResourceTimeout = Event_OnResourceTimeout;
	this.Var_Global_page.onUrlChanged = Event_OnUrlChanged;
	//
	this.Var_Global_page.settings.loadImages = this.Var_Global_Const_LoadImage;
	//
	this.privateFunction_Output("Class_Lib_PhantomJS_Page::Function_Open", "Open URL");
	this.Var_Global_time_start = new Date();
	this.Var_Global_page.open(this.Var_Global_Const_URL, this.Var_Global_Const_OnEventComplete);
}

function Event_OnAlert( arg_alertMsg )
{
	this.Lib_PhantomJS_Page.privateFunction_Output("Class_Lib_PhantomJS_Page::Event_OnAlert", "arg_alertMsg = [ " + arg_alertMsg + "]");
}

function Event_OnCallback( arg_callbackData )
{
	this.Lib_PhantomJS_Page.privateFunction_Output("Class_Lib_PhantomJS_Page::Event_OnCallback", "arg_callbackData = [" + JSON.stringify(arg_callbackData) + "]");
}

function Event_OnClosing( arg_closingPage )
{
	this.Lib_PhantomJS_Page.privateFunction_Output("Class_Lib_PhantomJS_Page::Event_OnClosing", "arg_closingPage = [" + arg_closingPage.url + "], [" + JSON.stringify(arg_closingPage) + "]");
}

function Event_OnConfirm( arg_confirmMsg )
{
	this.Lib_PhantomJS_Page.privateFunction_Output("Class_Lib_PhantomJS_Page::Event_OnConfirm", "arg_confirmMsg = [" + arg_confirmMsg + "]");
}

function Event_OnConsoleMessage( arg_consoleMsg, arg_lineNumber, arg_sourceID )
{
	this.Lib_PhantomJS_Page.privateFunction_Output("Class_Lib_PhantomJS_Page::Event_OnConsoleMessage", "arg_consoleMsg:[" + arg_consoleMsg + "], arg_lineNumber:[" + arg_lineNumber + "], arg_sourceID:[" + arg_sourceID + "]");
}

function Event_OnError( arg_msg, arg_trace )
{
	var msgStack = ['ERROR: ' + arg_msg];
    if (arg_trace && arg_trace.length) 
	{
		msgStack.push('TRACE:');
		arg_trace.forEach
		(
			function(t) 
			{
				msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
			}	
		);
	}
	//console.error(msgStack.join('\n'));
	var outputMsg_trace = msgStack.join('\n');
	this.Lib_PhantomJS_Page.privateFunction_Output("Class_Lib_PhantomJS_Page::Event_OnError", "arg_msg = [" + arg_msg + "], arg_trace = [" + outputMsg_trace + "]");
}

function Event_OnFilePicker( arg_oldFile )
{
	this.Lib_PhantomJS_Page.privateFunction_Output("Class_Lib_PhantomJS_Page::Event_OnFilePicker", "arg_oldFile = [" + arg_oldFile + "]");
}

function Event_OnInitialized()
{
	this.Lib_PhantomJS_Page.privateFunction_Output("Class_Lib_PhantomJS_Page::Event_OnInitialized", "No output msg. Start to evaluate [Event_OnInitialized_SubFunction] : document.addEventListener( DOMContentLoaded ).");
	this.Lib_PhantomJS_Page.Var_Global_page.evaluate
	(
	    //Event_OnInitialized::SubFunction
	    function()
		{
			document.addEventListener
			(
			    'DOMContentLoaded'
				,
				function()
				{
					var arg_location = "Class_Lib_PhantomJS_Page::Event_OnInitialized --> Page evaluate SubFunction --> documentEvent( DOMContentLoaded ) --> ListenerCallback";
					var arg_msg = "DOM content has loaded.";
					//Get Date
					var tmp_date = new Date();
					//
					var str_year = tmp_date.getFullYear();
					var str_month = tmp_date.getMonth();
					var str_day = tmp_date.getDay();
					//
					var str_hour = tmp_date.getHours();
					var str_minute = tmp_date.getMinutes();
					var str_second = tmp_date.getSeconds();
					//
					var timeStr = str_year + "-" + str_month + "-" + str_day + "_" + str_hour + ":" + str_minute + ":" + str_second;
					//OutputMsg
					var outputStr = "";
					outputStr += timeStr + "\n";
					outputStr += "    " + "    " + arg_location + "\n";
					outputStr += "    " + "    " + arg_msg + "\n";
					console.log(outputStr);
				}
				,
				false
			);
		}
	);
}

function Event_OnLoadFinished( arg_status )
{
	this.Lib_PhantomJS_Page.privateFunction_Output("Class_Lib_PhantomJS_Page::Event_OnLoadFinished", "arg_status = [" + arg_status + "]");
}

function Event_OnLoadStarted()
{
	this.Lib_PhantomJS_Page.privateFunction_Output("Class_Lib_PhantomJS_Page::Event_OnLoadStarted", "");
}

function Event_OnNavigationRequested(arg_url, arg_type, arg_willNagigate, arg_main)
{
	this.Lib_PhantomJS_Page.privateFunction_Output("Class_Lib_PhantomJS_Page::Event_OnNavigationRequested", "arg_url = [" + arg_url + "], arg_type = [" + arg_type + "], arg_willNagigate = [" + arg_willNagigate + "], arg_main = [" + arg_main + "].");
}

function Event_OnPageCreated( arg_newPage )
{
	this.Lib_PhantomJS_Page.privateFunction_Output("Class_Lib_PhantomJS_Page::Event_OnPageCreated", "arg_newPage = [" + arg_newPage + "]");
}

function Event_OnPrompt( arg_jsPromptMsg, arg_jsPromptDefaultValue )
{
	this.Lib_PhantomJS_Page.privateFunction_Output("Class_Lib_PhantomJS_Page::Event_OnPrompt", "arg_jsPromptMsg = [" + arg_jsPromptMsg + "], arg_jsPromptDefaultValue = [" + arg_jsPromptDefaultValue + "]");
}

function Event_OnResourceError( arg_resourceError )
{
	this.Lib_PhantomJS_Page.privateFunction_Output("Class_Lib_PhantomJS_Page::Event_OnResourceError", "arg_resourceError.id = [" + arg_resourceError.id + "], arg_resourceError.url = [" + arg_resourceError.url + "], arg_resourceError.errorCode = [" + arg_resourceError.errorCode + "], arg_resourceError.errorString = [" + arg_resourceError.errorString + "], arg_resourceError = [" + JSON.stringify(arg_resourceError) + "]");
}

function Event_OnResourceReceived( arg_response )
{
	this.Lib_PhantomJS_Page.privateFunction_Output
	(
	    "Class_Lib_PhantomJS_Page::Event_OnResourceReceived"
		,
		"arg_response:\n" +
		Lib_OutputTool.Var_Global_Const_SplitString + Lib_OutputTool.Var_Global_Const_SplitString + "id = [" + arg_response.id + "]\n" +
		Lib_OutputTool.Var_Global_Const_SplitString + Lib_OutputTool.Var_Global_Const_SplitString + "url = [" + arg_response.url + "]\n" +
		Lib_OutputTool.Var_Global_Const_SplitString + Lib_OutputTool.Var_Global_Const_SplitString + "time = [" + arg_response.time + "]\n" +
		Lib_OutputTool.Var_Global_Const_SplitString + Lib_OutputTool.Var_Global_Const_SplitString + "headers = [" + arg_response.headers + "]\n" +
		Lib_OutputTool.Var_Global_Const_SplitString + Lib_OutputTool.Var_Global_Const_SplitString + "bodySize = [" + arg_response.bodySize + "]\n" +
		Lib_OutputTool.Var_Global_Const_SplitString + Lib_OutputTool.Var_Global_Const_SplitString + "contentType = [" + arg_response.contentType + "]\n" +
		Lib_OutputTool.Var_Global_Const_SplitString + Lib_OutputTool.Var_Global_Const_SplitString + "redirectURL = [" + arg_response.redirectURL + "]\n" +
		Lib_OutputTool.Var_Global_Const_SplitString + Lib_OutputTool.Var_Global_Const_SplitString + "stage = [" + arg_response.stage + "]\n" +
		Lib_OutputTool.Var_Global_Const_SplitString + Lib_OutputTool.Var_Global_Const_SplitString + "status = [" + arg_response.status + "]\n" +
		Lib_OutputTool.Var_Global_Const_SplitString + Lib_OutputTool.Var_Global_Const_SplitString + "statusText = [" + arg_response.statusText + "]\n" +
		Lib_OutputTool.Var_Global_Const_SplitString + Lib_OutputTool.Var_Global_Const_SplitString + "---------------------------\n" +
		Lib_OutputTool.Var_Global_Const_SplitString + Lib_OutputTool.Var_Global_Const_SplitString + "JSON.stringify(arg_response) = " + JSON.stringify(arg_response)
	);
}

function Event_OnResourceRequested( arg_requestData, arg_networkRequest )
{
	this.Lib_PhantomJS_Page.privateFunction_Output
	(
		"Class_Lib_PhantomJS_Page::Event_OnResourceRequested"
		,
		"arg_requestData:\n" +
		Lib_OutputTool.Var_Global_Const_SplitString + Lib_OutputTool.Var_Global_Const_SplitString + "id = [" + arg_requestData.id + "]\n" +
		Lib_OutputTool.Var_Global_Const_SplitString + Lib_OutputTool.Var_Global_Const_SplitString + "method = [" + arg_requestData.method + "]\n" +
		Lib_OutputTool.Var_Global_Const_SplitString + Lib_OutputTool.Var_Global_Const_SplitString + "url = [" + arg_requestData.url + "]\n" +
		Lib_OutputTool.Var_Global_Const_SplitString + Lib_OutputTool.Var_Global_Const_SplitString + "time = [" + arg_requestData.time + "]\n" +
		Lib_OutputTool.Var_Global_Const_SplitString + Lib_OutputTool.Var_Global_Const_SplitString + "headers = [" + arg_requestData.headers + "]\n" +
		Lib_OutputTool.Var_Global_Const_SplitString + Lib_OutputTool.Var_Global_Const_SplitString + "---------------------------\n" +
		Lib_OutputTool.Var_Global_Const_SplitString + Lib_OutputTool.Var_Global_Const_SplitString + "JSON.stringify(arg_requestData) = " + JSON.stringify(arg_requestData)
	);
}

function Event_OnResourceTimeout( arg_request )
{
	this.Lib_PhantomJS_Page.privateFunction_Output
	(
	    "Class_Lib_PhantomJS_Page::Event_OnResourceTimeout"
		,
		"arg_request:\n" +
		Lib_OutputTool.Var_Global_Const_SplitString + Lib_OutputTool.Var_Global_Const_SplitString + "id = [" + arg_request.id + "]\n" +
		Lib_OutputTool.Var_Global_Const_SplitString + Lib_OutputTool.Var_Global_Const_SplitString + "method = [" + arg_request.method + "]\n" +
		Lib_OutputTool.Var_Global_Const_SplitString + Lib_OutputTool.Var_Global_Const_SplitString + "url = [" + arg_request.url + "]\n" +
		Lib_OutputTool.Var_Global_Const_SplitString + Lib_OutputTool.Var_Global_Const_SplitString + "time = [" + arg_request.time + "]\n" +
		Lib_OutputTool.Var_Global_Const_SplitString + Lib_OutputTool.Var_Global_Const_SplitString + "headers = [" + arg_request.headers + "]\n" +
		Lib_OutputTool.Var_Global_Const_SplitString + Lib_OutputTool.Var_Global_Const_SplitString + "errorCode = [" + arg_request.errorCode + "]\n" +
		Lib_OutputTool.Var_Global_Const_SplitString + Lib_OutputTool.Var_Global_Const_SplitString + "errorString = [" + arg_request.errorString + "]\n" +
		Lib_OutputTool.Var_Global_Const_SplitString + Lib_OutputTool.Var_Global_Const_SplitString + "---------------------------\n" +
		Lib_OutputTool.Var_Global_Const_SplitString + Lib_OutputTool.Var_Global_Const_SplitString + "JSON.stringify(arg_request) = " + JSON.stringify(arg_request)
	);
}

function Event_OnUrlChanged( arg_targetUrl )
{
	this.Lib_PhantomJS_Page.privateFunction_Output("Class_Lib_PhantomJS_Page::Event_OnUrlChanged", "arg_targetUrl = [" + arg_targetUrl + "].");
}

//说明：在完成加载后，对网页进行拍照，默认是jpeg + 100%质量
//    arg_renderFileSavePath必须为非null非undefined且非空白字符串
Class_Lib_PhantomJS_Page.prototype.Function_AfterComplete_TakeScreenshot = function (arg_renderFileSavePath)
{
	//Include Lib
	var Lib_ValidateTool = require( "./Lib_ValidateTool" ).create();
	//
	//1.检查参数
	//----arg_renderFileSavePath
	var isArgNullOrUndefined_renderFileSavePath = Lib_ValidateTool.Function_CheckArgIsNullOrUndefined(arg_renderFileSavePath);
	if( isArgNullOrUndefined_renderFileSavePath == true )
	{
		throw "Argument Exception: arg_renderFileSavePath is null or undefined"; 
	}
	//2.主逻辑
	this.Var_Global_page.render(arg_renderFileSavePath, {format: 'jpeg', quality: '100'});
}