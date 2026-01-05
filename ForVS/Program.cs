using ContactBookWeb.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddRazorPages();

// Add Database Context
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer("Data Source=BANFF;Initial Catalog=Employees;Integrated Security=True;Trust Server Certificate=True;"));

var app = builder.Build();

// Test database connection on startup
try
{
    using (var scope = app.Services.CreateScope())
    {
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        var canConnect = context.Database.CanConnect();
        Console.WriteLine($"Database connection test: {(canConnect ? "SUCCESS" : "FAILED")}");

        if (canConnect)
        {
            var count = context.Contacts.Count();
            Console.WriteLine($"Found {count} contacts in database");
        }
    }
}
catch (Exception ex)
{
    Console.WriteLine($"Database error: {ex.Message}");
    Console.WriteLine($"Stack trace: {ex.StackTrace}");
}

app.UseStaticFiles();
app.UseRouting();
app.MapRazorPages();

app.Run();
