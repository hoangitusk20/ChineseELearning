namespace ChineseELearningRestfulAPI.Application.UseCases.VocabularyLists.CreateVocabularyList
{
    public interface ICreateVocabularyList
    {
        Task<VocabularyListDTO> ExecuteAsync(CreateVocabularyListRequestDTO DTO, Guid userId);
    }
}
