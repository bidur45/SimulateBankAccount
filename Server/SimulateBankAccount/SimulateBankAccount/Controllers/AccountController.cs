using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Presentation.DTO;

namespace Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IMapper _mapper;
        public AccountController(IAccountService accountService, IMapper mapper)
        {
            _accountService = accountService;
            _mapper = mapper;

        }


        [HttpGet]
        public async Task<Response<List<AccountResponseDTO>>> getAccounts()
        {
            try
            {
                var account = await _accountService.GetAccounts();
                return new Response<List<AccountResponseDTO>>(_mapper.Map<List<AccountResponseDTO>>(account), true);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public async Task<Response<AccountRequestDTO>> SaveAccount(AccountRequestDTO checkpoint)
        {
            try
            {
                var createdAccount = await _accountService.SaveAccount(_mapper.Map<Account>(checkpoint));
                return new Response<AccountRequestDTO>(_mapper.Map<AccountRequestDTO>(createdAccount), message: "Account Successfully Created!");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
