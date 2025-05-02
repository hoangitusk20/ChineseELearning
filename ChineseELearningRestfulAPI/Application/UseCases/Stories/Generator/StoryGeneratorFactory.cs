using ChineseELearningRestfulAPI.Domain.Entities;
using ChineseELearningRestfulAPI.Infrastructure.StoryGenerator;

namespace ChineseELearningRestfulAPI.Application.UseCases.Stories.Generator
{
    public class StoryGeneratorFactory: IStoryGeneratorFactory
    {
        private readonly IServiceProvider _serviceProvider;
        public StoryGeneratorFactory(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }
        public IStoryGenerator GetProvider(AIService provider)
        {
            return provider switch
            {
                AIService.Gemini => _serviceProvider.GetRequiredService<GeminiStoryGenerator>(),
                _ => throw new NotImplementedException(),
            };
        }
    }

}
