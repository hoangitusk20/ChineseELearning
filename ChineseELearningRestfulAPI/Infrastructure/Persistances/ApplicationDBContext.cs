using ChineseELearningRestfulAPI.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ChineseELearningRestfulAPI.Infrastructure.Persistances
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<ApiKey> Apikeys { get; set; }
        public DbSet<VocabularyList> VocabularyLists { get; set; }
        public DbSet<Vocabulary> Vocabularies { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Enum to string conversion for ServiceName
            modelBuilder.Entity<ApiKey>()
                .Property(a => a.ServiceName)
                .HasConversion<string>();

            // User → VocabularyLists (1-to-many)
            modelBuilder.Entity<User>()
                .HasMany(u => u.VocabularyLists)
                .WithOne(l => l.User)
                .HasForeignKey(l => l.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // VocabularyList → Vocabularies (1-to-many)
            modelBuilder.Entity<VocabularyList>()
                .HasMany(l => l.Vocabularies)
                .WithOne(v => v.VocabularyList)
                .HasForeignKey(v => v.VocabularyListId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
