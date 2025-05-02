
using ChineseELearningRestfulAPI.Application.UseCases.Users;
using ChineseELearningRestfulAPI.Domain.Interfaces;

namespace ChineseELearningRestfulAPI.Application.UseCases.Auth.Login
{
    public class Login : ILogin
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenService _tokenService;

        public Login(IUserRepository userRepository, ITokenService tokenService)
        {
            _userRepository = userRepository;
            _tokenService = tokenService;
        }
        public async Task<LoginResponseDTO> ExecuteAsync(LoginRequestDTO request)
        {

            var user = await _userRepository.GetByUsernameAsync(request.Username);

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
            {
                throw new UnauthorizedAccessException("Invalid username or password");
            }
            var token = _tokenService.GenerateToken(user);
            return new LoginResponseDTO
            {
                Token = token,
                User = new UserDTO(user),
            };
        }
    }
}
