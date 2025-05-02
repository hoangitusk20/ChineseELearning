using ChineseELearningRestfulAPI.Domain.Entities;

namespace ChineseELearningRestfulAPI.Application.UseCases.APIKey
{
    public class APIKeyDTO
    {
        public string Key { get; set; }
        public AIService ServiceName { get; set; }

        public Guid Id { get; set; }

        public APIKeyDTO(ApiKey apiKey)
        {
            Key = "***" + apiKey.Key.Substring(apiKey.Key.Length - 3);
            ServiceName = apiKey.ServiceName;
            Id = apiKey.Id;
        }
    }
}
