/*
------------------------------
------------------------------
	Lib_NumberTool.js
------------------------------
------------------------------
*/

var Class_Lib_NumberTool = function (){};

exports.create = function()
{
    return new Class_Lib_NumberTool();
};

//把数字arg_number，对宽度arg_length进行自动补零。
//只处理正数
//返回值为字符串
Class_Lib_NumberTool.prototype.Function_PrefixInteger = function(arg_number, arg_length)
{
	//Include Lib
	var Lib_ValidateTool = require( "./Lib_ValidateTool" ).create();
	//
	//1.参数未定义检查
	var is_arg_number_nullOfUndefined = Lib_ValidateTool.Function_CheckArgIsNullOrUndefined( arg_number );
	if( is_arg_number_nullOfUndefined == true )
	{
		throw "Argument Exception: arg_number is null or undefined"; 
	}
	var is_arg_length_nullOfUndefined = Lib_ValidateTool.Function_CheckArgIsNullOrUndefined( arg_length );
	if( is_arg_length_nullOfUndefined == true )
	{
		throw "Argument Exception: arg_length is null or undefined"; 
	}
	//2.参数有效性检查：检查长度
	if( arg_number < 0 )
	{
		throw "Argument Exception: arg_number < 0";
	}
	if( arg_length <= 0 )
	{
		throw "Argument Exception: arg_length <= 0";
	}
	//3.开始主逻辑
	var numberString = arg_number.toString();
	var numberLength = numberString.length;
	if( numberLength >= arg_length )
	{
		//不需要处理
		return numberString;
	}
	//2.补位
	var blackNumber = arg_length - numberLength;
	var blackString = "";
	for( i = 1; i <= blackNumber; i++ )
	{
		blackString += "0";
	}
	return blackString + numberString;
}