namespace ApiGateway.DTO.Requests.Client;

public record ChangeDataClientRequest(string name, string newEmail, string phone, string address, string oldEmail);