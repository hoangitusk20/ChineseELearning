using ChineseELearningRestfulAPI.Application.UseCases.Vocabularies.CreateVocabulary;
using ChineseELearningRestfulAPI.Application.UseCases.Vocabularies.DeleteVocabulary;
using ChineseELearningRestfulAPI.Application.UseCases.Vocabularies.GetAllVocabularyInList;
using ChineseELearningRestfulAPI.Application.UseCases.Vocabularies.GetVocabularyById;
using ChineseELearningRestfulAPI.Application.UseCases.Vocabularies.UpdateVocabulary;
using Microsoft.AspNetCore.Mvc;

namespace ChineseELearningRestfulAPI.WepAPI
{
    [Route("api/vocabulary-lists/{vocabularyListId}/vocabularies")]
    [ApiController]
    public class VocabularyController : ControllerBase
    {
        private readonly IGetAllVocabularyInList _getallVocabularyInList;
        private readonly IGetVocabularyById _getVocabularyById;
        private readonly IDeleteVocabulary _deleteVocabulary;
        private readonly IUpdateVocabulary _updateVocabulary;
        private readonly ICreateVocabulary _createVocabulary;

        public VocabularyController(
            IGetAllVocabularyInList getallVocabularyInList,
            IGetVocabularyById getVocabularyById,
            IDeleteVocabulary deleteVocabulary,
            IUpdateVocabulary updateVocabulary,
            ICreateVocabulary createVocabulary)
        {
            _getallVocabularyInList = getallVocabularyInList;
            _getVocabularyById = getVocabularyById;
            _deleteVocabulary = deleteVocabulary;
            _updateVocabulary = updateVocabulary;
            _createVocabulary = createVocabulary;
        }

        [HttpGet]

        public async Task<IActionResult> GetAllVocabularyInList([FromRoute] Guid vocabularyListId, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            try
            {
                var vocabularies = await _getallVocabularyInList.ExecuteAsync(vocabularyListId, page, pageSize);
                return Ok(vocabularies);

            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("{id}")]

        public async Task<IActionResult> GetVocabularyById([FromRoute] Guid id)
        {
            try
            {
                var vocabulary = await _getVocabularyById.ExecuteAsync(id);
      
                return Ok(vocabulary);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateVocabulary([FromRoute] Guid vocabularyListId, [FromBody] CreateVocabularyRequestDTO request)
        {
            try
            {
                var vocabulary = await _createVocabulary.ExecuteAsync(vocabularyListId, request);
                return Ok(vocabulary);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> UpdateVocabulary([FromRoute] Guid id, [FromBody] UpdateVocabularyRequestDTO request)
        {
            try
            {
                var vocabulary = await _updateVocabulary.ExecuteAsync(id, request);
                return Ok(vocabulary);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteVocabulary([FromRoute] Guid id)
        {
            try
            {
                var result = await _deleteVocabulary.ExecuteAsync(id);
                if (result)
                {
                    return Ok(new { message = "Deleted successfully" });
                }
                else
                {
                    return NotFound(new { message = "Vocabulary not found" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }



    }
}
