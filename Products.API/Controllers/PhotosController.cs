using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Products.API.Data;
using Products.API.Dto;
using Products.API.Helpers;
using Products.API.Models;

namespace Products.API.Controllers
{
    //[Route("api/[controller]")]
    [Route("api/products/{productId}/[controller]")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IProductRepository repo;
        private readonly IOptions<CloudinarySettings> cloudinaryConfig;

        private Cloudinary cloudinary;
        public PhotosController(IMapper mapper,IOptions<CloudinarySettings> cloudinaryConfig,IProductRepository repo){
            this.repo = repo;
            this.mapper = mapper;
            this.cloudinaryConfig = cloudinaryConfig;

 //Setting up a new Account with values from our AppSettings (we are using our injectedService that we created to tie with the model CloudinarySe.cs)

            Account acc = new Account(
              cloudinaryConfig.Value.CloudName,
              cloudinaryConfig.Value.ApiKey,
              cloudinaryConfig.Value.ApiSecret  
            );
            cloudinary = new Cloudinary(acc);
        }
        [HttpGet("{id}",Name="GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id){
            var photoFromRepo = await repo.GetPhoto(id);

            var photo = mapper.Map<PhotoForReturnDto>(photoFromRepo);

            return Ok(photo);
            
            
        }
        [HttpPost]
        //productId vjen prej route'it
        public async Task<IActionResult> AddPhotoForProduct(int productId,[FromForm]PhotoForCreationDto photoForCreationDto){
            var productFromRepo = await repo.GetProduct(productId);

            IFormFile file = photoForCreationDto.File;  //fotoja qe vjen prej client-side qe e uploadim
            
            var uploadResult = new ImageUploadResult();

            if(file.Length > 0){
                using(var stream = file.OpenReadStream()){

                    var uploadParams = new ImageUploadParams(){
                        File = new FileDescription(file.Name,stream),

                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };
                    uploadResult = cloudinary.Upload(uploadParams);
                }
            }

            photoForCreationDto.Url = uploadResult.Uri.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;

            var photo = mapper.Map<Photo>(photoForCreationDto);

            productFromRepo.Photos.Add(photo);

            //if saving is successfull
            if(await repo.SaveAll()){
                //we need to provide a route to get an individual photo
                //Param1.string routeName, the route that will allow us to return a single photo
                //Param2.object routeValue we need to pass the id of the photo that we want to return
                //Param3. value its goonna be a photo object that we creating, the PhotoForReturnDto model
                var photoToReturn = mapper.Map<PhotoForReturnDto>(photo); //here the (photo for sure has the id)
                //After we create our Route with a name (getrequest) we populate this method
                return CreatedAtRoute("GetPhoto",new {id = photo.Id},photoToReturn);
            }

            return BadRequest("Could not add the photo");

        }
    }
}