using System.Text;
using System.Text.Json.Serialization;
using ChineseELearningRestfulAPI.Application.Common.Interfaces;
using ChineseELearningRestfulAPI.Application.UseCases.APIKeys.CreateAPIKey;
using ChineseELearningRestfulAPI.Application.UseCases.APIKeys.DeleteAPIKey;
using ChineseELearningRestfulAPI.Application.UseCases.APIKeys.GetUserAPIKeys;
using ChineseELearningRestfulAPI.Application.UseCases.Auth;
using ChineseELearningRestfulAPI.Application.UseCases.Auth.Login;
using ChineseELearningRestfulAPI.Application.UseCases.Auth.Register;
using ChineseELearningRestfulAPI.Application.UseCases.Stories.CreateStoryFromTopic;
using ChineseELearningRestfulAPI.Application.UseCases.Stories.Generator;
using ChineseELearningRestfulAPI.Application.UseCases.Vocabularies.CreateVocabulary;
using ChineseELearningRestfulAPI.Application.UseCases.Vocabularies.DeleteVocabulary;
using ChineseELearningRestfulAPI.Application.UseCases.Vocabularies.GetAllVocabularyInList;
using ChineseELearningRestfulAPI.Application.UseCases.Vocabularies.GetVocabularyById;
using ChineseELearningRestfulAPI.Application.UseCases.Vocabularies.UpdateVocabulary;
using ChineseELearningRestfulAPI.Application.UseCases.VocabularyLists.CreateVocabularyList;
using ChineseELearningRestfulAPI.Application.UseCases.VocabularyLists.DeleteVocabularyList;
using ChineseELearningRestfulAPI.Application.UseCases.VocabularyLists.GetAllVocabularyList;
using ChineseELearningRestfulAPI.Application.UseCases.VocabularyLists.GetVocabularyListById;
using ChineseELearningRestfulAPI.Application.UseCases.VocabularyLists.UpdateVocabularyList;
using ChineseELearningRestfulAPI.Configuration;
using ChineseELearningRestfulAPI.Domain.Interfaces;
using ChineseELearningRestfulAPI.Infrastructure.Persistances;
using ChineseELearningRestfulAPI.Infrastructure.Security;
using ChineseELearningRestfulAPI.Infrastructure.Services;
using ChineseELearningRestfulAPI.Infrastructure.StoryGenerator;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });

    // Add Bearer token support in Swagger UI
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        BearerFormat = "JWT",
        Description = "Enter JWT Bearer token"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                new string[] {}
            }
        });
});

builder.Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                });
//Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
// JWT
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})

.AddJwtBearer(options =>
{
    var jwtSettings = builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>();

    if (jwtSettings == null)
    {
        throw new InvalidOperationException("JwtSettings configuration is missing.");
    }

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings.Issuer ?? throw new InvalidOperationException("Issuer is not configured in JwtSettings."),
        ValidAudience = jwtSettings.Audience ?? throw new InvalidOperationException("Audience is not configured in JwtSettings."),
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SecretKey ?? throw new InvalidOperationException("Secret is not configured in JwtSettings.")))
    };
});


//Prompt
builder.Services.Configure<PromptSettings>(builder.Configuration.GetSection("PromptSettings"));

//Repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAPIKeyRepository, APIKeyRepository>();
builder.Services.AddScoped<IVocabularyListRepository, VocabularyListRepository>();
builder.Services.AddScoped<IVocabularyRepository, VocabolaryRepository>();

//UsesCases
builder.Services.AddScoped<ILogin, Login>();
builder.Services.AddScoped<IRegister, Register>();
builder.Services.AddScoped<ICreateAPIKey, CreateAPIKey>();
builder.Services.AddScoped<IGetUserAPIKeys, GetUserAPIKeys>();
builder.Services.AddScoped<IDeleteAPIKey, DeleteAPIKey>();
builder.Services.AddScoped<GeminiStoryGenerator>();
builder.Services.AddScoped<ICreateStoryFromTopic, CreateStoryFromTopic>();
builder.Services.AddScoped<ICreateVocabularyList, CreateVocabularyList>();
builder.Services.AddScoped<IGetAllVocabularyList, GetAllVocabularyList>();
builder.Services.AddScoped<IGetVocabularyListById, GetVocabularyListById>();
builder.Services.AddScoped<IUpdateVocabularyList, UpdateVocabularyList>();
builder.Services.AddScoped<IDeleteVocabularyList, DeleteVocabularyList>();
builder.Services.AddScoped<IGetVocabularyById, GetVocabularyById>();
builder.Services.AddScoped<IGetAllVocabularyInList, GetAllVocabularyInList>();
builder.Services.AddScoped<ICreateVocabulary, CreateVocabulary>();
builder.Services.AddScoped<IDeleteVocabulary, DeleteVocabulary>();
builder.Services.AddScoped<IUpdateVocabulary, UpdateVocabulary>();



//Services
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();
builder.Services.AddScoped<IStoryGeneratorFactory, StoryGeneratorFactory>();
builder.Services.AddScoped<IJsonService, JsonService>();


//Http Client
builder.Services.AddHttpClient();


// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevCorsPolicy", policy =>
    {
        policy
            .SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("DevCorsPolicy");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();

app.Run();