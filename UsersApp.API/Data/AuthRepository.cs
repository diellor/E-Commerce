using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UsersApp.API.Admin.Data;
using UsersApp.API.Admin.Models;
using UsersApp.API.Models;

namespace UsersApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        DataContext context;
        AdminDataContext adminContext;

        public AuthRepository(DataContext context,AdminDataContext adminContext)
        {
            this.context = context;
            this.adminContext = adminContext;
        }


        public async Task<User> LogIn(string email, string password) //plain text/password = diart
        {
  
                var user = await context.Users.FirstOrDefaultAsync(u => u.Email == email);

                if (user == null)
                {
                    return null; //NOT AUTHORIZED
                }
          
            
            if(!VerifyPasswordHash(password,user.PasswordHash,user.PasswordSalt)){
                return null;
            }
            
            return user;

        }
        public async Task<AdminUser> LogInAdmin(string email, string password) //plain text/password = diart
        {
  
                var user = await adminContext.Admins.FirstOrDefaultAsync(u => u.Email == email);

                if (user == null)
                {
                    return null; //NOT AUTHORIZED
                }
          
            
            if(!VerifyPasswordHash(password,user.PasswordHash,user.PasswordSalt)){
                return null;
            }
            
            return user;

        }
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
           using(var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt)){

               var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

               for(int i = 0;i<computedHash.Length;i++){
                   if(computedHash[i] != passwordHash[i]){
                       return false;
                   }
               }
           }
           return true; //passwords MATCH 
        }

        public async Task<User> Register(User user, string password) //plain text/password = diart
        {
            byte[] passwordHash;
            byte[] passwordSalt;

            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;


            await context.AddAsync(user);
            await context.SaveChangesAsync();

            return user;

        }
        public async Task<AdminUser> RegisterAdmin(AdminUser user, string password) //plain text/password = diart
        {
            byte[] passwordHash;
            byte[] passwordSalt;

            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;


            await adminContext.AddAsync(user);
            await adminContext.SaveChangesAsync();

            return user;

        }
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string email,bool isAdmin)
        {
            if(isAdmin){

                if(await adminContext.Admins.AnyAsync(x=>x.Email.Equals(email)))
                return true;
            }
            else
            {
                if(await context.Users.AnyAsync(x=>x.Email.Equals(email)))
                return true;
            }
            
            return false;
        }

    }
}