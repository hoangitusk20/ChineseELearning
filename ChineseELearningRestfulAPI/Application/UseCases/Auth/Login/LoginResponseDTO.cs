using ChineseELearningRestfulAPI.Application.UseCases.Users;

namespace ChineseELearningRestfulAPI.Application.UseCases.Auth.Login
{
    public class LoginResponseDTO
    {
        public string Token { get; set; }
        public UserDTO User { get; set; }
    }
}
