using ChineseELearningRestfulAPI.Domain.Entities;
using ChineseELearningRestfulAPI.Domain.Interfaces;

namespace ChineseELearningRestfulAPI.Application.UseCases.VocabularyLists.CreateVocabularyList
{
    public class CreateVocabularyList : ICreateVocabularyList
    {
        private readonly IVocabularyListRepository _vocabularyListRepository;
        public CreateVocabularyList(IVocabularyListRepository vocabularyListRepository)
        {
            _vocabularyListRepository = vocabularyListRepository;
        }

        public async Task<VocabularyListDTO> ExecuteAsync(CreateVocabularyListRequestDTO DTO, Guid userId)
        {
            var newVocabularyList = new VocabularyList
            {
                Name = DTO.Name,
                UserId = userId,
                Description = DTO.Description,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            var result = await _vocabularyListRepository.CreateVocabularyListAsync(newVocabularyList);

            if (result == null)
            {
                throw new Exception("Failed to create vocabulary list");
            }
            return new VocabularyListDTO(newVocabularyList);
        } 
    }
}
