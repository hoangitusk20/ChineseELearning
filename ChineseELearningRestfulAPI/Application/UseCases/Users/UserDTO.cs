using ChineseELearningRestfulAPI.Domain.Entities;

namespace ChineseELearningRestfulAPI.Application.UseCases.Users
{
    public class UserDTO
    {
        public string Username { get; set; }


        public UserDTO(User user)
        {
            Username = user.Username;

        }
    }
}
