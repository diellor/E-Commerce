using Microsoft.EntityFrameworkCore;
using UsersApp.API.Admin.Models;

namespace UsersApp.API.Admin.Data
{
    public class AdminDataContext : DbContext
    {
        public AdminDataContext(DbContextOptions<AdminDataContext> options):base(options){}

       
        public DbSet<AdminUser> Admins {get;set;}
    }
}