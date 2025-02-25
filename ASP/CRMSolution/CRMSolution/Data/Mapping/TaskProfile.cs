using AutoMapper;
using CRMSolution.Data.Models;
using CRMSolution.DTO.Requests.Task;

namespace CRMSolution.Data.Mapping;

public class TaskProfile : Profile
{
    public TaskProfile()
    {
        CreateMap<CreateTaskRequest, Tasks>()
            .ForMember(dest => dest.Title, opt => opt
                .MapFrom(src => src.title))
            .ForMember(dest => dest.Description, opt => opt
                .MapFrom(src => src.description))
            .ForMember(dest => dest.DueDate, opt => opt
                .MapFrom(src => src.endDate))
            .ForMember(dest => dest.ClientId, opt => opt
                .MapFrom(src => src.clientId))
            .ForMember(dest => dest.AssignedToId, opt => opt
                .MapFrom(src => src.userId))
            .ForMember(dest => dest.OrderId, opt => opt
                .MapFrom(src => src.orderId));

        CreateMap<DeleteTaskRequest, Tasks>()
            .ForMember(dest => dest.Id, opt => opt
                .MapFrom(src => src.taskId));
        
        CreateMap<FindTaskRequest, Tasks>()
            .ForMember(dest => dest.Id, opt => opt
                .MapFrom(src => src.taskId));

        CreateMap<UpdateTaskRequest, Tasks>()
            .ForMember(dest => dest.Id, opt => opt
                .MapFrom(src => src.taskId))
            .ForMember(dest => dest.Description, opt => opt
                .MapFrom(src => src.description))
            .ForMember(dest => dest.Status, opt => opt
                .MapFrom(src => src.status));
    }
}