namespace ChineseELearningRestfulAPI.Application.UseCases.Vocabularies.DeleteVocabulary
{
    public interface IDeleteVocabulary
    {
        Task<bool> ExecuteAsync(Guid id);
    }
}
