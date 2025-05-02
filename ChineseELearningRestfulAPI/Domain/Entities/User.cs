namespace ChineseELearningRestfulAPI.Domain.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public List<ApiKey> ApiKeys { get; set; }

        public List<VocabularyList> VocabularyLists { get; set; }
    }
}
