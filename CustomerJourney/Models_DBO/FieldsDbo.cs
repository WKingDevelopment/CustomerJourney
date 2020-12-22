using System;
using System.Collections.Generic;

#nullable disable

namespace CustomerJourney.Models_DBO
{
    public partial class FieldsDbo
    {
        public int Id { get; set; }
        public int Seq { get; set; }
        public string MandatoryPhase { get; set; }
        public string Label { get; set; }
        public string Type { get; set; }
    }
}
