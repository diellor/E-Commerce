using UsersApp.API.Models;

namespace UsersApp.API.Admin.Models
{
    public class AdminUser 
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; } //key
    }
}