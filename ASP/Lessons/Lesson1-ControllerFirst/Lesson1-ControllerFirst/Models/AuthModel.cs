namespace Lesson1_ControllerFirst.Models;

public class AuthModel
{
    public Guid id {get;set;} = Guid.NewGuid();
    public string Username {get;set;}
    public string Password {get;set;}
    public string Email {get;set;}
}