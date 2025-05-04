namespace ApiGateway.DTO.Requests;

public record ChangePasswordRequest(string newPassword, string token);