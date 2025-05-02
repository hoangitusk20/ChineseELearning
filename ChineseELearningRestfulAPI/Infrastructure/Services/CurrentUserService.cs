using System.Security.Claims;
using ChineseELearningRestfulAPI.Application.Common.Interfaces;

namespace ChineseELearningRestfulAPI.Infrastructure.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        public Guid UserId { get; }
        public string? UserName { get; }
        public string? Role { get; }

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            var httpContext = httpContextAccessor.HttpContext;

            if (httpContext == null)
            {
                throw new UnauthorizedAccessException("HttpContext is null.");
            }

            var user = httpContext.User;

            if (user == null || user.Identity == null || !user.Identity.IsAuthenticated)
            {
                // Có thể do token không hợp lệ hoặc hết hạn
                throw new UnauthorizedAccessException("Access token is expired or invalid.");
            }

            var userId = user.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;

            if (userId == null || !Guid.TryParse(userId, out var guid))
            {
                throw new UnauthorizedAccessException("Invalid or missing user ID.");
            }

            UserId = guid;
            UserName = user.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name")?.Value
                ?? null;
            Role = user.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role")?.Value
                ?? null;
        }
    }
}
