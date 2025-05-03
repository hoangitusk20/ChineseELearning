using ChineseELearningRestfulAPI.Application.UseCases.Story;

namespace ChineseELearningRestfulAPI.Application.UseCases.Vocabularies.GetAllVocabularyInList
{
    public class GetVocabularyInListReponseDTO
    {
        public List<VocabularyDTO> storyList { get; set; }
        public int totalCount { get; set; }
    }
}
