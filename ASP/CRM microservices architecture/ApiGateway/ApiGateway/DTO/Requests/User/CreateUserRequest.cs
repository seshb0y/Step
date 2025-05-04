namespace ApiGateway.DTO.Requests;

public record CreateUserRequest(string username, string password, string email);