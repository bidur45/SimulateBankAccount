using Domain.Entities;
using Domain.Seed;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class SimulateBankAccountDbContext:DbContext
    {
        public SimulateBankAccountDbContext(DbContextOptions<SimulateBankAccountDbContext> options) : base(options)
        {
        }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<User> Users { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
             .HasData(SimulateBankAccountSeed.Users);
        }
    }
}
