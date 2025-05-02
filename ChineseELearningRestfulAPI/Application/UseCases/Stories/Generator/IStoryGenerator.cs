using ChineseELearningRestfulAPI.Application.UseCases.Stories.CreateStoryFromTopic;
using ChineseELearningRestfulAPI.Application.UseCases.Story;

namespace ChineseELearningRestfulAPI.Application.UseCases.Stories.Generator
{
    public interface IStoryGenerator
    {
        Task<ChineseStoryDTO> ExecuteAsync(CreateStoryFromTopicRequestDTO DTO, string apiKey);
    }
}
