using ChineseELearningRestfulAPI.Domain.Interfaces;

namespace ChineseELearningRestfulAPI.Application.UseCases.Vocabularies.GetVocabularyById
{
    public class GetVocabularyById: IGetVocabularyById
    {
        private readonly IVocabularyRepository _vocabularyRepository;
        public GetVocabularyById(IVocabularyRepository vocabularyRepository)
        {
            _vocabularyRepository = vocabularyRepository;
        }
        public async Task<VocabularyDTO> ExecuteAsync(Guid Id)
        {
            var vocabulary = await _vocabularyRepository.GetVocabularyByIdAsync(Id);

            return new VocabularyDTO(vocabulary);
        }
    }

}
