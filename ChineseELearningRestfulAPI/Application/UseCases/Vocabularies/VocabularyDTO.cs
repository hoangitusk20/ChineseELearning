using ChineseELearningRestfulAPI.Domain.Entities;

namespace ChineseELearningRestfulAPI.Application.UseCases.Vocabularies
{
    public class VocabularyDTO
    {
        public Guid Id { get; set; }
        public string Word { get; set; }
        public string Definition { get; set; }
        public string Example { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public VocabularyDTO(Vocabulary newVocabulary) {
            Id = newVocabulary.Id;
            Word = newVocabulary.Word;
            Definition = newVocabulary.Definition;
            Example = newVocabulary.Example;
            CreatedAt = newVocabulary.CreatedAt;
            UpdatedAt = newVocabulary.UpdatedAt;
        }

    }
}
