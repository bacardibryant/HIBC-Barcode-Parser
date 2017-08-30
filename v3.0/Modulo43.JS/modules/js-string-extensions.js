
/************************************************************************
	Function:		shrink
	Description:	Removes whitespaces from string.
	Returns:		String without spaces.
	Parameters:		s - string to be trimmed.
*************************************************************************/
String.prototype.shrink = function () {
    var l = 0;
    var r = this.length - 1;
    while (l < this.length && this[l] == ' ') {
        l++;
    }
    while (r > l && this[r] == ' ') {
        r -= 1;
    }
    return this.substring(l, r + 1);
};

/************************************************************************
    Function:		trim
    Description:	removes whitespaces from the ends of a string.
    Returns:		String without spaces.
    Parameters:		s - string to be trimmed.
    Calls:			rtrim()
                    ltrim()
*************************************************************************/
String.prototype.trim = function () {
    return this.trimRight(this.trimLeft());
};

/************************************************************************
    Function:		trimLeft
    Description:	removes whitespaces from left of string.
    Returns:		String without spaces.
    Parameters:		s - string to be trimmed.
*************************************************************************/
String.prototype.trimLeft = function () {
    var l = 0;
    while (l < this.length && this[l] == ' ') {
        l++;
    }
    return this.substring(l, this.length);
};

/************************************************************************
    Function:		trimRight
    Description:	removes whitespace from right of string.
    Returns:		String without spaces.
    Parameters:		s - string to be trimmed.
*************************************************************************/
String.prototype.trimRight = function (s) {
    var r = this.length - 1;
    while (r > 0 && this[r] == ' ') {
        r -= 1;
    }
    return this.substring(0, r + 1);
};