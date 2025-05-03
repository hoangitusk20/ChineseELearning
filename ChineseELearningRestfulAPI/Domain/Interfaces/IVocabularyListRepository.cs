using ChineseELearningRestfulAPI.Domain.Entities;

namespace ChineseELearningRestfulAPI.Domain.Interfaces
{
    public interface IVocabularyListRepository
    {
        Task<List<VocabularyList>> GetAllVocabularyListsAsync(Guid userId);
        Task<VocabularyList> GetVocabularyListByIdAsync(Guid id, bool includeVocabularies = false);
        Task<VocabularyList> CreateVocabularyListAsync(VocabularyList vocabularyList);
        Task<VocabularyList?> UpdateVocabularyListAsync(VocabularyList vocabularyList);
        Task<bool> DeleteVocabularyListAsync(Guid id);

        Task<int> GetTotalVocabularyCountByListIdAsync(Guid id);
    }
}
