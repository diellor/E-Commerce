using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using UsersApp.API.Admin.Data;
using UsersApp.API.Admin.Models;
using UsersApp.API.Data;
using UsersApp.API.DTO;

namespace UsersApp.API.Admin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController: ControllerBase
    {
        private readonly IAuthRepository repo;
        private readonly AdminDataContext context;
        private readonly IConfiguration config;
        public AdminController(IAuthRepository repo,AdminDataContext context,IConfiguration config){
            this.repo = repo;
            this.context = context;
            this.config = config;
        }
 
        [HttpPost("login")]
        public async Task<IActionResult> LogInAdmin(UserForLoginDto loginDto){

            var userFromRepo = await repo.LogInAdmin(loginDto.Email,loginDto.Password);

            if(userFromRepo== null){
                return Unauthorized();
            }

            var claims = new[]{
                new Claim(ClaimTypes.NameIdentifier,userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name,userFromRepo.Email),
                new Claim(ClaimTypes.Role,"admin"),
            };
            
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetSection("AppSettings:Token").Value));

            //jena tu e hash key'n qe e murrrem prej Appsettings->Token 
            var creds = new SigningCredentials(key,SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor{
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1), //24 or
                SigningCredentials = creds
            };
           
            var tokenHandler = new JwtSecurityTokenHandler(); 

            var token =  tokenHandler.CreateToken(tokenDescriptor); 

            return Ok(new{
                token = tokenHandler.WriteToken(token)
            });
            
            
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAdmin(UserForRegistrationDto userDto){
            userDto.Email = userDto.Email.ToLower();

            if(await repo.UserExists(userDto.Email,true)){
                return BadRequest("Email already exists");
            }

            var userToCreate = new AdminUser
            {
                Email = userDto.Email
            };

            var createdUser = await repo.RegisterAdmin(userToCreate,userDto.Password);

            return StatusCode(201);
            
        }
    }
}