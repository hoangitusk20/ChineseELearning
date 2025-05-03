
using ChineseELearningRestfulAPI.Domain.Interfaces;

namespace ChineseELearningRestfulAPI.Application.UseCases.VocabularyLists.GetVocabularyListById
{
    public class GetVocabularyListById:IGetVocabularyListById
    {
        private readonly IVocabularyListRepository _vocabularyListRepository;
        public GetVocabularyListById(IVocabularyListRepository vocabularyListRepository)
        {
            _vocabularyListRepository = vocabularyListRepository;
        }

        public async Task<VocabularyListDTO> ExecuteAsync(Guid id, bool includeVocabularies = false)
        {
            var vocabularyList = await _vocabularyListRepository.GetVocabularyListByIdAsync(id, includeVocabularies);
            if (vocabularyList == null)
                throw new Exception("Vocabulary List not found");
            //return new VocabularyListDTO(vocabularyList, vocabularyList.Vocabularies?.Count ?? 0);
            return new VocabularyListDTO(vocabularyList);
        }
    }
}
