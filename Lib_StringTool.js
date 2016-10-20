/*
------------------------------
------------------------------
	Lib_StringTool.js
------------------------------
------------------------------
*/

var Class_Lib_StringTool = function (){};

exports.create = function()
{
    return new Class_Lib_StringTool();
};

//功能：把arg_str_main中的所有arg_str_search替换为arg_str_replace
//注意：
//    arg_str_main必须为非null非undefined
//    arg_str_search必须为非null非undefined且非空白字符串
//    arg_str_replace必须为非null非undefined
Class_Lib_StringTool.prototype.Function_ReplaceAll = function( arg_str_main, arg_str_search, arg_str_replace )
{
	//Include Lib
	var Lib_ValidateTool = require( "./Lib_ValidateTool" ).create();
	//
	//1.检查参数
	//----arg_str_main
	var isArgNullOrUndefined_main = Lib_ValidateTool.Function_CheckArgIsNullOrUndefined(arg_str_main);
	if( isArgNullOrUndefined_main == true )
	{
		throw "Argument Exception: arg_str_main is null or undefined"; 
	}
	//----arg_str_search
	var isArgNullOrUndefinedorEmpty_search = Lib_ValidateTool.Function_CheckArgIsNullOrUndefineOrEmptyString(arg_str_search);
	if( isArgNullOrUndefinedorEmpty_search == true )
	{
		throw "Argument Exception: arg_str_search is null or undefined or empty"; 
	}
	//----arg_str_replace
	var isArgNullOrUndefined_replace = Lib_ValidateTool.Function_CheckArgIsNullOrUndefined(arg_str_replace);
	if( isArgNullOrUndefined_replace == true )
	{
		throw "Argument Exception: arg_str_replace is null or undefined"; 
	}
	//2.主逻辑
	var re = new RegExp(arg_str_search, 'g');
	return arg_str_main.replace(re, arg_str_replace);
}