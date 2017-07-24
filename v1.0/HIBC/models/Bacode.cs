namespace HIBC.Models
{
    public class Barcode
    {
        public string Data { get; set; }
        public string Prefix { get; set; }
        public char CheckDigit { get; set; }
        public char CalculatedDigit { get; set; }
        public int Sum { get; set; }
        public int Modulo { get; set; }
        public bool IsValid { get; set; }
        public string Message { get; set; }
    }
}
