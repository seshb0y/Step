namespace ApiGateway.DTO.Requests.Client;

public record CreateClientRequest(string name, string email, string phone, string address);