using ChineseELearningRestfulAPI.Domain.Entities;
using ChineseELearningRestfulAPI.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ChineseELearningRestfulAPI.Infrastructure.Persistances
{
    public class VocabularyListRepository : IVocabularyListRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public VocabularyListRepository(ApplicationDbContext context)
        {
            _dbContext = context;
        }
        public async Task<VocabularyList> CreateVocabularyListAsync(VocabularyList vocabularyList)
        {
            if (vocabularyList == null)
                throw new ArgumentNullException(nameof(vocabularyList));

            try
            {
                vocabularyList.CreatedAt = DateTime.UtcNow;

                _dbContext.VocabularyLists.Add(vocabularyList);
                await _dbContext.SaveChangesAsync();

                return vocabularyList;
            }
            catch (DbUpdateException dbEx)
            {
                throw new InvalidOperationException("Đã có lỗi khi lưu danh sách từ vựng vào cơ sở dữ liệu.", dbEx);
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi không xác định khi tạo danh sách từ vựng.", ex);
            }
        }

        public async Task<bool> DeleteVocabularyListAsync(Guid id)
        {
            try
            {
                var vocabularyList = await _dbContext.VocabularyLists.FindAsync(id);
                if (vocabularyList == null)
                    return false;
                _dbContext.VocabularyLists.Remove(vocabularyList);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                // Ghi log nếu có logger
                Console.WriteLine($"Lỗi khi xóa: {ex.Message}");
                throw new Exception($"Error when deleting Vocabulary list: {ex.Message}", ex);
            }
        }

        public async Task<List<VocabularyList>> GetAllVocabularyListsAsync(Guid userId)
        {
            try
            {
                var vocabularyLists = await _dbContext.VocabularyLists
                                    .Where(v => v.UserId == userId)
                                    .ToListAsync();
                return vocabularyLists;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Lỗi khi lấy danh sách: {ex.Message}");
                throw new Exception($"Error when fetching Vocabulary lists: {ex.Message}", ex);

            }
        }

        public async Task<int> GetTotalVocabularyCountByListIdAsync(Guid id)
        {
            try
            {
                return await _dbContext.Vocabularies
                    .Where(v => v.VocabularyListId == id)
                    .CountAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Lỗi khi đếm từ vựng: {ex.Message}");
                throw new Exception($"Error when counting vocabularies for list {id}: {ex.Message}", ex);
            }
        }


        // Lấy VocabularyList mà KHÔNG include Vocabularies
        public async Task<VocabularyList> GetVocabularyListByIdAsync(Guid id, bool includeVocabularies = false)
        {
            try
            {
                IQueryable<VocabularyList> query = _dbContext.VocabularyLists;

                if (includeVocabularies)
                    query = query.Include(v => v.Vocabularies);

                var vocabularyList = await query.FirstOrDefaultAsync(v => v.Id == id);

                if (vocabularyList == null)
                    throw new KeyNotFoundException($"No Vocabulary list found with ID: {id}");

                return vocabularyList;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Lỗi khi lấy danh sách: {ex.Message}");
                throw new Exception($"Error when fetching Vocabulary list: {ex.Message}", ex);
            }
        }



        public async Task<VocabularyList?> UpdateVocabularyListAsync(VocabularyList vocabularyList)
        {
            if (vocabularyList == null || vocabularyList.Id == Guid.Empty)
                throw new ArgumentException("Invalid vocabulary list data.");

            var existingList = await _dbContext.VocabularyLists.FindAsync(vocabularyList.Id);
            if (existingList == null)
                return null;

            existingList.Name = vocabularyList.Name;
            existingList.Description = vocabularyList.Description;
            existingList.UpdatedAt = DateTime.UtcNow;

            try
            {
                await _dbContext.SaveChangesAsync();
                return existingList;
            }
            catch (DbUpdateException dbEx)
            {
                Console.WriteLine($"Database update error: {dbEx.Message}");
                throw;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Unexpected error: {ex.Message}");
                throw new Exception("An error occurred while updating the vocabulary list.", ex);
            }
        }



    }
}
