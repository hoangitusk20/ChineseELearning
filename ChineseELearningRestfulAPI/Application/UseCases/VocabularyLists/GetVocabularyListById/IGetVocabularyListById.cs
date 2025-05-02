namespace ChineseELearningRestfulAPI.Application.UseCases.VocabularyLists.GetVocabularyListById
{
    public interface IGetVocabularyListById
    {
        Task<VocabularyListDTO> ExecuteAsync(Guid id, bool includeVocabularies = false);
    }
}
