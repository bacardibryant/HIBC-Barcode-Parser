using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Modulo43.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Barcode")]
    public class BarcodeController : Controller
    {
        // GET: api/Barcode
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Barcode/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }
        
        // POST: api/Barcode
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }
        
        // PUT: api/Barcode/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
