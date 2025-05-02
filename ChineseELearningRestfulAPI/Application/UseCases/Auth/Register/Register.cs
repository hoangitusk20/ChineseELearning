using ChineseELearningRestfulAPI.Application.UseCases.Users;
using ChineseELearningRestfulAPI.Domain.Entities;
using ChineseELearningRestfulAPI.Domain.Interfaces;

namespace ChineseELearningRestfulAPI.Application.UseCases.Auth.Register
{
    public class Register : IRegister
    {
        private readonly IUserRepository _userRepository;
        public Register(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<UserDTO> ExecuteAsync(RegisterRequestDTO request)
        {
            var existingUser = await _userRepository.GetByUsernameAsync(request.Username);
            if (existingUser != null)
            {
                throw new Exception("Username already exists.");
            }
            var user = new User
            {
                Username = request.Username,
                Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
            };

            var createdUser = await _userRepository.CreateUserAsync(user);

            return new UserDTO(user);
        }
    }
}
