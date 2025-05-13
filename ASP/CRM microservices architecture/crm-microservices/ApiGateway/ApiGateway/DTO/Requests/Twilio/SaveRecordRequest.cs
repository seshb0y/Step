namespace ApiGateway.DTO.Requests.Twilio;

public record SaveRecordRequest(int orderId, string callSid);