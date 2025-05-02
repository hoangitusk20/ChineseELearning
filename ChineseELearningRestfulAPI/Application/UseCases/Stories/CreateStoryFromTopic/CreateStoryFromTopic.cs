using BCrypt.Net;
using ChineseELearningRestfulAPI.Application.UseCases.Stories.Generator;
using ChineseELearningRestfulAPI.Application.UseCases.Story;
using ChineseELearningRestfulAPI.Domain.Entities;
using ChineseELearningRestfulAPI.Domain.Interfaces;

namespace ChineseELearningRestfulAPI.Application.UseCases.Stories.CreateStoryFromTopic
{
    public class CreateStoryFromTopic:ICreateStoryFromTopic
    {
        private readonly IStoryGeneratorFactory _storyGeneratorFactory;
        private readonly IAPIKeyRepository _apiKeyRepository;
        public CreateStoryFromTopic(IStoryGeneratorFactory storyGeneratorFactory, IAPIKeyRepository apiKeyRepsitory)
        {
            _storyGeneratorFactory = storyGeneratorFactory;
            _apiKeyRepository = apiKeyRepsitory;
        }

        public async Task<ChineseStoryDTO> ExecuteAsync(CreateStoryFromTopicRequestDTO DTO, Guid userId, AIService serviceName)
        {
            var apiKey = await _apiKeyRepository.GetApiKeyAsync(userId, serviceName);
            if (apiKey == null)
            {
                throw new UnauthorizedAccessException("Không có API key hợp lệ cho dịch vụ này.");
            }
            var storyGenerator = _storyGeneratorFactory.GetProvider(serviceName);

            return await storyGenerator.ExecuteAsync(DTO, apiKey);

        }
    }

}
