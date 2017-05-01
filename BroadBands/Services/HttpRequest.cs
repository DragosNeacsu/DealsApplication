using System.IO;
using System.Net;

namespace BroadBands.Services
{
    public class HttpRequest : IHttpRequest
    {
        public string GetRequest(string url)
        {
            var output = string.Empty;
            if (!string.IsNullOrEmpty(url))
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                HttpWebResponse webResponse = (HttpWebResponse)request.GetResponse();
                StreamReader reader = new StreamReader(webResponse.GetResponseStream());
                output = reader.ReadToEnd();
                reader.Close();
                webResponse.Close();
            }
            return output;
        }
    }
}