
using ChineseELearningRestfulAPI.Application.UseCases.APIKey;
using ChineseELearningRestfulAPI.Domain.Entities;
using ChineseELearningRestfulAPI.Domain.Interfaces;
using ChineseELearningRestfulAPI.Infrastructure.Persistances;

namespace ChineseELearningRestfulAPI.Application.UseCases.APIKeys.CreateAPIKey
{
    public class CreateAPIKey : ICreateAPIKey
    {
        private readonly IAPIKeyRepository _apiKeyRepository;

        public CreateAPIKey(IAPIKeyRepository apiKeyRepository)
        {
            _apiKeyRepository = apiKeyRepository;
        }

        public async Task<APIKeyDTO> ExecuteAsync(CreateAPIKeyRequestDTO DTO, Guid userId)
        {
            var newAPIkey = new ApiKey
            {
                Key = DTO.Key,
                UserId = userId,
                ServiceName = DTO.ServiceName,
            };

            bool result = await _apiKeyRepository.SaveApiKeyAsync(newAPIkey);
            
            if (!result)
            {
                throw new Exception("Failed to create API key");
            }

            return new APIKeyDTO(newAPIkey);
        }
    }
}
