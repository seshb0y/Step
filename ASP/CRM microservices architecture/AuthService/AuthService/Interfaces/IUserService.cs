using ControllerFirst.DTO.Responses;
using ControllerFirst.DTO.Responses.User;
using CRMSolution.Data.Models;
using CRMSolution.DTO.Requests;

namespace CRMSolution.Services.Interfaces;

public interface IUserService
{
    // public Task<User> CreateUser(CreateUserRequest request);
    public Task<User> ChangeUserData(ChangeUserDataRequest request);
    public Task DeleteUser(DeleteUserRequest request);
    public Task<FindUserReponse> FindUser(FindUserRequest request);
    public Task<GetAllUsersResponse> GetAllUsers(SortUsersRequest sortUsersRequest);
    // Task<List<UsersWithOrdersAndTasksResponse>> GetUsersWithOrdersAndTasks(HttpContext httpContext);
}