namespace ChineseELearningRestfulAPI.Application.UseCases.Vocabularies.UpdateVocabulary
{
    public interface IUpdateVocabulary
    {
        Task<bool> ExecuteAsync(Guid id, UpdateVocabularyRequestDTO dto);
    }
}
