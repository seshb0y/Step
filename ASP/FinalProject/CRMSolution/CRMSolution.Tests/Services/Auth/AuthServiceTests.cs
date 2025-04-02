// Unit Tests for AuthService
using Xunit;
using Moq;
using AutoMapper;
using CRMSolution.Services.Classes;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.DTO.Requests;
using CRMSolution.DTO;
using CRMSolution.Data.Models;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using ControllerFirst.DTO.Requests;
using System;
using CRMSolution.Data.Repository;
using CRMSolution.Services.Interfaces;

public class AuthServiceTests
{
    private readonly Mock<IUnitOfWork> _unitOfWorkMock;
    private readonly Mock<IMapper> _mapperMock;
    private readonly Mock<ITokenService> _tokenServiceMock;
    private readonly Mock<ILogger<AuthService>> _loggerMock;
    private readonly AuthService _authService;

    public AuthServiceTests()
    {
        _unitOfWorkMock = new Mock<IUnitOfWork>();
        _mapperMock = new Mock<IMapper>();
        _tokenServiceMock = new Mock<ITokenService>();
        _loggerMock = new Mock<ILogger<AuthService>>();

        _authService = new AuthService(
            _unitOfWorkMock.Object,
            _mapperMock.Object,
            _tokenServiceMock.Object,
            _loggerMock.Object);
    }

    [Fact]
    public async Task LoginAsync_Should_Return_Tokens()
    {
        var request = new LoginRequest("testuser", "password123");
        var user = new User { Username = "testuser", RefreshToken = Guid.NewGuid() };
        var httpContext = new DefaultHttpContext();

        _unitOfWorkMock.Setup(x => x.UserRep.FindByNameAsync(request.username)).ReturnsAsync(user);
        _tokenServiceMock.Setup(x => x.CreateTokenAsync(user.Username)).ReturnsAsync("newAccessToken");

        var result = await _authService.LoginAsync(request, httpContext);

        Assert.NotNull(result);
        Assert.Equal("newAccessToken", result.accessToken);
        Assert.Equal(user.RefreshToken.ToString(), result.refreshToken);
    }

    [Fact]
    public async Task RefreshTokenAsync_Should_Return_New_Tokens()
    {
        var user = new User { Username = "testuser", RefreshToken = Guid.NewGuid(), RefreshTokenExpiration = DateTime.UtcNow.AddDays(7) };
        var httpContext = new DefaultHttpContext();
        
        httpContext.Request.Headers.Append("Cookie", "accessToken=oldAccessToken; refreshToken=" + user.RefreshToken.ToString());

        _tokenServiceMock.Setup(x => x.GetNameFromToken("oldAccessToken")).ReturnsAsync(user.Username);
        _unitOfWorkMock.Setup(x => x.UserRep.FindByNameAsync(user.Username)).ReturnsAsync(user);
        _tokenServiceMock.Setup(x => x.CreateTokenAsync(user.Email)).ReturnsAsync("newAccessToken");

        var result = await _authService.RefreshTokenAsync(httpContext);

        Assert.NotNull(result);
        Assert.Equal("newAccessToken", result.accessToken);
        Assert.Equal(user.RefreshToken.ToString(), result.refreshToken);
    }
    
    
    [Fact]
    public async Task LogoutAsync_Should_Delete_Cookies()
    {
        var httpContext = new DefaultHttpContext();
        
        var responseCookiesMock = new Mock<IResponseCookies>();
        
        var responseMock = new Mock<HttpResponse>();
        responseMock.SetupGet(r => r.Cookies).Returns(responseCookiesMock.Object);
    
        var contextMock = new Mock<HttpContext>();
        contextMock.SetupGet(c => c.Response).Returns(responseMock.Object);

        await _authService.LogoutAsync(contextMock.Object);

        responseCookiesMock.Verify(c => c.Delete("accessToken"), Times.Once);
        responseCookiesMock.Verify(c => c.Delete("refreshToken"), Times.Once);
    }

} 