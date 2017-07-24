using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Modulo43.Tests
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
            var barcode = parser.Parse(" +A123BJC5D6E71G ");

            //Assert
            Assert.IsTrue(barcode.LinkCharacter == barcode.CalculatedLinkCharacter);
        }
        [TestMethod]
        public void Calculates_The_Correct_UnitOfMeasure()
        {
            //Arrange
            var parser = new Parser();

            //Act
            var barcode = parser.Parse(" +A123BJC5D6E71G ");

            //Assert
            Assert.IsTrue(barcode.UnitOfMeasure == barcode.Message[barcode.Message.Length-1]);
        }
    }
}
