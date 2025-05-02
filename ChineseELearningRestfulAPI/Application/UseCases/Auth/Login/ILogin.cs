namespace ChineseELearningRestfulAPI.Application.UseCases.Auth.Login
{
    public interface ILogin
    {
        Task<LoginResponseDTO> ExecuteAsync(LoginRequestDTO request);
    }
}
