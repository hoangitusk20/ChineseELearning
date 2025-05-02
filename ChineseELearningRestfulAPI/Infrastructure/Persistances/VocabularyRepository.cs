using ChineseELearningRestfulAPI.Domain.Entities;
using ChineseELearningRestfulAPI.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ChineseELearningRestfulAPI.Infrastructure.Persistances
{
    public class VocabolaryRepository : IVocabularyRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public VocabolaryRepository(ApplicationDbContext context)
        {
            _dbContext = context;
        }
        public async Task<Vocabulary> CreateVocabularyAsync(Vocabulary vocabulary)
        {

            if (vocabulary == null)
                throw new ArgumentNullException(nameof(vocabulary));

            try
            {
                vocabulary.CreatedAt = DateTime.UtcNow;

                _dbContext.Vocabularies.Add(vocabulary);
                await _dbContext.SaveChangesAsync();

                return vocabulary;
            }
            catch (DbUpdateException dbEx)
            {
                throw new InvalidOperationException("Đã có lỗi khi lưu từ vựng vào cơ sở dữ liệu.", dbEx);
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi không xác định khi tạo từ vựng.", ex);
            }

        }

        public async Task<bool> DeleteVocabularyAsync(Guid id)
        {
            try
            {
                var vocabulary = await _dbContext.Vocabularies.FindAsync(id);
                if (vocabulary == null)
                    return false;
                _dbContext.Vocabularies.Remove(vocabulary);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Lỗi khi xóa: {ex.Message}");
                throw new Exception($"Error when deleting Vocabulary: {ex.Message}", ex);
            }
        }

        public async Task<List<Vocabulary>> GetVocabulariesByListIdAsync(Guid listId, int page = 1, int pageSize = 20)
        {
            if (page <= 0)
                throw new ArgumentOutOfRangeException(nameof(page), "Page number must be greater than 0.");
            if (pageSize <= 0)
                throw new ArgumentOutOfRangeException(nameof(pageSize), "Page size must be greater than 0.");
            try
            {
                var vocabularyList = await _dbContext.VocabularyLists.FindAsync(listId);
                if (vocabularyList == null)
                    throw new Exception($"No Vocabulary list found with ID {listId}");
                return await _dbContext.Vocabularies
                    .Where(v => v.VocabularyListId == listId)
                    .OrderBy(v => v.CreatedAt) // Có thể sắp xếp theo CreatedAt, Id, v.v.
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();
            }

            catch (Exception ex)
            {
                Console.WriteLine($"Lỗi khi lấy danh sách từ vựng: {ex.Message}");
                throw new Exception($"Error when getting Vocabulary list: {ex.Message}", ex);

            }
        }

        public async Task<Vocabulary> GetVocabularyByIdAsync(Guid id)
        {
            try
            {
                var vocabulary = await _dbContext.Vocabularies
                    .Include(v => v.VocabularyList)
                    .FirstOrDefaultAsync(v => v.Id == id);
                if (vocabulary == null)
                    throw new KeyNotFoundException($"No Vocabulary found with ID {id}");
                return vocabulary;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Lỗi khi lấy từ vựng: {ex.Message}");
                throw new Exception($"Error when getting Vocabulary: {ex.Message}", ex);
            }
        }

        public async Task<bool> UpdateVocabularyAsync(Vocabulary vocabulary)
        {
            try
            {
                var existingVocabulary = await _dbContext.Vocabularies.FindAsync(vocabulary.Id);
                if (existingVocabulary == null)
                    return false;
                existingVocabulary.Word = vocabulary.Word;
                existingVocabulary.Definition = vocabulary.Definition;
                existingVocabulary.UpdatedAt = DateTime.UtcNow;
                _dbContext.Vocabularies.Update(existingVocabulary);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Lỗi khi cập nhật từ vựng: {ex.Message}");
                throw new Exception($"Error when updating Vocabulary: {ex.Message}", ex);
            }
        }
    }
}
