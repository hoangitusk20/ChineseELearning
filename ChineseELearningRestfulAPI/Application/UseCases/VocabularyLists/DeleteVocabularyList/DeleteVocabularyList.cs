using ChineseELearningRestfulAPI.Domain.Interfaces;

namespace ChineseELearningRestfulAPI.Application.UseCases.VocabularyLists.DeleteVocabularyList
{
    public class DeleteVocabularyList:IDeleteVocabularyList
    {
        private readonly IVocabularyListRepository _vocabularyListRepository;
        public DeleteVocabularyList(IVocabularyListRepository vocabularyListRepository)
        {
            _vocabularyListRepository = vocabularyListRepository;
        }

        public async Task<bool> ExecuteAsync(Guid listId)
        {
            return await _vocabularyListRepository.DeleteVocabularyListAsync(listId);
        }
    }
}
