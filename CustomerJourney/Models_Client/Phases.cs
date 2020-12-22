using CustomerJourney.Models_DBO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerJourney.Models_Client
{
    public class Phases : Session
    {
        public string[] phaseList { get; set; }

        public Phases() { }
        public Phases(int _companyId, string[] _phases)
        {
            this.companyId = _companyId;
            this.phaseList = _phases;
        }

        #region Public Methods
        public PhasesDBO ConvertToDbo()
        {
            PhasesDBO phasesDbo = new PhasesDBO();
            phasesDbo.companyID = this.companyId;
            phasesDbo.phases = CheckConvertPhasesArray(this.phaseList);
            return phasesDbo;
        }
        #endregion

        #region Private Methods
        private string CheckConvertPhasesArray(string[] phases)
        {
            foreach (string phase in phases)
            {
                phase.Trim('*');
            }
            return string.Join('*', phases);
        }
        #endregion
    }
}
