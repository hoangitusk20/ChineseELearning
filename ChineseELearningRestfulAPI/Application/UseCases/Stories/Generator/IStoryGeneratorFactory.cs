using ChineseELearningRestfulAPI.Domain.Entities;

namespace ChineseELearningRestfulAPI.Application.UseCases.Stories.Generator
{
    public interface IStoryGeneratorFactory
    {
        IStoryGenerator GetProvider(AIService provider);
    }
}
