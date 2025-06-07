namespace ApiGateway.DTO.Requests.Client;

public record HttpAddCommentRequest(int userId, int clientId, string comment);