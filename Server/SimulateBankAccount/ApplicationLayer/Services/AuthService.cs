using Application.Interfaces;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class AuthService:IAuthService
    {
        private readonly IAuthRepository _authRepo;
        public AuthService(IAuthRepository authRepo) {
        _authRepo = authRepo;
        }

        public async Task<User> AuthAsync(User user)
        {
            try
            {
                user =  await _authRepo.AuthAsync(user);
                return user;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //public async Task<User> GetUser()
        //{
        //    User   user = new User();    
        //    return user;
        //}
    }
}
