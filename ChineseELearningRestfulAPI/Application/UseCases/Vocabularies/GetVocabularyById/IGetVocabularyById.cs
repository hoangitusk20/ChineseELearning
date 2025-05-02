namespace ChineseELearningRestfulAPI.Application.UseCases.Vocabularies.GetVocabularyById
{
    public interface IGetVocabularyById
    {
        Task<VocabularyDTO> ExecuteAsync(Guid Id);
    }
}
