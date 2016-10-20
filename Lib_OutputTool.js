/*
------------------------------
------------------------------
	Lib_OutputTool.js
------------------------------
------------------------------
*/

var Class_Lib_OutputTool = function (){};

exports.create = function()
{
    return new Class_Lib_OutputTool();
};

Class_Lib_OutputTool.Static_Output_ID = 0;
Class_Lib_OutputTool.prototype.Var_Global_Const_SplitString = "    ";

//功能：输出
//注意：
//    arg_location必须为非null非undefined且非空白字符串
//    arg_msg必须为非null非undefined.
Class_Lib_OutputTool.prototype.Function_Output = function( arg_location, arg_msg )
{
	//Include Lib
	var Lib_ValidateTool = require( "./Lib_ValidateTool" ).create();
	var Lib_DateTimeTool = require( "./Lib_DateTimeTool" ).create();
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
	//2.主逻辑
	tempID = ++Class_Lib_OutputTool.Static_Output_ID;
	var timeStr = Lib_DateTimeTool.Function_GetDateString();
	var outputStr = "";
	outputStr += tempID + " " + timeStr + "\n";
	outputStr += this.Var_Global_Const_SplitString + arg_location + "\n";
	outputStr += this.Var_Global_Const_SplitString + arg_msg + "\n";
	console.log( outputStr )
}



Class_Lib_OutputTool.prototype.Var_Global_DebugOutput_enable = true;
Class_Lib_OutputTool.prototype.Var_Global_DebugOutput_OutputPrefix = "DEBUG::";

//功能：输出调试信息
//注意：
//    arg_location必须为非null非undefined且非空白字符串
//    arg_debugMsg必须为非null非undefined
Class_Lib_OutputTool.prototype.Function_DebugOutput = function( arg_location, arg_debugMsg )
{
	//Include Lib
	var Lib_ValidateTool = require( "./Lib_ValidateTool" ).create();
	//
	//1.检查参数
	//----arg_location
	var isArgNullOrUndefinedorEmpty_location = Lib_ValidateTool.Function_CheckArgIsNullOrUndefineOrEmptyString(arg_location);
	if( isArgNullOrUndefinedorEmpty_location == true )
	{
		throw "Argument Exception: arg_location is null or undefined or empty"; 
	}
	//----arg_debugMsg
	var isArgNullOrUndefinedorEmpty_debugMsg = Lib_ValidateTool.Function_CheckArgIsNullOrUndefined(arg_debugMsg);
	if( isArgNullOrUndefinedorEmpty_debugMsg == true )
	{
		throw "Argument Exception: arg_debugMsg is null or undefined"; 
	}
	//2.主逻辑
	if( this.Var_Global_DebugOutput_enable == false )
	{
		return;
	}
	arg_debugMsg = this.Var_Global_DebugOutput_OutputPrefix + arg_debugMsg;
	this.Function_Output( arg_location, arg_debugMsg )
}