using ChineseELearningRestfulAPI.Application.UseCases.Users;

namespace ChineseELearningRestfulAPI.Application.UseCases.Auth.Register
{
    public interface IRegister
    {
        Task<UserDTO> ExecuteAsync(RegisterRequestDTO request);

    }
}
