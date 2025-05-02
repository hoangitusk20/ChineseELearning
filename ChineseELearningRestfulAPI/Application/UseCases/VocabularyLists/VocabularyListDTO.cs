using ChineseELearningRestfulAPI.Domain.Entities;

namespace ChineseELearningRestfulAPI.Application.UseCases.VocabularyLists
{
    public class VocabularyListDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public DateTime CreatedAt { get; set; }

        public VocabularyListDTO(VocabularyList createdList)
        {
            Id = createdList.Id;
            Name = createdList.Name;
            Description = createdList.Description;
            CreatedAt = createdList.CreatedAt;
        }
        public Guid Id { get; set; }
    }
}
