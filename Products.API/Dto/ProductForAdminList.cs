using System.ComponentModel.DataAnnotations;

namespace Products.API.Dto
{
    public class ProductForAdminList
    {
         public int ProductId { get; set; }

        public string ProductName { get; set; }

        public string Details { get; set; }

        public decimal UnitPrice { get; set; }

        public bool IsActive { get; set; }

    }
}