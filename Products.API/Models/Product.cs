namespace Products.API.Models
{
    [Table("Product")]
    public class Product
    {
        public int ProductId { get; set; }

        [Required, Display(Name = "Product Name")]
        public string ProductName { get; set; }

        public string Details { get; set; }

        public decimal UnitPrice { get; set; }

        public bool IsActive { get; set; }

        public int? CategoryId { get; set; }
        public virtual Category Categories { get; set; }

        public ICollection<Photo> Photos { get; set; }
    
    }
}