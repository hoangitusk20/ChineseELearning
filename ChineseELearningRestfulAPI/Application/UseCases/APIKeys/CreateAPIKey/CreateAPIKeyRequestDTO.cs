using ChineseELearningRestfulAPI.Domain.Entities;

namespace ChineseELearningRestfulAPI.Application.UseCases.APIKeys.CreateAPIKey
{
    public class CreateAPIKeyRequestDTO
    {
        public string Key { get; set; }
        public AIService ServiceName { get; set; }
    }
}
