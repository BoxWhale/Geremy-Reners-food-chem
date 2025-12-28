using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace Workspace_Razor.Pages.Opgaver
{
    public class Opgave6 : PageModel
    {
        private readonly ILogger<Opgave6> _logger;

        public Opgave6(ILogger<Opgave6> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}