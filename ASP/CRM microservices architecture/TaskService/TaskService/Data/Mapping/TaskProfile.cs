using AutoMapper;
using TaskService.DTO.Responses;
using TaskService.Data.Models;
using TaskService.DTO.Requests.Task;
using TaskService.Data.Models;
using TaskService.DTO.Requests.Task;
using TaskService.DTO.Responses;
using CreateTaskRequest = CRMSolution.Grpc.Tasks.CreateTaskRequest;

namespace CRMSolution.Data.Mapping;

public class TaskProfile : Profile
{
    public TaskProfile()
    {
        CreateMap<HTTPCreateTaskRequest, TaskEntity>()
            .ForMember(dest => dest.Title, opt => opt
                .MapFrom(src => src.title))
            .ForMember(dest => dest.Description, opt => opt
                .MapFrom(src => src.description))
            .ForMember(dest => dest.DueDate, opt => opt
                .MapFrom(src => src.endDate))
            .ForMember(dest => dest.OrderId, opt => opt.Ignore());

        CreateMap<DeleteTaskRequest, TaskEntity>()
            .ForMember(dest => dest.Id, opt => opt
                .MapFrom(src => src.taskId));
        
        CreateMap<FindTaskRequest, TaskEntity>()
            .ForMember(dest => dest.Id, opt => opt
                .MapFrom(src => src.taskId));

        CreateMap<UpdateTaskRequest, TaskEntity>()
            .ForMember(dest => dest.Id, opt => opt
                .MapFrom(src => src.taskId))
            .ForMember(dest => dest.Description, opt => opt
                .MapFrom(src => src.description))
            .ForMember(dest => dest.Status, opt => opt
                .MapFrom(src => src.status));

        // CreateMap<TaskEntity, TaskResponse>()
        //     .ForMember(dest => dest.Id, opt => opt
        //         .MapFrom(src => src.Id))
        //     .ForMember(dest => dest.Title, opt => opt
        //         .MapFrom(src => src.Title))
        //     .ForMember(dest => dest.Description, opt => opt
        //         .MapFrom(src => src.Description))
        //     .ForMember(dest => dest.UserTasks, opt => opt
        //         .MapFrom(src => src.UserTasks))
        //     .ForMember(dest => dest.Order, opt => opt
        //         .MapFrom(src => src.Order));
        
        
    }
}