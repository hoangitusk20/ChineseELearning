namespace ChineseELearningRestfulAPI.Application.UseCases.Stories.CreateStoryFromTopic
{
    public class CreateStoryFromTopicRequestDTO
    {
        public string Content { get; set; }
        public string HSKLevel { get; set; }
        public int WordCount { get; set; }
    }
}
