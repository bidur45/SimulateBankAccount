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
    public class WithdrawalController : ControllerBase
    {
        private readonly IWithdrawalService _withDrawService;
        private readonly IMapper _mapper;
        public WithdrawalController(IWithdrawalService withdrawService, IMapper mapper)
        {
            _withDrawService = withdrawService;
            _mapper = mapper;

        }
        [HttpPost]
        public async Task<Response<DepositWithdrawDTO>> WithdrawalAmt(DepositWithdrawDTO withdraw)
        {
            try
            {
                var withdrawAmt = await _withDrawService.Withdraw(_mapper.Map<Account>(withdraw));
                return new Response<DepositWithdrawDTO>(_mapper.Map<DepositWithdrawDTO>(withdrawAmt), message: "Amount Successfully Withdraw!");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
