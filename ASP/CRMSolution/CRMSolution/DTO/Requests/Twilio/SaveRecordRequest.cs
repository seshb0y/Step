namespace CRMSolution.DTO.Requests.Twilio;

public record SaveRecordRequest(int orderId, string callSid);