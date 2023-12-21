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
    public class WithdrawalRepository:IWithdrawalRepository
    {

        private readonly SimulateBankAccountDbContext _dbContext;

        public WithdrawalRepository(SimulateBankAccountDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Account> Withdrawal(Account account)
        {
            
            try
            {
                var acct = _dbContext.Accounts.SingleOrDefault(u => u.AcctNo == account.AcctNo);
                if (acct != null)
                {
                    if (acct.Balance >= account.Balance)
                    {
                        acct.Balance -= account.Balance;

                        await _dbContext.SaveChangesAsync();
                    }
                    else
                    {
                        throw new InvalidOperationException("Insufficient funds for withdrawal.");
                    }
                }
                await _dbContext.SaveChangesAsync();
                return account;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}
