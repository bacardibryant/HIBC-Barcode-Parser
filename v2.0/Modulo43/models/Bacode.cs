using System;

namespace Modulo43.Models
{
    public class Barcode
    {
        public string LabelerIdentificationCode { get; set; }
        public string ItemNumber { get; set; }
        public char UnitOfMeasure { get; set; }
        public char LinkCharacter { get; set; }
        public char CalculatedLinkCharacter { get; set; }
        public int TotalNumberOfCharacters { get; set; }
        public int Sum { get; set; }
        public int Modulus { get; set; }
        public bool IsValid { get; set; }
        public string Message { get; set; }
    }
}
