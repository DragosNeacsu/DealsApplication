using BroadBands.Services;
using System.Configuration;
using System.Web.Mvc;

namespace BroadBands.Controllers
{
    public class DealsController : Controller
    {
        private readonly IHttpRequest _httpFeedRequest;

        public DealsController(IHttpRequest httpFeedRequest)
        {
            _httpFeedRequest = httpFeedRequest;
        }

        [HttpGet]
        public JsonResult GetDeals()
        {
            var dealsUrl = ConfigurationManager.AppSettings["DealsUrl"];
            var result = _httpFeedRequest.GetRequest(dealsUrl);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
