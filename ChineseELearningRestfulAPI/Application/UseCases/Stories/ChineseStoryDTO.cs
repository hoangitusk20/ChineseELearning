namespace ChineseELearningRestfulAPI.Application.UseCases.Story
{
    public class ChineseStoryDTO
    {
        public string Story { get; set; }
        public string Meaning { get; set; }
        public Dictionary<string, string> Vocabulary { get; set; }
        public Dictionary<string, string> Grammar { get; set; }
    }
}
