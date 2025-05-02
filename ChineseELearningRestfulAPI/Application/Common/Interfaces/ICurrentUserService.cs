﻿namespace ChineseELearningRestfulAPI.Application.Common.Interfaces
{
    public interface ICurrentUserService
    {
        Guid UserId { get; }
        string? UserName { get; }
        string? Role { get; }
    }
}
