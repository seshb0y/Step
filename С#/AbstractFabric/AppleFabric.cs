using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbstractFabric
{
    internal class AppleFabric : IFabric
    {
        public IButton CreateButton() => new AppleButton();

        public ICase CreateCase() => new AppleCase();

        public IPhone CreatePhone() => new ApplePhone();
        public IProcessor CreateProcessor() => new AppleProcessor();

        public IScreen CreateScreen() => new AppleScreen();
    }
}
