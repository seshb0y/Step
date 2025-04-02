namespace CRMSolution.Data.Models;

public class CallRecording
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public string Url { get; set; }

    public Order Order { get; set; }
}