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
    public class DepositController : ControllerBase
    {
        private readonly IDepositService _depositService;
        private readonly IMapper _mapper;
        public DepositController(IDepositService depositService, IMapper mapper)
        {
            _depositService = depositService;
            _mapper = mapper;

        }
        [HttpPost]
        public async Task<Response<DepositWithdrawDTO>> DepositAmt(DepositWithdrawDTO depo)
        {
            try
            {
                var depositAmt = await _depositService.Deposit(_mapper.Map<Account>(depo));
                return new Response<DepositWithdrawDTO>(_mapper.Map<DepositWithdrawDTO>(depositAmt), message: "Amount Successfully deposit!");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
