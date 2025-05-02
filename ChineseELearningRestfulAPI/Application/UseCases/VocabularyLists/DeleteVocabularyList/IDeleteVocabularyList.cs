namespace ChineseELearningRestfulAPI.Application.UseCases.VocabularyLists.DeleteVocabularyList
{
    public interface IDeleteVocabularyList
    {
        Task<bool> ExecuteAsync(Guid listId);
    }
}
