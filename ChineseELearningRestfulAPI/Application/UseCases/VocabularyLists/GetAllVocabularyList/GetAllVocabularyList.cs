using ChineseELearningRestfulAPI.Domain.Entities;
using ChineseELearningRestfulAPI.Domain.Interfaces;

namespace ChineseELearningRestfulAPI.Application.UseCases.VocabularyLists.GetAllVocabularyList
{
    public class GetAllVocabularyList:IGetAllVocabularyList
    {
        private readonly IVocabularyListRepository _vocabularyListRepository;
        public GetAllVocabularyList(IVocabularyListRepository vocabularyListRepository)
        {
            _vocabularyListRepository = vocabularyListRepository;
        }

        public async Task<List<VocabularyListDTO>> ExecuteAsync(Guid userId)
        {
            var vocabularyLists = await _vocabularyListRepository.GetAllVocabularyListsAsync(userId);
            if (vocabularyLists == null || vocabularyLists.Count == 0)
                return [];



            //return vocabularyLists.Select(v => new VocabularyListDTO(v, v.Vocabularies?.Count ?? 0)).ToList();
            return vocabularyLists.Select(v => new VocabularyListDTO(v)).ToList();

        }
    }
}
