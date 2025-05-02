using ChineseELearningRestfulAPI.Application.Common.Interfaces;
using ChineseELearningRestfulAPI.Application.UseCases.Stories.CreateStoryFromTopic;
using ChineseELearningRestfulAPI.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ChineseELearningRestfulAPI.WepAPI
{
    [Authorize]
    [Route("api/generate-from-topic")]
    [ApiController]
    public class GenerateFromTopicController : ControllerBase
    {
        private readonly ICreateStoryFromTopic _createStoryFromTopic;
        private readonly ICurrentUserService _currentUser;

        public GenerateFromTopicController(ICreateStoryFromTopic createStoryFromTopic, ICurrentUserService currentUser)
        {
            _createStoryFromTopic = createStoryFromTopic;
            _currentUser = currentUser;
        }

        [HttpPost("{provider}")]

        public async Task<IActionResult> GenerateFromTopic([FromRoute] AIService provider, [FromBody] CreateStoryFromTopicRequestDTO request)
        {

            var userId = _currentUser.UserId;
            try
            {
                var result = await _createStoryFromTopic.ExecuteAsync(request, userId, provider);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
