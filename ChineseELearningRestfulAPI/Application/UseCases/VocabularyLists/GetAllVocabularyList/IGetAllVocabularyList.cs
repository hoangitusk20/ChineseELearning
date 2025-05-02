namespace ChineseELearningRestfulAPI.Application.UseCases.VocabularyLists.GetAllVocabularyList
{
    public interface IGetAllVocabularyList
    {
        Task<List<VocabularyListDTO>> ExecuteAsync(Guid userId);
    }
}
