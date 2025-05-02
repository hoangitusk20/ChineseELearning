namespace ChineseELearningRestfulAPI.Application.UseCases.Vocabularies.CreateVocabulary
{
    public interface ICreateVocabulary
    {
        Task<VocabularyDTO> ExecuteAsync(Guid listId, CreateVocabularyRequestDTO dto);
    }
}
