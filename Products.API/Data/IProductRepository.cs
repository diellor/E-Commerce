using System.Collections.Generic;
using System.Threading.Tasks;
using Products.API.Models;

namespace Products.API.Data
{
    public interface IProductRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        //Saving changes to dbs returns true if savedAll
        Task<bool> SaveAll();
        //Return users
        Task<IEnumerable<Product>> GetProducts();
        //getting individualUser from dbs
        Task<Product> GetProduct(int id);
        Task<Photo> GetPhoto(int id);
        Task<Photo> GetMainPhotoForProduct(int id);
      //  Task<Photo> getMainPhotoForUser(int userId);
    }
}