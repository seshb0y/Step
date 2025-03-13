using CRMSolution.Data.Models;

namespace CRMSolution.DTO.Requests;

public record ChangeUserDataRequest(string username, string password, string newEmail, UserRole role, string oldEmail);