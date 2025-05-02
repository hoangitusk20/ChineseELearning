namespace ChineseELearningRestfulAPI.Domain.Entities
{
    public class Vocabulary
    {
        public Guid Id { get; set; }
        public string Word { get; set; }
        public string Definition { get; set; }
        public string Example { get; set; }

        public Guid VocabularyListId { get; set; }
        public VocabularyList VocabularyList { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

    }
}
