namespace UsersApp.API.Models
{
    public class Photo
    {
        public int Id {get; set;}
        public string url {get; set;}
        public string publicId {get; set;} 
        public int UserId {get; set;}
        public User User {get; set;}
    }
}