namespace ChineseELearningRestfulAPI.Application.UseCases.Vocabularies.GetAllVocabularyInList
{
    public interface IGetAllVocabularyInList
    {
        Task<GetVocabularyInListReponseDTO> ExecuteAsync(Guid listId, int page = 1, int pageSize = 20);
    }
}
