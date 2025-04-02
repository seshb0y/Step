namespace ControllerFirst.DTO.Requests;

public record ChangePasswordRequest(string newPassword, string token);