using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Account
    {
        [Key]
        public Guid AcctNo { get; set; }
        public string AccountHolderName { get; set; }   
        public decimal Balance { get; set; } 


    }
}
