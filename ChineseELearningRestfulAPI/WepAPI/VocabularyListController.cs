using ChineseELearningRestfulAPI.Application.Common.Interfaces;
using ChineseELearningRestfulAPI.Application.UseCases.VocabularyLists.CreateVocabularyList;
using ChineseELearningRestfulAPI.Application.UseCases.VocabularyLists.DeleteVocabularyList;
using ChineseELearningRestfulAPI.Application.UseCases.VocabularyLists.GetAllVocabularyList;
using ChineseELearningRestfulAPI.Application.UseCases.VocabularyLists.GetVocabularyListById;
using ChineseELearningRestfulAPI.Application.UseCases.VocabularyLists.UpdateVocabularyList;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ChineseELearningRestfulAPI.WepAPI
{
    [Authorize]
    [Route("api/vocabulary-lists")]
    [ApiController]
    public class VocabularyListController : ControllerBase
    {
        private readonly ICreateVocabularyList _createVocabularyList;
        private readonly IDeleteVocabularyList _deleteVocabularyList;
        private readonly IGetAllVocabularyList _getAllVocabularyList;
        private readonly IUpdateVocabularyList _updateVocabularyList;
        private readonly IGetVocabularyListById _getVocabularyListById;
        private readonly ICurrentUserService _currentUserService;

        public VocabularyListController(
            ICreateVocabularyList createVocabularyList,
            IDeleteVocabularyList deleteVocabularyList,
            IGetAllVocabularyList getAllVocabularyList,
            IUpdateVocabularyList updateVocabularyList,
            IGetVocabularyListById getVocabularyListById,
            ICurrentUserService currentUserService)
        {
            _createVocabularyList = createVocabularyList;
            _deleteVocabularyList = deleteVocabularyList;
            _getAllVocabularyList = getAllVocabularyList;
            _updateVocabularyList = updateVocabularyList;
            _getVocabularyListById = getVocabularyListById;
            _currentUserService = currentUserService;
        }

        [HttpPost]

        public async Task<IActionResult> CreateVocabularyList([FromBody] CreateVocabularyListRequestDTO dto)
        {
            try
            {
                var userId = _currentUserService.UserId;
                var vocabularyList = await _createVocabularyList.ExecuteAsync(dto, userId);
                return Ok(vocabularyList);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]

        public async Task<IActionResult> GetAllVocabularyList()
        {
            try
            {
                var userId = _currentUserService.UserId;
                var vocabularyLists = await _getAllVocabularyList.ExecuteAsync(userId);
                return Ok(vocabularyLists);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("{id}")]

        public async Task<IActionResult> GetVocabularyListById(Guid id)
        {
            try
            {
                var vocabularyList = await _getVocabularyListById.ExecuteAsync(id);
                return Ok(vocabularyList);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> UpdateVocabularyList(Guid id, [FromBody] UpdateVocabularyListRequestDTO dto)
        {
            try
            {
                var vocabularyList = await _updateVocabularyList.ExecuteAsync(dto, id);
                return Ok(vocabularyList);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVocabularyList(Guid id)
        {
            try
            {
                await _deleteVocabularyList.ExecuteAsync(id);
                return Ok(new { message = "Delete Vocabulary list successfully" , id=id});
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


    }
}
