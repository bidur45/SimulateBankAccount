using Application.Interfaces;
using Application.Services;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.Identity.Client;

namespace Presentation.Utils
{
    public static class ConfigureCoreServices
    {
        public static IServiceCollection AddCoreServices(this IServiceCollection services,
        IConfiguration configuration)
        {
            services.AddScoped<SimulateBankAccountDbContext>();
            services.AddAutoMapper(typeof(Program));
            services.AddHttpContextAccessor();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IDepositService, DepositService>();
            services.AddScoped<IWithdrawalService, WithdrawalService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddScoped<IDepositRepository, DepositRepository>();
            services.AddScoped<IWithdrawalRepository, WithdrawalRepository>();

            return services;
        }
    }
}
