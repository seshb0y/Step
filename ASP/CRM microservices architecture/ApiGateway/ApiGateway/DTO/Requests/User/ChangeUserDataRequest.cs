using ApiGateway.Data.Models;

namespace CRMSolution.DTO.Requests;

public record ChangeUserDataRequest(string username, string newEmail, UserRole role, string oldEmail);