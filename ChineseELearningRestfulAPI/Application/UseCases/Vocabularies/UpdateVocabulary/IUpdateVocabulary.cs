namespace ChineseELearningRestfulAPI.Application.UseCases.Vocabularies.UpdateVocabulary
{
    public interface IUpdateVocabulary
    {
        Task<VocabularyDTO> ExecuteAsync(Guid id, UpdateVocabularyRequestDTO dto);
    }
}
