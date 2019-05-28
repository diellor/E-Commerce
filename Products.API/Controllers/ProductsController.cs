using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Products.API.Data;
using Products.API.Dto;
using Products.API.Models;

namespace Products.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController: ControllerBase
    {
        private readonly IProductRepository repo;
        private readonly IMapper mapper;
        
        public ProductsController(IProductRepository repo,IMapper mapper ){
            this.repo = repo;
            this.mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetProducts(){
            var products = await repo.GetProducts();

            var productToReturn = mapper.Map<IEnumerable<ProductForAdminList>>(products);

            return Ok(productToReturn);
        }

        [HttpPost("createProduct")]
        public async Task<IActionResult> CreateProduct(ProductForCreation prodCreateDto){

            /*
            if(!User.FindFirst(ClaimTypes.Role).Value.Equals("admin")){
                return Unauthorized();
            }
             */
             
            Product prod = new Product(){
             
                ProductName = prodCreateDto.ProductName,
                Details = prodCreateDto.Details,
                UnitPrice = prodCreateDto.UnitPrice,
                IsActive = true
                
            };
            //mapper.Map(prodCreateDto,prod);
            repo.Add(prod);

             if(await repo.SaveAll()){
                
                return NoContent();
            }

            throw new Exception($"Updating user  failed to save");
        }
    }
}