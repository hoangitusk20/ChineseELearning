using ChineseELearningRestfulAPI.Domain.Entities;

namespace ChineseELearningRestfulAPI.Domain.Interfaces
{
    public interface IVocabularyRepository
    {
        Task<List<Vocabulary>> GetVocabulariesByListIdAsync(Guid listId, int page = 1, int pageSize = 20);
        Task<Vocabulary> GetVocabularyByIdAsync(Guid id);
        Task<Vocabulary> CreateVocabularyAsync(Vocabulary vocabulary);
        Task<Vocabulary> UpdateVocabularyAsync(Vocabulary vocabulary);
        Task<bool> DeleteVocabularyAsync(Guid id);

        


    }
}
