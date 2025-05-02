using ChineseELearningRestfulAPI.Domain.Entities;
using ChineseELearningRestfulAPI.Domain.Interfaces;

namespace ChineseELearningRestfulAPI.Application.UseCases.Vocabularies.CreateVocabulary
{
    public class CreateVocabulary:ICreateVocabulary
    {
        private readonly IVocabularyRepository _vocabularyRepository;
        public CreateVocabulary(IVocabularyRepository vocabularyRepository)
        {
            _vocabularyRepository = vocabularyRepository;
        }

        public async Task<VocabularyDTO> ExecuteAsync(Guid listId, CreateVocabularyRequestDTO dto)
        {
            var newVocabulary = new Vocabulary
            {
                Word = dto.Word ?? "",
                Definition = dto.Definition ?? "",
                VocabularyListId = listId,
                Example=dto.Example ?? "",
            };
            var result = await _vocabularyRepository.CreateVocabularyAsync(newVocabulary);
            if (result == null) {
                throw new Exception("Failed to create vocabulary");
            }

            return new VocabularyDTO(result);
        }
    }
}
