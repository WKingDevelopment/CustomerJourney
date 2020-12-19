using CustomerJourney.Models_Client;
using System;
using System.Collections.Generic;

#nullable disable

namespace CustomerJourney.ModelsDBO
{
    public partial class PhasesDBO
    {
        public int CompanyId { get; set; }
        public string Phases { get; set; }

        #region Constructors
        public PhasesDBO() { }
        public PhasesDBO(Phases _phases)
        {
            this.CompanyId = _phases.companyId;
            this.Phases = CheckConvertPhasesArray(_phases.phaseList);
        }
        #endregion

        #region Public Methods
        public Phases ConvertToClientObj()
        {
            return new Phases(this.CompanyId, this.Phases.Split("*"));
        }
        #endregion

        #region Private Methods
        private string CheckConvertPhasesArray(string[] phases)
        {
            foreach(string phase in phases)
            {
                phase.Trim('*');
            }
            return string.Join('*', phases);
        }
        #endregion
    }
}
