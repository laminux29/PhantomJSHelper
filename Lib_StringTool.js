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

//���ܣ���arg_str_main�е�����arg_str_search�滻Ϊarg_str_replace
//ע�⣺
//    arg_str_main����Ϊ��null��undefined
//    arg_str_search����Ϊ��null��undefined�ҷǿհ��ַ���
//    arg_str_replace����Ϊ��null��undefined
Class_Lib_StringTool.prototype.Function_ReplaceAll = function( arg_str_main, arg_str_search, arg_str_replace )
{
	//Include Lib
	var Lib_ValidateTool = require( "./Lib_ValidateTool" ).create();
	//
	//1.������
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
	//2.���߼�
	var re = new RegExp(arg_str_search, 'g');
	return arg_str_main.replace(re, arg_str_replace);
}