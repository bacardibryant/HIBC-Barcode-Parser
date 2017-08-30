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
            Assert.IsTrue(barcode.CheckDigit == barcode.CalculatedCheckDigit);
        }
        [TestMethod]
        public void Calculates_The_Correct_UnitOfMeasure()
        {
            //Arrange
            var parser = new Parser();

            //Act
            var barcode = parser.Parse(" +A123BJC5D6E71G ");

            //Assert
            Assert.IsTrue( barcode.UnitOfMeasure == barcode.Data[ barcode.Data.Length - 2 ] );
        }
        [TestMethod]
        public void Calculates_The_Correct_LabelerIdentificationCode()
        {
            //Arrange
            var lic = "+H216";
            var parser = new Parser( lic );

            //Act
            var barcode = parser.Parse(" +H2160408351 ");

            //Assert
            Assert.IsTrue(barcode.LabelerIdentificationCode == lic);
        }
        [TestMethod]
        public void Calculates_The_Correct_CheckDigit_UsingDefinedModulus()
        {
            //Arrange
            var labelerIdentificationCode = "+H216";
            var modulus = 43;
            var parser = new Parser( labelerIdentificationCode, modulus );

            //Act
            var barcode = parser.Parse(" +H2160408351 ");

            //Assert
            Assert.IsTrue(barcode.CheckDigit == barcode.CalculatedCheckDigit);
        }
        [TestMethod]
        public void Can_Extract_The_ProductCatalogNumber()
        {
            //Arrange
            var labelerIdentificationCode = "+H216";
            var productCatalogNumber = "04083";
            var parser = new Parser(labelerIdentificationCode);

            //Act
            var barcode = parser.Parse(" +H2160408351 ");

            //Assert
            Assert.IsTrue(barcode.ItemNumber == productCatalogNumber);
        }
        [TestMethod]
        public void Can_Extract_The_ProductCatalogNumber_UsingDefinedModulus()
        {
            //Arrange
            var labelerIdentificationCode = "+H216";
            var modulus = 43;
            var productCatalogNumber = "04083";
            var parser = new Parser(labelerIdentificationCode, modulus);

            //Act
            var barcode = parser.Parse(" +H2160408351 ");

            //Assert
            Assert.IsTrue(barcode.ItemNumber == productCatalogNumber);
        }
    }
}
