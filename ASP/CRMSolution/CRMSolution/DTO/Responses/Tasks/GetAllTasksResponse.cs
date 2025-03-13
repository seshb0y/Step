using CRMSolution.Data.Models;

namespace ControllerFirst.DTO.Responses;

public class GetAllTasksResponse
{
    public List<Tasks> Tasks { get; set; }
}