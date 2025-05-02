using ChineseELearningRestfulAPI.Application.Common.Interfaces;
using ChineseELearningRestfulAPI.Application.UseCases.APIKeys.CreateAPIKey;
using ChineseELearningRestfulAPI.Application.UseCases.APIKeys.DeleteAPIKey;
using ChineseELearningRestfulAPI.Application.UseCases.APIKeys.GetUserAPIKeys;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ChineseELearningRestfulAPI.WepAPI
{
    [Authorize]
    [Route("api/api-keys")]
    [ApiController]
    public class APIKeyController : ControllerBase
    {
        private readonly ICreateAPIKey _createAPIKey;
        private readonly ICurrentUserService _currentUser;
        private readonly IDeleteAPIKey _deleteAPIKey;
        private readonly IGetUserAPIKeys _getUserAPIKeys;

        public APIKeyController(ICreateAPIKey createAPIKey, ICurrentUserService currentUser, IDeleteAPIKey deleteAPIKey,
            IGetUserAPIKeys getUserAPIKeys)
        {
            _createAPIKey = createAPIKey;
            _currentUser = currentUser;
            _deleteAPIKey = deleteAPIKey;
            _getUserAPIKeys = getUserAPIKeys;
        }

        [HttpPost]

        public async Task<IActionResult> CreateAPIKey([FromBody] CreateAPIKeyRequestDTO DTO)
        {
            if (DTO == null)
            {
                return BadRequest(new { message = "Invalid API key data." });
            }
            try
            {
                var resDTO = await _createAPIKey.ExecuteAsync(DTO, _currentUser.UserId);
                return Ok(resDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal Server Error", detail = ex.Message });
            }
        }

        [HttpDelete("{apiKeyId}")]

        public async Task<IActionResult> DeleteAPIKey(Guid apiKeyId)
        {
            if (apiKeyId == Guid.Empty)
            {
                return BadRequest(new { message = "Invalid API key ID." });
            }
            try
            {
                await _deleteAPIKey.ExecuteAsync(apiKeyId);
                return Ok("Delete API Key Successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal Server Error", detail = ex.Message });
            }
        }

        [HttpGet]

        public async Task<IActionResult> GetAPIKeys()
        {
            try
            {
                var apiKeys = await _getUserAPIKeys.ExecuteAsync(_currentUser.UserId);
                return Ok(apiKeys);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal Server Error", detail = ex.Message });
            }
        }



    }
}
