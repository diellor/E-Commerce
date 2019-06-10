using System;

namespace UsersApp.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; } //key
        public DateTime DateOfBirth { get; set; }
        public DateTime Created { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Role { get; set; }

        public Photo Photo { get; set; }
    }
}