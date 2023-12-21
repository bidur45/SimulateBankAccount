using Application.Interfaces;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class AccountService : IAccountService
    {

        private readonly IAccountRepository _accRepo;
        public AccountService(IAccountRepository accRepo)
        {
            _accRepo = accRepo;
        }

        public async Task<List<Account>> GetAccounts()
        {
            var accounts = await _accRepo.GetAccounts();
            return accounts;

        }
        public async Task<Account> SaveAccount(Account account)
        {
            try
            {
                var acct = await _accRepo.SaveAccount(account);
                return acct;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
