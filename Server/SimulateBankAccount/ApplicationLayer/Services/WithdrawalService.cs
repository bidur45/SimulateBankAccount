using Application.Interfaces;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class WithdrawalService:IWithdrawalService
    {
        private readonly IWithdrawalRepository _withdrawRepo;
        public WithdrawalService(IWithdrawalRepository withdrawRepo)
        {
            _withdrawRepo = withdrawRepo;
        }
        public async Task<Account> Withdraw(Account account)
        {
            try
            {
                var acc = await _withdrawRepo.Withdrawal(account);
                return account;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
