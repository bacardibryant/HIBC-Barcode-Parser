using Microsoft.VisualStudio.TestTools.UnitTesting;

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
            var barcode = parser.Parse(" AC0800500Z ");

            //Assert
            Assert.IsTrue(barcode.CheckDigit == barcode.CalculatedDigit);

        }
    }
}
