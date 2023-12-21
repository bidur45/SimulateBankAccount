using AutoMapper;
using Infrastructure;
using Presentation.Utils;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

Dependencies.ConfigureServices(builder.Configuration, builder.Services);
builder.Services.AddCoreServices(builder.Configuration);

var mapperConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new MappingProfile());
});

IMapper mapper = mapperConfig.CreateMapper();

builder.Services.AddSingleton(mapper);
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


string AllowedOrigins = "APIOrigin";
builder.Services.AddCors(options =>
{
    options.AddPolicy(AllowedOrigins,
        policy =>
        {
            policy.WithOrigins("https://localhost:8000")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowAnyOrigin();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(AllowedOrigins);
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:8000"));
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
