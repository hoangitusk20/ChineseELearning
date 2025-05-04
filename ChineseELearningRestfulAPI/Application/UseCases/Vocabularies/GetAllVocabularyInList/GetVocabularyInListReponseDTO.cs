using ChineseELearningRestfulAPI.Application.UseCases.Story;
using ChineseELearningRestfulAPI.Application.UseCases.VocabularyLists;

namespace ChineseELearningRestfulAPI.Application.UseCases.Vocabularies.GetAllVocabularyInList
{
    public class GetVocabularyInListReponseDTO
    {
        public List<VocabularyDTO> storyList { get; set; }
        public VocabularyListDTO  listInfo { get; set; }

        public int totalCount { get; set; }

    }
}
