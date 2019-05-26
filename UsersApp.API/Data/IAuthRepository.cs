using UsersApp.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UsersApp.API.Admin.Models;

namespace UsersApp.API.Data
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<AdminUser> RegisterAdmin(AdminUser user, string password);
        Task<User> LogIn(string email,string password);
        Task<AdminUser> LogInAdmin(string email,string password);
        Task<bool> UserExists(string username,bool isAdmin);

    }
}