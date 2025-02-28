namespace CRMSolution.Data.Models;

public class UserTask
{
    public Guid UserId { get; set; }
    public User User { get; set; }

    public Guid TaskId { get; set; }
    public Tasks Task { get; set; }
}