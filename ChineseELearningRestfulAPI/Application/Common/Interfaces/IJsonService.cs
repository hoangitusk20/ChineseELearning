namespace ChineseELearningRestfulAPI.Application.Common.Interfaces
{
    public interface IJsonService
    {
        T Deserialize<T>(string jsonString);
        string Serialize<T>(T obj);
    }
}
