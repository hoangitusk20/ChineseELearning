using ChineseELearningRestfulAPI.Application.UseCases.Story;
using ChineseELearningRestfulAPI.Domain.Entities;

namespace ChineseELearningRestfulAPI.Application.UseCases.Stories.CreateStoryFromTopic
{
    public interface ICreateStoryFromTopic
    {
        Task<ChineseStoryDTO> ExecuteAsync(CreateStoryFromTopicRequestDTO DTO, Guid userId, AIService serviceName);
    }
}
