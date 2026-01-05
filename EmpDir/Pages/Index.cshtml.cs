using EmployeeDirectory.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace EmployeeDirectory.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ApplicationDbContext _context;

        public IndexModel(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Employee> Employees { get; set; } = new List<Employee>();

        [BindProperty(SupportsGet = true)]
        public string SearchTerm { get; set; }

        public async Task OnGetAsync()
        {
            if (!string.IsNullOrWhiteSpace(SearchTerm))
            {
                Employees = await _context.Employees
                    .Where(e => (e.FirstName != null && e.FirstName.Contains(SearchTerm)) ||
                               (e.LastName != null && e.LastName.Contains(SearchTerm)) ||
                               (e.Title != null && e.Title.Contains(SearchTerm)) ||
                               (e.School != null && e.School.Contains(SearchTerm)))
                    .ToListAsync();
            }
            else
            {
                Employees = await _context.Employees.ToListAsync();
            }
        }
    }
}

