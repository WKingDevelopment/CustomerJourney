using System;
using System.Collections.Generic;

#nullable disable

namespace CustomerJourney.Models_DBO
{
    public partial class FieldsDBO
    {
        public int id { get; set; }
        public int companyId { get; set; }
        public int seq { get; set; }
        public string mandatoryPhase { get; set; }
        public string label { get; set; }
        public string type { get; set; }
        public bool summary { get; set; }
    }
}
