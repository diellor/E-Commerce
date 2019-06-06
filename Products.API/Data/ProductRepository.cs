using System.Collections.Generic;
using System.Threading.Tasks;
using Products.API.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Products.API.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext context;
        
        public ProductRepository(DataContext context){
            this.context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            context.Remove(entity);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo =  await context.Photos.FirstOrDefaultAsync(p=>p.Id == id);

            return photo;
        }

        public async Task<Product> GetProduct(int id)
        {
            var product = await context.Products.Include(p=>p.Photos).FirstOrDefaultAsync(p=>p.ProductId == id);

            return product;
        }

        public async Task<IEnumerable<Product>> GetProducts()
        {
            var products = await context.Products.Include(p=>p.Photos).ToListAsync();

            return products;
        }

        public async Task<bool> SaveAll()
        {
            return await context.SaveChangesAsync() > 0 ;
        }
        public async Task<Photo> GetMainPhotoForProduct(int productId){
            return await context.Photos.Where(x=>x.ProductId == productId).FirstOrDefaultAsync(p=>p.isMain);
        }
    }
}