namespace Lesson1_ControllerFirst.DTO.Requests;

public record RegisterRequest
(string UserName, string Password, string ConfirmPassword, string Email);