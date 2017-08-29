/*
THIS CODE CAN BE USED TO PARSE HIBC PRIMARY BARCODES, SECONDARY BARCODES ARE NOT ABLE TO BE PARSED USING THIS LIBRARY.

Test barcodes:
    // Barcode: +H2160408351
    // LIC: +H216
    // ProductCode: 04083

    // Barcode: +A123BJC5D6E71G
    // LIC: +A123
    // ProductCode: BJC5D6E7

    // Barcode: +H216040A35R
    // LIC: +H216
    // ProductCode: 040A3

    // Barcode: +H216040832$
    // LIC: +H216
    // ProductCode: 04083

*/
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

    // ECMAScript 6 type checking
    if(Number.isInteger(modulus)){
        this._modulus = modulus;
    } else {
        this._modulus = 43;
    }

    if ( labelerIdentificationCode && labelerIdentificationCode.length > 0 ) {
        this._prefix = labelerIdentificationCode;
    } else {
        throw new LabelerIdentificationCodeException("Labeler Identification Code is required.");
    }

};


Parser.prototype.validateBarcodeData = function ( data ) {

    if ( data.length === undefined || data.length == 0 || data.length > 18 ) {
        return false;
    } else {
        return true;
    }

};
    
Parser.prototype.parseBarcodeData = function ( barcodeData ) {

    // trim the barcode of white space.
    // the complete data structure includes the check digit.
    // it must be removed for calculations.
    //var completeDataStructure = new JSTrimmer().trim(barcodeData);
    var completeDataStructure = barcodeData.trim();

    // remove the check digit as although it is present, it is not a part of the data structure.
    var sanitizedDataStructure = completeDataStructure.substr(0, completeDataStructure.length - 1);

    // validate that the barcode meets HIBC requirements.
    if (this.validateBarcodeData(completeDataStructure ) ) {
        this._input = completeDataStructure;
    } else {
        throw new BarcodeFormatException("Barcode data is missing or contains more than 18 characters.");
    }

    // capture the length of the barcode to prevent multiple calls to the property which is backed by a method.
    var dataLength = completeDataStructure.length;

    // identify the check digit character.
    this._checkDigit = completeDataStructure.charAt(dataLength - 1);

    // identify the unit of measure character
    this._unitOfMeasure = completeDataStructure.charAt(dataLength - 2);

    // attached the data length value to the number of characters property.
    this._numberOfCharacters = dataLength;


    //TODO: the labeler identification code (prefix) must be set and it must be validated against the barcode data.
    this._prefix = completeDataStructure.substr(0, this._prefix.length);

    // capture the length of the prefix to prevent future redundant calls.
    var prefixLength = this._prefix.length;

    // capture the item information.
    this._itemInformation = sanitizedDataStructure.substr(prefixLength, dataLength - (prefixLength + 2));

    // iterate over the data structure and capture associated values in the data dictionary and sum to values.
    // this total will be used to calculate the modulo as defined in the specification.
    // because the check digit (last character in the complete data structure) is not a part of the calculation
    // the iteration is only for i < len and not i <= len, stopping one character shy of the total length.
    for (var i = 0, len = sanitizedDataStructure.length; i < len; i++){
        var char = sanitizedDataStructure.charAt(i);
        var value = this._dataDictionary.indexOf(char);
        this._total += value;
    }

    // calculate the modulo
    this._modulo = this._total % this._modulus;

    // calculate the check digit to verify barcode.
    this._calculatedCheckDigit = this._dataDictionary[this._modulo];

    // populate barcode values.
    Barcode.sum = this._total;
    Barcode.unitOfMeasure = this._unitOfMeasure;
    Barcode.modulus = this._modulus;
    Barcode.labelerIdentificationCode = this._prefix;
    Barcode.checkDigit = this._checkDigit;
    Barcode.calculatedCheckDigit = this._calculatedCheckDigit;
    Barcode.isValid = this._checkDigit == this._calculatedCheckDigit;
    Barcode.data = this._input;
    Barcode.itemNumber = this._itemInformation;
    Barcode.totalNumberOfCharacters = this._numberOfCharacters;

    console.log('total characters: ' + Barcode.totalNumberOfCharacters);
    console.log('check digit: ' + Barcode.checkDigit);
    console.log('calculated check digit: ' + Barcode.calculatedCheckDigit);
    console.log('prefix: ' + Barcode.labelerIdentificationCode);
    console.log('is this a valid barcode? ' + Barcode.isValid);

    return Barcode;
};