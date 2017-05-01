using System.Web.Hosting;
using System.Web.Mvc;

namespace BroadBands.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Logo = System.IO.File.ReadAllText(HostingEnvironment.MapPath(@"~/Content/logo.txt"));
            return View();
        }
    }
}
