using ChineseELearningRestfulAPI.Application.UseCases.APIKey;
using ChineseELearningRestfulAPI.Domain.Entities;

namespace ChineseELearningRestfulAPI.Domain.Interfaces
{
    public interface IAPIKeyRepository
    {
        Task<string> GetApiKeyAsync(Guid userId, AIService serviceName);
        Task<bool> SaveApiKeyAsync(ApiKey apikey);

        Task<List<ApiKey>> GetUserApiKeyAsync(Guid userId);

        Task<bool> DeleteApiKeyAsync(Guid apiKeyId);
    }
}
