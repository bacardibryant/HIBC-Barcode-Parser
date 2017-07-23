using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Diagnostics;

namespace HIBC.Tests
{
    [TestClass]
    public class ParserTests
    {
        [TestMethod]
        public void Calculates_The_Correct_Check_Digit()
        {
            //Arrange
            var parser = new Parser();

            //Act
            var barcode = parser.Parse(" AC0800500G ");
            Debug.WriteLine($"The check digit is {barcode.CheckDigit}.");
            Debug.WriteLine($"The calculated digit is {barcode.CalculatedDigit}.");

            //Assert
            Assert.IsTrue(barcode.CheckDigit == barcode.CalculatedDigit);

        }
    }
}
