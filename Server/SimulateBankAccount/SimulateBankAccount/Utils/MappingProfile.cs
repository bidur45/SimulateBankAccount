using AutoMapper;
using Domain.Entities;
using Presentation.DTO;
using System.Data;
using System.Reflection;

namespace Presentation.Utils
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<AccountRequestDTO, Account>().ReverseMap();
            CreateMap<AccountResponseDTO, Account>().ReverseMap();
            CreateMap<DepositWithdrawDTO, Account>().ReverseMap();
            CreateMap<UserCredDTO, User>().ReverseMap();
            CreateMap<UserInfoDTO, User>().ReverseMap();





        }


    }
}
