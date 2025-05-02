using ChineseELearningRestfulAPI.Domain.Interfaces;

namespace ChineseELearningRestfulAPI.Application.UseCases.APIKeys.DeleteAPIKey
{
    public class DeleteAPIKey: IDeleteAPIKey
    {
        private readonly IAPIKeyRepository _apiKeyRepository;
        public DeleteAPIKey(IAPIKeyRepository apiKeyRepository)
        {
            _apiKeyRepository = apiKeyRepository;
        }
        public async Task ExecuteAsync(Guid APIID)
        {
            var result = await _apiKeyRepository.DeleteApiKeyAsync(APIID);
            if (!result)
            {
                throw new Exception("Failed to delete API key");
            }
        }
    }

}
