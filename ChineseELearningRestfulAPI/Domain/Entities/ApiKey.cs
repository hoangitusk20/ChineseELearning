namespace ChineseELearningRestfulAPI.Domain.Entities
{
    public enum AIService
    {
        Gemini,
    }
    public class ApiKey
    {
        internal Guid userId;

        public Guid Id { get; set; }
        public string Key { get; set; }
        public Guid UserId { get; set; }
        public AIService ServiceName { get; set; }
        public User User { get; set; }
    }
}
