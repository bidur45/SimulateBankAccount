using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class User:BaseEntity
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }


        public User() { }

        public User( string id ,string userName, string password, string name)
        {
            Id = Guid.Parse(id);
            UserName = userName;
            Password = password;
            Name = name;
        }
    }


}
