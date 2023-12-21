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
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IMapper _mapper;
        public AuthController(IAuthService authService, IMapper mapper)
        {
            _authService = authService;
            _mapper = mapper;

        }
        [HttpPost]
        public async Task<Response<UserCredDTO>> AuthAmt(UserCredDTO user)
        {
            try
            {
                var usr = await _authService.AuthAsync(_mapper.Map<User>(user));
                if(usr != null)
                {
                    return new Response<UserCredDTO>(_mapper.Map<UserCredDTO>(usr), message: "Successfully logged in");

                }else
                {
                    return new Response<UserCredDTO>(_mapper.Map<UserCredDTO>(usr), message: "Invalid Login!");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //[HttpGet]
        //public async Task<Response<UserInfoDTO>> getUser()
        //{
        //    var usr = await _authService.GetUser();
        //    return new Response<UserInfoDTO>(_mapper.Map<UserInfoDTO>(usr));
        //}
    }
}
