using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Seed
{
    public static class SimulateBankAccountSeed
    {
        public static List<User> Users = new List<User>()
        {
        new User("05a9b8bd-e08b-4493-b7fd-f47602b63ca8", "testUser345@gmail.com", "testUser123","Test User"),
    };
    }
}
