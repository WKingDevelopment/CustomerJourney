using CustomerJourney.Models_Client;
using System;
using System.Collections.Generic;

#nullable disable

namespace CustomerJourney.Models_DBO
{
    public partial class FieldsDBO : Field
    {
        public int id { get; set; }
        public int seq { get; set; }
        public string size { get; set; }
        public bool summary { get; set; }
    }
}
