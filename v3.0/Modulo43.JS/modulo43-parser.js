function Parser(labelerIdentificationCode, modulus) {

    this._dataDictionary = new HIBCDictionary().Characters;
    this._checkDigit = "";
    this._total = 0;
    this._calculatedCheckDigit = "";
    this._input = "";
    this._unitOfMeasure = "";
    this._itemInformation = "";
    this._numberOfCharacters = 0;
    this._modulo = 0;

    if( modulus.length > 0 && (typeof modulus == 'number') ){
        this._modulus = modulus;
    } else {
        this._modulus = 43;
    }

    if ( labelerIdentificationCode.length > 0 ) {
        this._prefix = labelerIdentificationCode;
    } else {
        this._prefix = "";
    }

};


Parser.prototype.validateBarcodeData = function ( data ) {

    if ( data.Length === undefined || data.Length == 0 || data.Length > 18 ) {
        return false;
    } else {
        return true;
    }

};
    
Parser.prototype.parseBarcodeData = function ( barcodeData ) {

    // trim the string
    var data = new JSTrimmer().trim(barcodeData);

    if ( this.validateBarcodeData( data ) ) {
        this._input = data;
    } else {
        throw new BarcodeFormatException("Barcode data is missing or contains more than 18 characters.");
    }

    this._checkDigit = data.charAt(data.Length - 1);

    this._unitOfMeasure = data.charAt(data.Length - 2);

    //TODO: the labeler identification code (prefix) must be set and it must be validated against the barcode data.
    this._prefix = data.substr(0, this._prefix.length);

    this._itemInformation = data.substr(this._prefix.length, data.length - (this._prefix.length + 2));

    for (var i = 0, len = data.length; i < len; i++){
        var char = data.charAt(i);
        var value = this._dataDictionary[char];
        this._total += value;
    }

    this._modulo = this._total % this._modulus;

    this._calculatedCheckDigit = this._dataDictionary[this._modulo];

    Barcode.sum = this._total;
    Barcode.unitOfMeasure = this._unitOfMeasure;
    Barcode.modulus = this._modulus;
    Barcode.labelerIdentificationCode = this._prefix;
    Barcode.checkDigit = this._checkDigit;
    Barcode.calculatedCheckDigit = this.calculatedCheckDigit;
    Barcode.isValid = this._checkDigit === this._calculatedCheckDigit;
    Barcode.data = this._input;
    Barcode.itemNumber = this._itemInformation;
    Barcode.totalNumberOfCharacters = this._numberOfCharacters;

    console.log(Barcode);
};