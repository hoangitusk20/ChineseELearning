using ChineseELearningRestfulAPI.Domain.Interfaces;

namespace ChineseELearningRestfulAPI.Application.UseCases.Vocabularies.GetAllVocabularyInList
{
    public class GetAllVocabularyInList: IGetAllVocabularyInList
    {
        private readonly IVocabularyRepository _vocabularyRepository;
        public GetAllVocabularyInList(IVocabularyRepository vocabularyRepository, IVocabularyListRepository vocabularyListRepository)
        {
            _vocabularyRepository = vocabularyRepository;
        }

        public async Task<List<VocabularyDTO>> ExecuteAsync(Guid listId, int page = 1, int pageSize = 20)
        {
            var vocabularyList = await _vocabularyRepository.GetVocabulariesByListIdAsync(listId, page, pageSize);
            return vocabularyList.Select(v => new VocabularyDTO(v)).ToList();
        }
    }

}
