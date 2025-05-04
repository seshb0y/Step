namespace ApiGateway.DTO.Responses;

public record LoginResponse(string accessToken, string refreshToken);