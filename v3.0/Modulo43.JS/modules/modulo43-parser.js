/*
THIS CODE CAN BE USED TO PARSE HIBC PRIMARY BARCODES, SECONDARY BARCODES ARE NOT ABLE TO BE PARSED USING THIS MODULE.

Test barcodes:
    // Barcode: +H2160408351
    // LIC: +H216
    // ProductCode: 04083

    // Barcode: +A123BJC5D6E71G
    // LIC: +A123
    // ProductCode: BJC5D6E7

*/

function Parser() {
    this._dataDictionary = new HIBCDictionary().characters;
    this._checkDigit = "";
    this._total = 0;
    this._calculatedCheckDigit = "";
    this._input = "";
    this._unitOfMeasure = "";
    this._itemInformation = "";
    this._numberOfCharacters = 0;
    this._modulo = 0;
    this._modulus = 43;
    this._prefixLength = 5;

};


Parser.prototype.validateBarcodeData = function ( data ) {

    if ( data.length === undefined || data.length == 0 || data.length > 18 || data[0] != '+' ) {
        return false;
    } else {
        return true;
    }

};
    
Parser.prototype.parseBarcodeData = function ( barcodeData ) {

    // trim the barcode of white space.
    // the complete data structure includes the check digit.
    // it must be removed for calculations.
    var completeDataStructure = barcodeData.trim();

    // remove the check digit as although it is present, it is not a part of the data structure.
    var sanitizedDataStructure = completeDataStructure.substr(0, completeDataStructure.length - 1);

    // validate that the barcode meets HIBC requirements.
    if (this.validateBarcodeData(completeDataStructure ) ) {
        this._input = completeDataStructure;
    } else {
        throw new BarcodeFormatException("Barcode data is missing or does not meet HIBC format standards.");
    }

    // capture the length of the barcode to prevent multiple calls to the property which is backed by a method.
    var dataLength = completeDataStructure.length;

    // identify the check digit character.
    this._checkDigit = completeDataStructure.charAt(dataLength - 1);

    // identify the unit of measure character
    this._unitOfMeasure = completeDataStructure.charAt(dataLength - 2);

    // attached the data length value to the number of characters property.
    this._numberOfCharacters = dataLength;


    // The labeler identification code (prefix) is a four character code assigned by the HIBCC.
    // The prefix is comprised of the first five characters of the barcode data which includes the four character LIC
    // along with the "+" HIBC barcode identifier.
    this._prefix = completeDataStructure.substr(0, this._prefixLength);

    // capture the item information, which is all of the characters (1-13) that follow the LIC code and precede the unit of measure
    // and the link character.
    this._itemInformation = sanitizedDataStructure.substr(this._prefixLength, dataLength - (this._prefixLength + 2));

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
    // this assumes that a script reference to the models/barcode.js model exists on the page.
    // check for the barcode object, if it exists then populate it.
    if (Barcode) {
        Barcode.sum = this._total;
        Barcode.unitOfMeasure = this._unitOfMeasure;
        Barcode.modulus = this._modulus;
        Barcode.labelerIdentificationCode = this._prefix.substr(1,4);
        Barcode.checkDigit = this._checkDigit;
        Barcode.calculatedCheckDigit = this._calculatedCheckDigit;
        Barcode.isValid = this._checkDigit == this._calculatedCheckDigit;
        Barcode.data = this._input;
        Barcode.itemNumber = this._itemInformation;
        Barcode.totalNumberOfCharacters = this._numberOfCharacters;

        return Barcode;
    } else {
        return {};
    }
};