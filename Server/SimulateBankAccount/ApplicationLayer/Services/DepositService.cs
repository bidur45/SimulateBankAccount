using Application.Interfaces;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class DepositService:IDepositService
    {

        private readonly IDepositRepository _depositRepo;
        public DepositService(IDepositRepository depositRepo)
        {
            _depositRepo = depositRepo;
        }
        public async Task<Account> Deposit(Account account)
        {
            try
            {
                 var acc = await _depositRepo.Deposit(account);
                return account;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
