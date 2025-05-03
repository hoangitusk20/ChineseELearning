using ChineseELearningRestfulAPI.Domain.Interfaces;

namespace ChineseELearningRestfulAPI.Application.UseCases.Vocabularies.GetAllVocabularyInList
{
    public class GetAllVocabularyInList: IGetAllVocabularyInList
    {
        private readonly IVocabularyRepository _vocabularyRepository;
        private readonly IVocabularyListRepository _vocabularyListRepository;
        public GetAllVocabularyInList(IVocabularyRepository vocabularyRepository, IVocabularyListRepository vocabularyListRepository)
        {
            _vocabularyRepository = vocabularyRepository;
            _vocabularyListRepository = vocabularyListRepository;
        }

        public async Task<GetVocabularyInListReponseDTO> ExecuteAsync(Guid listId, int page = 1, int pageSize = 20)
        {
            var vocabularyList = await _vocabularyRepository.GetVocabulariesByListIdAsync(listId, page, pageSize);
            int count = await _vocabularyListRepository.GetTotalVocabularyCountByListIdAsync(listId);
            var storyList =  vocabularyList.Select(v => new VocabularyDTO(v)).ToList();
            return new GetVocabularyInListReponseDTO
            {
                totalCount = count,
                storyList = storyList
            };
        }
    }

}
