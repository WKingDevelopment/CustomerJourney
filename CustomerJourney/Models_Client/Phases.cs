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
    }
}
