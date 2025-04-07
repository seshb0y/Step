using Xunit;
using Moq;
using AutoMapper;
using Microsoft.Extensions.Logging;
using CRMSolution.Services.Classes;
using CRMSolution.Data.Repository.Interface;
using CRMSolution.DTO.Requests;
using CRMSolution.Data.Models;
using ControllerFirst.DTO.Responses.User;
using ControllerFirst.DTO.Responses;
using System.Threading.Tasks;
using CRMSolution.Data.Repository;
using CRMSolution.Hubs;
using Microsoft.AspNetCore.SignalR;

public class UserServiceTests
{
    private readonly Mock<IUnitOfWork> _unitOfWorkMock;
    private readonly Mock<IMapper> _mapperMock;
    private readonly Mock<ILogger<UserService>> _loggerMock;
    private readonly UserService _userService;
    private readonly Mock<IHubContext<NotificationHub>> _hubContextMock;


    public UserServiceTests()
    {
        _unitOfWorkMock = new Mock<IUnitOfWork>();
        _mapperMock = new Mock<IMapper>();
        _loggerMock = new Mock<ILogger<UserService>>();
        _hubContextMock = new Mock<IHubContext<NotificationHub>>();

        _userService = new UserService(
            _unitOfWorkMock.Object,
            _mapperMock.Object,
            _loggerMock.Object,
            _hubContextMock.Object);
    }

    [Fact]
    public async Task ChangeUserData_Should_Update_User()
    {
        var request = new ChangeUserDataRequest("newUsername", "new@mail.com", UserRole.Admin, "old@mail.com");
        var user = new User();

        _unitOfWorkMock.Setup(x => x.UserRep.FindByEmailAsync(request.oldEmail)).ReturnsAsync(user);
        _mapperMock.Setup(x => x.Map(request, user)).Returns(user);
        _unitOfWorkMock.Setup(x => x.UserRep.FindByEmailAsync(request.newEmail)).ReturnsAsync(user);

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
        
        var result = await _userService.ChangeUserData(request);

        Assert.NotNull(result);
        _unitOfWorkMock.Verify(x => x.UserRep.Update(user), Times.Once);
        _unitOfWorkMock.Verify(x => x.SaveChangesAsync(), Times.Once);
    }

    [Fact]
    public async Task DeleteUser_Should_Remove_User()
    {
        var request = new DeleteUserRequest("delete@mail.com");
        var user = new User();

        _unitOfWorkMock.Setup(x => x.UserRep.FindByEmailAsync(request.email)).ReturnsAsync(user);

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
        
        await _userService.DeleteUser(request);

        _unitOfWorkMock.Verify(x => x.UserRep.Delete(user), Times.Once);
        _unitOfWorkMock.Verify(x => x.SaveChangesAsync(), Times.Once);
    }

    [Fact]
    public async Task FindUser_Should_Return_User_Response()
    {
        var request = new FindUserRequest("user@mail.com");
        var response = new FindUserReponse();

        _unitOfWorkMock.Setup(x => x.UserRep.GetUsersTasksOrdersClientsAsync(request.email)).ReturnsAsync(response);

        var result = await _userService.FindUser(request);

        Assert.NotNull(result);
        Assert.Equal(response, result);
    }

    [Fact]
    public async Task GetAllUsers_Should_Return_Sorted_Response()
    {
        var request = new SortUsersRequest { sortBy = "Username", Descending = false };
        var users = new List<User>();
        var response = new GetAllUsersResponse();

        _unitOfWorkMock.Setup(x => x.UserRep.GetLowInfoUsersList(request)).ReturnsAsync(users);
        _mapperMock.Setup(x => x.Map<GetAllUsersResponse>(users)).Returns(response);

        var result = await _userService.GetAllUsers(request);

        Assert.NotNull(result);
        Assert.Equal(response, result);
    }
}
