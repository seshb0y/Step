﻿namespace ControllerFirst.Models;

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Username { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
    public bool IsVerified { get; set; }
    
    public ICollection<UserRole> UserRoles { get; set; }
}