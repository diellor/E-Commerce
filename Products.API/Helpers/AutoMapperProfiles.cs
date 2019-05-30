using AutoMapper;
using Products.API.Dto;
using Products.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace Products.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles(){
            CreateMap<Product, ProductForAdminList>();
            CreateMap<ProductForUpdateDto, Product>();
            CreateMap<Product, ProductForCreation>();

            CreateMap<Photo,PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
        }
         
    }
}