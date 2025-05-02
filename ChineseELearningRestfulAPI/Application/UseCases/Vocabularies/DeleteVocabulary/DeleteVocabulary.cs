using ChineseELearningRestfulAPI.Domain.Interfaces;

namespace ChineseELearningRestfulAPI.Application.UseCases.Vocabularies.DeleteVocabulary
{
    public class DeleteVocabulary:IDeleteVocabulary
    {
        private readonly IVocabularyRepository _vocabularyRepository;

        public DeleteVocabulary(IVocabularyRepository vocabularyRepository)
        {
            _vocabularyRepository = vocabularyRepository;
        }

        public async Task<bool> ExecuteAsync(Guid id)
        {
            return await _vocabularyRepository.DeleteVocabularyAsync(id);
        }
    }
}
