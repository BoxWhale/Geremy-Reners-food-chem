using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Workspace_Razor.Pages;

// Class names needs to be unique across the project for each page
// The name needs to match the modelname delcared in the .cshtml file
public class ResultsModel : PageModel
{
    private readonly ILogger<ResultsModel> _logger;

    public ResultsModel(ILogger<ResultsModel> logger)
    {
        _logger = logger;
    }

    public void OnGet()
    {

    }
}
