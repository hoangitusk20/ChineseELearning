using System.Text.Json;
using ChineseELearningRestfulAPI.Application.Common.Interfaces;

namespace ChineseELearningRestfulAPI.Infrastructure.Services
{
    public class JsonService : IJsonService
    {
        private readonly JsonSerializerOptions _options;

        public JsonService()
        {
            _options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
                WriteIndented = true
            };
        }

        public T Deserialize<T>(string jsonString)
        {
            try
            {
                // Clean input 
                jsonString = jsonString.Replace("```", "")
                                       .Replace("json", "")
                                       .Replace("\n", "");

                var result = JsonSerializer.Deserialize<T>(jsonString, _options);
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[JsonService] Error deserializing JSON: {ex.Message}");
                return default(T);
            }
        }

        public string Serialize<T>(T obj)
        {
            try
            {
                return JsonSerializer.Serialize(obj, _options);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[JsonService] Error serializing object: {ex.Message}");
                return null;
            }
        }
    }
}
