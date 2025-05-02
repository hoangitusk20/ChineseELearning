using ChineseELearningRestfulAPI.Application.UseCases.APIKey;

namespace ChineseELearningRestfulAPI.Application.UseCases.APIKeys.CreateAPIKey
{
    public interface ICreateAPIKey
    {
        Task<APIKeyDTO> ExecuteAsync(CreateAPIKeyRequestDTO DTO, Guid userId);
    }
}
