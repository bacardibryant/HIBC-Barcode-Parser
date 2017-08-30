var HIBCDictionary = function() {
    
    this.name = "HIBCDictionary";
    this.characters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
        'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
        'W', 'X', 'Y', 'Z', '-', '.', ' ', '$', '/', '+', '%'];

    this.printPositions = () => {
        var chars = new HIBCDictionary().characters;
        var len = chars.length;
        for (var i = 0; i < len; i++) {
            console.log(chars[i] + ' = ' + i);
        };
    }
};