using ChineseELearningRestfulAPI.Domain.Entities;
using ChineseELearningRestfulAPI.Domain.Interfaces;

namespace ChineseELearningRestfulAPI.Application.UseCases.VocabularyLists.UpdateVocabularyList
{
    public class UpdateVocabularyList : IUpdateVocabularyList
    {
        private readonly IVocabularyListRepository _vocabularyListRepository;
        public UpdateVocabularyList(IVocabularyListRepository vocabularyListRepository)
        {
            _vocabularyListRepository = vocabularyListRepository;
        }

        public async Task<VocabularyListDTO> ExecuteAsync(UpdateVocabularyListRequestDTO vocabularyList, Guid listId)
        {
            var newVocabularyList = new VocabularyList
            {
                Id = listId,
                Name = vocabularyList.Name,
                Description = vocabularyList.Description,
            };

            var result = await _vocabularyListRepository.UpdateVocabularyListAsync(newVocabularyList);
            if (result == null)
            {
                throw new Exception("Failed to update vocabulary list");
            }
            //return new VocabularyListDTO(result, result.Vocabularies?.Count ?? 0);
            return new VocabularyListDTO(result);
        }
    }

}
