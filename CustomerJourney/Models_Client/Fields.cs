using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerJourney.Models_Client
{
    public class Fields
    {
        Field[] mainFields;
        Field[] checklistFields;

        public Fields(Field[] _mainFields, Field[] _checklistFields)
        {
            this.mainFields = _mainFields;
            this.checklistFields = _checklistFields;
        }
    }
}
