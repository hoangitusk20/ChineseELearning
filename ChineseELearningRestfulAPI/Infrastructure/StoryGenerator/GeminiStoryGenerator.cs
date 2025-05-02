using System.Text.Json;
using System.Text;
using ChineseELearningRestfulAPI.Application.Common.Interfaces;
using ChineseELearningRestfulAPI.Application.UseCases.Stories.CreateStoryFromTopic;
using ChineseELearningRestfulAPI.Application.UseCases.Stories.Generator;
using ChineseELearningRestfulAPI.Application.UseCases.Story;
using ChineseELearningRestfulAPI.Configuration;
using Microsoft.Extensions.Options;
using ChineseELearningRestfulAPI.Application.Common.Helpers;

namespace ChineseELearningRestfulAPI.Infrastructure.StoryGenerator
{
    public class GeminiStoryGenerator : IStoryGenerator
    {
        private readonly HttpClient _httpClient;
        private readonly IOptions<PromptSettings> _promptSettings;
        private readonly IJsonService _jsonService;

        public GeminiStoryGenerator(HttpClient httpClient, IOptions<PromptSettings> promptSettings, IJsonService jsonService)
        {
            _httpClient = httpClient;
            _promptSettings = promptSettings;
            _jsonService = jsonService;
        }
        public async Task<ChineseStoryDTO> ExecuteAsync(CreateStoryFromTopicRequestDTO DTO, string apiKey)
        {
            string HSKLevel = DTO.HSKLevel;
            int WordCount = DTO.WordCount;
            string content = DTO.Content;
            var prompt = FileUtils.ReadPromptFromFile(_promptSettings.Value.CreateStoryFromTopic);
            prompt = prompt.Replace("{HSKLevel}", HSKLevel)
                .Replace("{WordCount}", WordCount.ToString())
                .Replace("{Topic}", content);
            try
            {
                string geminiResponse = await CallGeminiApiAsync(prompt, apiKey);
                ChineseStoryDTO story = _jsonService.Deserialize<ChineseStoryDTO>(geminiResponse);
                if (story == null)
                {
                    throw new Exception("Failed to generate story");
                }
                return story;
            }
            catch (Exception ex)
            {
                throw new Exception("Error generating story: " + ex.Message);
            }

        }

        private async Task<string> CallGeminiApiAsync(string prompt, string apiKey)
        {
            // Endpoint API của Gemini (ví dụ Gemini-Pro Chat)
            var url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey;

            // Dữ liệu request theo định dạng API yêu cầu
            var requestBody = new
            {
                contents = new[]
                {
                new
                {
                    parts = new[]
                    {
                        new { text = prompt }
                    }
                }
            }
            };

            // Serialize request body thành JSON
            var content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");

            // Gửi request POST
            var response = await _httpClient.PostAsync(url, content);

            response.EnsureSuccessStatusCode(); // Ném lỗi nếu không thành công

            // Đọc nội dung trả về
            var responseString = await response.Content.ReadAsStringAsync();

            // Giải mã response JSON để lấy nội dung chính
            var jsonDoc = JsonDocument.Parse(responseString);
            var text = jsonDoc.RootElement
                .GetProperty("candidates")[0]
                .GetProperty("content")
                .GetProperty("parts")[0]
                .GetProperty("text")
                .GetString();

            return text ?? string.Empty;
        }
    }
}
