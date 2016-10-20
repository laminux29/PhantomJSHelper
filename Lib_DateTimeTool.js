/*
------------------------------
------------------------------
	Lib_DateTimeTool.js
------------------------------
------------------------------
*/

var Class_Lib_DateTimeTool = function (){};

exports.create = function()
{
    return new Class_Lib_DateTimeTool();
};

//返回类似于【2016-01-22_09:16:52】这样的时间。
Class_Lib_DateTimeTool.prototype.Function_GetDateString = function()
{
	//Include Lib
	var Lib_NumberTool = require( "./Lib_NumberTool" ).create();
	//
	var tmp_date = new Date();
	//
	var str_year = tmp_date.getFullYear();
	var str_month = Lib_NumberTool.Function_PrefixInteger( tmp_date.getMonth(), 2 );
	var str_day = Lib_NumberTool.Function_PrefixInteger( tmp_date.getDay(), 2 );
	//
	var str_hour = Lib_NumberTool.Function_PrefixInteger( tmp_date.getHours(), 2 );
	var str_minute = Lib_NumberTool.Function_PrefixInteger( tmp_date.getMinutes(), 2 );
	var str_second = Lib_NumberTool.Function_PrefixInteger( tmp_date.getSeconds(), 2 );
	//
	var resultStr = str_year + "-" + str_month + "-" + str_day + "_" + str_hour + ":" + str_minute + ":" + str_second;
	return resultStr;
}

//功能：计算arg_endTime减去arg_startTime的秒值。结果是一个abs绝对值。
//注意：
//    arg_startTime必须为非null非undefined
//    arg_endTime必须为非null非undefined
Class_Lib_DateTimeTool.prototype.Function_GetTimeDiff_SecondsMode = function( arg_startTime, arg_endTime )
{
	//Include Lib
	var Lib_ValidateTool = require( "./Lib_ValidateTool" ).create();
	//
	//1.检查参数
	//----arg_startTime
	var isArgNullOrUndefined_startTime = Lib_ValidateTool.Function_CheckArgIsNullOrUndefined(arg_startTime);
	if( isArgNullOrUndefined_startTime == true )
	{
		throw "Argument Exception: arg_startTime is null or undefined"; 
	}
	//----arg_endTime
	var isArgNullOrUndefined_endTime = Lib_ValidateTool.Function_CheckArgIsNullOrUndefined(arg_endTime);
	if( isArgNullOrUndefined_endTime == true )
	{
		throw "Argument Exception: arg_endTime is null or undefined"; 
	}
	//2.主逻辑
	var timeDiff = arg_endTime.getTime() - arg_startTime.getTime();
	var resultSeconds = Math.abs( timeDiff / 1000 );
	return resultSeconds;
}