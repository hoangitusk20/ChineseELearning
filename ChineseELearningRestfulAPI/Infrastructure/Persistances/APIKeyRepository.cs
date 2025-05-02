using ChineseELearningRestfulAPI.Application.UseCases.APIKey;
using ChineseELearningRestfulAPI.Domain.Entities;
using ChineseELearningRestfulAPI.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ChineseELearningRestfulAPI.Infrastructure.Persistances
{
    public class APIKeyRepository : IAPIKeyRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public APIKeyRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<string> GetApiKeyAsync(Guid userId, AIService serviceName)
        {
            try
            {
                var apiKey = await _dbContext.Apikeys
                  .Where(k => k.UserId == userId && k.ServiceName == serviceName)
                  .Select(k => k.Key)
                  .FirstOrDefaultAsync();

                if (apiKey == null)
                    throw new Exception($"No API Key found for user {userId} and service {serviceName}");
                return apiKey;
            }
            catch (Exception ex)
            {
                // Log the exception
                throw new Exception($"Error retrieving API Key: {ex.Message}");
            }
        }

        public async Task<List<ApiKey>> GetUserApiKeyAsync(Guid userId)
        {
            try
            {
                var apiKeys = await _dbContext.Apikeys
                    .Where(k => k.UserId == userId)
                    .Select(k => k)
                    .ToListAsync();
                if (apiKeys == null || !apiKeys.Any())
                    throw new Exception($"No API Key found for user {userId}");
                return apiKeys;
            }
            catch (Exception ex)
            {
                // Log the exception
                throw new Exception($"Error retrieving API Key: {ex.Message}");
            }

        }

        public async Task<bool> SaveApiKeyAsync(ApiKey apikey)
        {
            var existingKey = await _dbContext.Apikeys
                .FirstOrDefaultAsync(k => k.UserId == apikey.UserId && k.ServiceName == apikey.ServiceName);

            if (existingKey != null)
            {
                throw new InvalidOperationException($"API key already exists for user '{apikey.UserId}' and service '{apikey.ServiceName}'.");
            }

            await _dbContext.Apikeys.AddAsync(apikey);

            var result = await _dbContext.SaveChangesAsync();
            return result > 0;
        }


        public async Task<bool> DeleteApiKeyAsync(Guid apiKeyId)
        {
            try
            {
                var apikey = await _dbContext.Apikeys.FindAsync(apiKeyId);

                if (apikey == null)
                    return false;

                _dbContext.Apikeys.Remove(apikey);
                await _dbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                // Ghi log nếu có logger
                throw new Exception($"Error deleting API Key: {ex.Message}");
            }

        }
    }
}
