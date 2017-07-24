using HIBC.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace HIBC
{
    // Parses Code 128 barcode formatted text and validates a value using
    // HIBC Modulo 43 Check Digit calculation.

    // https://en.wikipedia.org/wiki/Code_128
    // http://www.hibcc.org/
    // http://www.hibcc.org/udi-labeling-standards/create-a-bar-code/

    // TODO: Fix this assumption. Test for the leading and/or trailing space and remove.
    // Assumes scanned data is prefixed with one (1) leading and one (1) trailing space.

    public class Parser : IDisposable
    {
        #region Fields

        // Private dictionary repesentation of the Table of Numerical Value Assignments for Computing HIBC
        // LIC data format Check Digit.
        // This dictionary with read only access, is populated dynamically on instantiation of the class.
        private readonly Dictionary<char,int> _data = new Dictionary<char,int>();

        // A prefix may be appended to the message. This default is for demonstration purposes as the actual
        // prefix, if it exists, could be different.
        private readonly string _prefix = "AC";

        // An array of possible characters from the HIBC LIC table of values.
        // This is used to populate the dictionary as well as provide character access by index.
        private readonly char[] _chars = new[]
        {
            '0','1','2','3','4','5','6','7','8','9','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
            'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
            'Y', 'Z', '-', '.', ' ', '$', '/','+', '%'
        };

        #endregion

        public Dictionary<char, int> Data { get { return _data; } }

        /// <summary>
        /// Default constructory that simply populates the dictionary with array values
        /// to provide key-based access to characters.
        /// </summary>
        public Parser()
        {
            //build data dictionary
            BuildDictionary();
        }

        /// <summary>
        /// Overloaded constructor which accepts an alternate prefix as a parameter
        /// </summary>
        /// <param name="prefix">string: Value that is pre-pended to the barcode data.</param>
        public Parser(string prefix)
        {
            //override default prefix
            _prefix = prefix;

            //build data dictionary
            BuildDictionary();
        }

        /// <summary>
        /// Populates the dictionary from the character array.
        /// The position of each character in the character array also represents its 
        /// corresponding value in the HIBC Table of values
        /// </summary>
        private void BuildDictionary()
        {
            for (var i = 0; i < _chars.Length; i++)
            {
                _data.Add(_chars[i], i);
            }
        }

        /// <summary>
        /// Returns the HIBC LIC Check Digit.
        /// </summary>
        /// <param name="barcodeData">string: The barcode data received.</param>
        /// <returns> Barcode: A barcode object with computed values.</returns>
        public Barcode Parse(string barcodeData)
        {
            var barcode = new Barcode();

            //string must not be null or empty.
            if (string.IsNullOrEmpty(barcodeData))
            {
                barcode.IsValid = false;
                return barcode;
            }

            //TODO: Should not assume a leading and trailing space. Also the check digit could be a space.
            // Assuming a trailing space, retrieve the check digit value as the second to the last
            // value in the string. This is possible because a string is a character array where
            // we can access individual characters by index.
            var checkDigit = barcodeData[barcodeData.Length - 2];

            // Cast the string to character array, truncating the leading and trailing spaces
            // along with the check digit character already retrieved.
            // Although the string is already an array of characters, casting it to the official
            // type makes array methods available.
            var characters = barcodeData.ToCharArray(1, barcodeData.Length - 3);

            // Extract the prefix
            var prefix = barcodeData.Substring(1, 2);

            // If the prefix is not present, or it doesn't match the set value, the barcode is invalid.
            // Set the IsValid property on the barcode to false and return it.
            if (!prefix.Equals(_prefix))
            {
                barcode.Data = barcodeData;
                barcode.IsValid = false;
                return barcode;
            }

            // Extract the message
            var message = new string(characters).Substring(2);

            // Calculate the sum of the characters.
            var total = characters.Sum(character => _data[character]);

            // Calculate the modulo using the sum of the characters in the barcode data and the constant of 43.
            var modulo = total % 43;

            // Retrieve the value of the test digit (expected check digit)
            // from the array of characters above based on the modulo value
            // which should match the index for the corresponding digit.
            var calculatedDigit = _chars[modulo];

            // Assign property values to the barcode object and return it as the result.
            barcode.Data = barcodeData;
            barcode.Message = message;
            barcode.Prefix = prefix;
            barcode.CheckDigit = checkDigit;
            barcode.Modulo = modulo;
            barcode.Sum = total;
            barcode.CalculatedDigit = calculatedDigit;
            barcode.IsValid = calculatedDigit.Equals(checkDigit);

            return barcode;
        }

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: dispose managed state (managed objects).
                }

                // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
                // TODO: set large fields to null.

                disposedValue = true;
            }
        }

        // TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
        // ~Parser() {
        //   // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
        //   Dispose(false);
        // }

        // This code added to correctly implement the disposable pattern.
        public void Dispose()
        {
            // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
            Dispose(true);
            // TODO: uncomment the following line if the finalizer is overridden above.
            // GC.SuppressFinalize(this);
        }
        #endregion
    }
}
