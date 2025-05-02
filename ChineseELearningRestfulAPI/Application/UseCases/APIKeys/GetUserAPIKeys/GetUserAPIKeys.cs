using ChineseELearningRestfulAPI.Application.UseCases.APIKey;
using ChineseELearningRestfulAPI.Domain.Interfaces;

namespace ChineseELearningRestfulAPI.Application.UseCases.APIKeys.GetUserAPIKeys
{
    public class GetUserAPIKeys: IGetUserAPIKeys
    {
        private readonly IAPIKeyRepository _apiKeyRepository;
        public GetUserAPIKeys(IAPIKeyRepository apiKeyRepository)
        {
            _apiKeyRepository = apiKeyRepository;
        }
        public async Task<List<APIKeyDTO>> ExecuteAsync(Guid userId)
        {
            var result = await _apiKeyRepository.GetUserApiKeyAsync(userId);
            if (result == null)
            {
                throw new Exception("Failed to get API keys");
            }
            var apiKeyDTOs = result.Select(apikey => new APIKeyDTO(apikey)).ToList();

            return apiKeyDTOs;
        }
    }
}
