using CRMSolution.Data.Models;

namespace ControllerFirst.DTO.Responses;

public class GetCurrentUserResponse
{
    public Guid Id { get; set; }
    public string Username { get; set; }
    public UserRole Role { get; set; }
        
}