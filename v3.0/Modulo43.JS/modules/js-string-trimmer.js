function JSTrimmer() {
 
};

/************************************************************************
	Function:		shrink
	Description:	Removes whitespaces from string.
	Returns:		String without spaces.
	Parameters:		s - string to be trimmed.
*************************************************************************/
JSTrimmer.prototype.shrink = function (s) {
    var l = 0;
    var r = s.length - 1;
    while (l < s.length && s[l] == ' ') {
        l++;
    }
    while (r > l && s[r] == ' ') {
        r -= 1;
    }
    return s.substring(l, r + 1);
};

/************************************************************************
    Function:		trim
    Description:	removes whitespaces from the ends of a string.
    Returns:		String without spaces.
    Parameters:		s - string to be trimmed.
    Calls:			rtrim()
                    ltrim()
*************************************************************************/
JSTrimmer.prototype.trim = function (s) {
    return this.trimRight(this.trimLeft(s));
};

/************************************************************************
    Function:		trimLeft
    Description:	removes whitespaces from left of string.
    Returns:		String without spaces.
    Parameters:		s - string to be trimmed.
*************************************************************************/
JSTrimmer.prototype.trimLeft = function (s) {
    var l = 0;
    while (l < s.length && s[l] == ' ') {
        l++;
    }
    return s.substring(l, s.length);
};

/************************************************************************
    Function:		trimRight
    Description:	removes whitespace from right of string.
    Returns:		String without spaces.
    Parameters:		s - string to be trimmed.
*************************************************************************/
JSTrimmer.prototype.trimRight = function (s) {
    var r = s.length - 1;
    while (r > 0 && s[r] == ' ') {
        r -= 1;
    }
    return s.substring(0, r + 1);
};