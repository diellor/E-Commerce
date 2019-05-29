namespace Products.API.Dto
{
    public class ProductForUpdateDto
    {

        public string ProductName { get; set; }

        public string Details { get; set; }

        public decimal UnitPrice { get; set; }

        public bool IsActive { get; set; }
    }
}