using System.ComponentModel.DataAnnotations;

namespace Products.API.Dto
{
    public class ProductForCreation
    {
        public int ProductId { get; set; }

        [Required, Display(Name = "Product Name")]
        public string ProductName { get; set; }

        public string Details { get; set; }

        public decimal UnitPrice { get; set; }

        public bool IsActive { get; set; }

    }
}