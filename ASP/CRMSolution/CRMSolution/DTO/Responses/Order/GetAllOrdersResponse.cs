using CRMSolution.Data.Models;

namespace ControllerFirst.DTO.Responses;

public class GetAllOrdersResponse
{
    public List<Order> Orders { get; set; }
}