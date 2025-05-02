namespace ChineseELearningRestfulAPI.Application.UseCases.Vocabularies.UpdateVocabulary
{
    public class UpdateVocabularyRequestDTO
    {
        public string Word { get; set; }
        public string Definition { get; set; }
        public string Example { get; set; }
    }
}
