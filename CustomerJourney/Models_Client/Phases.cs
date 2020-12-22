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
        public PhasesDbo ConvertToDbo()
        {
            PhasesDbo phasesDbo = new PhasesDbo();
            phasesDbo.CompanyId = this.companyId;
            phasesDbo.Phases = CheckConvertPhasesArray(this.phaseList);
            return phasesDbo;
        }

        public Phases ConvertFromDbo(PhasesDbo dbo)
        {
            return new Phases(dbo.CompanyId, dbo.Phases.Split('*'));
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
