using ChineseELearningRestfulAPI.Domain.Entities;

namespace ChineseELearningRestfulAPI.Domain.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetByUsernameAsync(string username);
        Task<User> CreateUserAsync(User user);
    }
}
