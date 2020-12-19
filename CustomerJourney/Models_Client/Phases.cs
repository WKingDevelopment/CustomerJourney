using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerJourney.Models_Client
{
    public class Phases : Session
    {
        public string[] phases { get; set; }

        public Phases() { }
        public Phases(int _companyId, string[] _phases)
        {
            this.companyId = _companyId;
            this.phases = _phases;
        }
    }
}
