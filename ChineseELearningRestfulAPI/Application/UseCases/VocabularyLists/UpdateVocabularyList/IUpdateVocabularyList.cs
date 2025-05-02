namespace ChineseELearningRestfulAPI.Application.UseCases.VocabularyLists.UpdateVocabularyList
{
    public interface IUpdateVocabularyList
    {
        Task<VocabularyListDTO> ExecuteAsync(UpdateVocabularyListRequestDTO vocabularyList, Guid listId);
    }
}
