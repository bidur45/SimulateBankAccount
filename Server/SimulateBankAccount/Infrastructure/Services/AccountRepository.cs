using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class AccountRepository:IAccountRepository
    {
        private readonly SimulateBankAccountDbContext _dbContext;

        public AccountRepository(SimulateBankAccountDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Account>> GetAccounts()
        {
            var account =  _dbContext.Accounts.ToList();
            return account;
        }


        public async Task<Account> SaveAccount(Account account)
        {
             _dbContext.Accounts.Add(account);
              await _dbContext.SaveChangesAsync();
            return account;
        }
    }
}
