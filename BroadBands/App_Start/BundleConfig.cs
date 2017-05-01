using System.Web.Optimization;

namespace BroadBands
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/bundles/style").Include(
                        "~/Content/Styles/style.css"));

            bundles.Add(new ScriptBundle("~/bundles/angularjs").Include(
                        "~/Content/Scripts/angular.js"));

            bundles.Add(new ScriptBundle("~/bundles/myApp").Include(
                        "~/Content/Static/app.js",
                        "~/Content/Static/services/rest-client.js"));
        }
    }
}