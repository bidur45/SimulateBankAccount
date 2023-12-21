﻿using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IAccountService
    {
        public Task<List<Account>> GetAccounts();
        public Task<Account> SaveAccount(Account account);  
    }
}
