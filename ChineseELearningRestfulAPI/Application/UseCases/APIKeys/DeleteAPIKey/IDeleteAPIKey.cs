namespace ChineseELearningRestfulAPI.Application.UseCases.APIKeys.DeleteAPIKey
{
    public interface IDeleteAPIKey
    {
        Task ExecuteAsync(Guid APIID);
    }
}
