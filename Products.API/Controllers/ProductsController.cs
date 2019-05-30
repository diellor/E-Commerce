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
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id){
            var product = await repo.GetProduct(id);

            var productToReturn = mapper.Map<ProductForCreation>(product);


            if(productToReturn == null){
                return NotFound();
            }

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
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteProduct(int id){
            var product = await repo.GetProduct(id);

            repo.Delete(product);

            if(await repo.SaveAll())
            return Ok();

            return BadRequest("Failed to remove product");
        }
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateProduct(int id,ProductForUpdateDto prodForUpdate){
            var productFromRepo = await repo.GetProduct(id);

            //Kjo i merr t dhanat e reja qe vijn prej DTO's si parameter edhe i update qato ne productFromRepo
            mapper.Map(prodForUpdate,productFromRepo);

            if(await repo.SaveAll()){
                return NoContent();
            }
            throw new Exception($"Updating user {id} failed to save");
        }
    }
}