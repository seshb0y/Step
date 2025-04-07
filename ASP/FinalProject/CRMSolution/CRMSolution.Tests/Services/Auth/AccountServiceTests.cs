using Xunit;
using Moq;
using AutoMapper;
using Microsoft.Extensions.Logging;
using CRMSolution.Services.Classes;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.DTO.Requests;
using CRMSolution.Data.Models;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using ControllerFirst.DTO.Requests;
using ControllerFirst.DTO.Responses;
using CRMSolution.Data.Repository;
using CRMSolution.Hubs;
using CRMSolution.Services.Interfaces;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;

public class AccountServiceTests
{
    private readonly Mock<IUnitOfWork> _unitOfWorkMock;
    private readonly Mock<IMapper> _mapperMock;
    private readonly Mock<ITokenService> _tokenServiceMock;
    private readonly Mock<ILogger<AccountService>> _loggerMock;
    private readonly Mock<IHttpContextAccessor> _httpContextAccessorMock;
    private readonly AccountService _accountService;
    private readonly Mock<IHubContext<NotificationHub>> _hubContextMock;


    public AccountServiceTests()
    {
        _unitOfWorkMock = new Mock<IUnitOfWork>();
        _mapperMock = new Mock<IMapper>();
        _tokenServiceMock = new Mock<ITokenService>();
        _loggerMock = new Mock<ILogger<AccountService>>();
        _httpContextAccessorMock = new Mock<IHttpContextAccessor>();
        _hubContextMock = new Mock<IHubContext<NotificationHub>>();


        _accountService = new AccountService(
            _mapperMock.Object,
            _unitOfWorkMock.Object,
            new Mock<IConfiguration>().Object,
            _tokenServiceMock.Object,
            _loggerMock.Object,
            _httpContextAccessorMock.Object,
            _hubContextMock.Object);    
        
    }

    [Fact]
    public async Task RegisterAsync_Should_Create_New_User()
    {
        var request = new RegisterRequest("newUser", "password123", "password123", "user@mail.com");
        var user = new User { Username = "newUser", Email = "user@mail.com" };

        _unitOfWorkMock.Setup(x => x.UserRep.FindByNameAsync(request.Username)).ReturnsAsync((User)null);
        _unitOfWorkMock.Setup(x => x.UserRep.FindByEmailAsync(request.Email)).ReturnsAsync((User)null);
        _mapperMock.Setup(x => x.Map<User>(request)).Returns(user);
        _unitOfWorkMock.Setup(x => x.UserRep.AddAsync(user)).Returns(Task.CompletedTask);

        var mockClients = new Mock<IHubClients>();
        var mockClientProxy = new Mock<IClientProxy>();

        mockClients.Setup(c => c.All).Returns(mockClientProxy.Object);
        mockClientProxy
            .Setup(proxy => proxy.SendCoreAsync(
                It.IsAny<string>(),
                It.IsAny<object[]>(),
                It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        _hubContextMock.Setup(h => h.Clients).Returns(mockClients.Object);
        
        await _accountService.RegisterAsync(request);

        _unitOfWorkMock.Verify(x => x.UserRep.AddAsync(user), Times.Once);
        _unitOfWorkMock.Verify(x => x.SaveChangesAsync(), Times.Once);
    }
    //
    // [Fact]
    // public async Task ConfirmEmailAsync_Should_Send_Confirmation_Email()
    // {
    //     var request = new ConfirmRequest("testuser");
    //     var user = new User { Username = "testuser", Email = "user@mail.com" };
    //     var httpContext = new DefaultHttpContext();
    //     
    //
    //     _unitOfWorkMock.Setup(x => x.UserRep.FindByNameAsync(request.username)).ReturnsAsync(user);
    //     _tokenServiceMock.Setup(x => x.CreateEmailTokenAsync(request.username)).ReturnsAsync("testToken");
    //
    //     await _accountService.ConfirmEmailAsync(request, httpContext);
    //
    //     _tokenServiceMock.Verify(x => x.CreateEmailTokenAsync(request.username), Times.Once);
    // }

    [Fact]
    public async Task ChangePasswordAsync_Should_Update_Password()
    {
        var request = new ChangePasswordRequest("newPassword123", "validToken");
        var user = new User { Username = "testuser" };

        _tokenServiceMock.Setup(x => x.ValidateChangePasswordTokenAsync(request.token)).ReturnsAsync(true);
        _tokenServiceMock.Setup(x => x.GetNameFromToken(request.token)).ReturnsAsync(user.Username);
        _unitOfWorkMock.Setup(x => x.UserRep.FindByNameAsync(user.Username)).ReturnsAsync(user);

        var mockClients = new Mock<IHubClients>();
        var mockClientProxy = new Mock<IClientProxy>();

        mockClients.Setup(c => c.All).Returns(mockClientProxy.Object);
        mockClientProxy
            .Setup(proxy => proxy.SendCoreAsync(
                It.IsAny<string>(),
                It.IsAny<object[]>(),
                It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        _hubContextMock.Setup(h => h.Clients).Returns(mockClients.Object);

        await _accountService.ChangePasswordAsync(request);

        _unitOfWorkMock.Verify(x => x.SaveChangesAsync(), Times.Once);
    }


} 
