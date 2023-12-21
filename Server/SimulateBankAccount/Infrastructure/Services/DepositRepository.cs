using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class DepositRepository: IDepositRepository
    {
        private readonly SimulateBankAccountDbContext _dbContext;

        public DepositRepository(SimulateBankAccountDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Account> Deposit(Account account)
        {
            try
            {
                var acct = _dbContext.Accounts.SingleOrDefault(u => u.AcctNo == account.AcctNo);
                if (acct != null)
                {
                    acct.Balance += account.Balance;

                }
                await _dbContext.SaveChangesAsync();
                return account;
            }
            catch(Exception ex) {
                throw ex;
            }

        }

    }
}
