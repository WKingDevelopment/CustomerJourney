using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerJourney.Models_Client
{
    public class Fields
    {
        public Field[] mainFields;
        public Field[] checklistFields;

        public Fields(Field[] _mainFields, Field[] _checklistFields)
        {
            this.mainFields = _mainFields;
            this.checklistFields = _checklistFields;
        }
    }
}
