using ChineseELearningRestfulAPI.Application.UseCases.Auth.Login;
using ChineseELearningRestfulAPI.Application.UseCases.Auth.Register;
using ChineseELearningRestfulAPI.Application.UseCases.Users;
using Microsoft.AspNetCore.Mvc;

namespace ChineseELearningRestfulAPI.WepAPI
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ILogin _login;
        private readonly IRegister _register;
        public AuthController(ILogin login, IRegister register)
        {
            _login = login;
            _register = register;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponseDTO>> Login([FromBody] LoginRequestDTO request)
        {
            try
            {
                var response = await _login.ExecuteAsync(request);
                return Ok(response);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                // Nếu có lỗi bất ngờ khác
                return StatusCode(500, new { message = "Internal Server Error", detail = ex.Message });
            }
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register([FromBody] RegisterRequestDTO request)
        {
            try
            {
                var response = await _register.ExecuteAsync(request);
                return Ok(response);
            }
            catch (Exception ex)
            {
                // Nếu có lỗi bất ngờ khác
                return StatusCode(500, new { message = "Internal Server Error", detail = ex.Message });
            }
        }
    }
}
