/*
------------------------------
------------------------------
	Lib_ValidateTool.js
------------------------------
------------------------------
*/
Lib_ValidateTool;

var Class_Lib_ValidateTool = function (){};

exports.create = function()
{
    return new Class_Lib_ValidateTool();
};

//是null则返回true，否则返回false
Class_Lib_ValidateTool.prototype.Function_CheckArgIsNull = function( arg_obj )
{
	if (arg_obj === null)
	{
		return true;
	}
	else
	{
		return false;
	}
}

//是undefined则返回true，否则返回false
Class_Lib_ValidateTool.prototype.Function_CheckArgIsUndefined = function( arg_obj )
{
	if (typeof arg_obj === "undefined")
	{
		return true;
	}
	else
	{
		return false;
	}
}

//如果是null或undefined则返回true，否则返回false。
Class_Lib_ValidateTool.prototype.Function_CheckArgIsNullOrUndefined = function( arg_obj )
{
	var isNull = this.Function_CheckArgIsNull( arg_obj );
	if( isNull == true )
	{
		return true;
	}
	isUndefined = this.Function_CheckArgIsUndefined( arg_obj );
	if( isUndefined == true )
	{
		return true;
	}
	return false;
}

//如果为null或undefined则报错。
//如果为空str则返回true，否则返回false。
Class_Lib_ValidateTool.prototype.Function_CheckArgIsEmptyString = function( arg_str )
{
	var isNullOrUndefined = this.Function_CheckArgIsNullOrUndefined( arg_str );
	if( isNullOrUndefined == true )
	{
		throw "Argument Exception: arg_str is null or undefined"; 
	}
	if( arg_str.length == 0 )
	{
		return true;
	}
	else
	{
		return false;
	}
}

//如果为null或undefined或空字符串或空白字符串则返回true，否则返回false。
Class_Lib_ValidateTool.prototype.Function_CheckArgIsNullOrUndefineOrEmptyString = function( arg_str )
{
	var isNullOrUndefined = this.Function_CheckArgIsNullOrUndefined( arg_str );
	if( isNullOrUndefined == true )
	{
		return true;
	}
	if( arg_str.length == 0 )
	{
		return true;
	}
	var re = new RegExp(" ", 'g');
	var strResult = arg_str.replace(re, "");
	if( strResult.length == 0 )
	{
		return true;
	}
	return false;
}
