using Microsoft.EntityFrameworkCore;
using Products.API.Models;

namespace Products.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options):base(options){}

        public DbSet<Product> Products {get;set;}
        public DbSet<Photo> Photos {get; set;}
    }
}