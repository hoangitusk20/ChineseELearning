using ChineseELearningRestfulAPI.Application.UseCases.APIKey;

namespace ChineseELearningRestfulAPI.Application.UseCases.APIKeys.GetUserAPIKeys
{
    public interface IGetUserAPIKeys
    {
        Task<List<APIKeyDTO>> ExecuteAsync(Guid userId);
    }
}
