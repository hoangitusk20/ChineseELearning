using ChineseELearningRestfulAPI.Domain.Entities;

namespace ChineseELearningRestfulAPI.Application.UseCases.Auth
{
    public interface ITokenService
    {
        string GenerateToken(User user);

    }
}
