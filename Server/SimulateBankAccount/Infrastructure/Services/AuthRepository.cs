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
    public class AuthRepository:IAuthRepository
    {
        private readonly SimulateBankAccountDbContext _dbContext;

        public AuthRepository(SimulateBankAccountDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        public async Task<User> AuthAsync(User usr)
        {
            try
            {
                var user =  _dbContext.Users.SingleOrDefault(u => u.UserName == usr.UserName && u.Password == usr.Password);
                return user;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
