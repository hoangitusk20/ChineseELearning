﻿namespace ChineseELearningRestfulAPI.Domain.Entities
{
    public class VocabularyList
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public User User { get; set; }
        public Guid UserId { get; set; }
        public List<Vocabulary> Vocabularies { get; set; }
    }
}
