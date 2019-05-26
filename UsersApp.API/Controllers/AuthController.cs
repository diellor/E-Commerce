using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using UsersApp.API.Data;
using UsersApp.API.DTO;
using UsersApp.API.Models;

namespace UsersApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository repo;
        private readonly IConfiguration config;

        public AuthController(IAuthRepository repo,IConfiguration config){
            this.repo = repo;
            this.config = config;
            
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegistrationDto userDto){
            userDto.Email = userDto.Email.ToLower();

            if(await repo.UserExists(userDto.Email,false)){
                return BadRequest("Email already exists");
            }

            var userToCreate = new User
            {
                Email = userDto.Email
            };

            var createdUser = await repo.Register(userToCreate,userDto.Password);

            return StatusCode(201);
            
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login (UserForLoginDto userLoginDto){
            var userFromRepo = await repo.LogIn(userLoginDto.Email,userLoginDto.Password);

            if(userFromRepo== null){
                return Unauthorized();
            }

            var claims = new[]{
                new Claim(ClaimTypes.NameIdentifier,userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name,userFromRepo.Email)
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

    }
}