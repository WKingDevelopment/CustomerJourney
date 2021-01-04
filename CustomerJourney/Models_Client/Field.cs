using CustomerJourney.Models_DBO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerJourney.Models_Client
{
    public class Field : Session
    {
        public string mandatoryPhase { get; set; }
        public string label { get; set; }
        public string type { get; set; }
        public string size { get; set; }
        public bool summary { get; set; }

        #region Public Methods
        public FieldsDBO ConvertToDbo()
        {
            FieldsDBO fieldsDbo = new FieldsDBO();
            fieldsDbo.label = this.label;
            fieldsDbo.mandatoryPhase = this.mandatoryPhase;
            fieldsDbo.type = this.type;
            fieldsDbo.size = this.size;
            fieldsDbo.summary = this.summary;
            return fieldsDbo;
        }
        #endregion
    }
}
