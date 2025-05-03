using ChineseELearningRestfulAPI.Domain.Entities;
using ChineseELearningRestfulAPI.Domain.Interfaces;

namespace ChineseELearningRestfulAPI.Application.UseCases.Vocabularies.UpdateVocabulary
{
    public class UpdateVocabulary:IUpdateVocabulary
    {
        private readonly IVocabularyRepository _vocabularyRepository;
        public UpdateVocabulary(IVocabularyRepository vocabularyRepository)
        {
            _vocabularyRepository = vocabularyRepository;
        }

        public async Task<VocabularyDTO> ExecuteAsync(Guid id, UpdateVocabularyRequestDTO dto)
        {
            var newVocabulary = new Vocabulary
            {
                Id = id,
                Word = dto.Word ?? string.Empty,
                Definition = dto.Definition ?? string.Empty,
                Example = dto.Example ?? string.Empty,
            };

            var result = await _vocabularyRepository.UpdateVocabularyAsync(newVocabulary);

      

            return new VocabularyDTO(result);
        }

    }
}
