using System.Security.Cryptography;
using System.Text;
using Lumen.Api.Data;
using Lumen.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Lumen.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(AppDbContext dbContext) : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> Register(RegisterRequest request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return BadRequest(new { message = "Name is required." });
        }

        if (string.IsNullOrWhiteSpace(request.Email) || !request.Email.Contains('@'))
        {
            return BadRequest(new { message = "A valid email address is required." });
        }

        if (string.IsNullOrWhiteSpace(request.Password) || request.Password.Length < 6)
        {
            return BadRequest(new { message = "Password must be at least 6 characters long." });
        }

        var normalizedEmail = request.Email.Trim().ToLowerInvariant();

        var existingUser = await dbContext.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Email.ToLower() == normalizedEmail, cancellationToken);

        if (existingUser != null)
        {
            return Conflict(new { message = "An account with this email already exists." });
        }

        var saltBytes = RandomNumberGenerator.GetBytes(16);
        var hashBytes = Rfc2898DeriveBytes.Pbkdf2(
            Encoding.UTF8.GetBytes(request.Password),
            saltBytes,
            iterations: 100_000,
            hashAlgorithm: HashAlgorithmName.SHA256,
            outputLength: 32);

        var user = new User
        {
            Name = request.Name.Trim(),
            Email = normalizedEmail,
            PasswordSalt = Convert.ToBase64String(saltBytes),
            PasswordHash = Convert.ToBase64String(hashBytes),
            CreatedAtUtc = DateTime.UtcNow
        };

        dbContext.Users.Add(user);
        await dbContext.SaveChangesAsync(cancellationToken);

        var token = GenerateSimpleToken(user.Id, user.Email);
        var userDto = new UserDto(user.Id, user.Name, user.Email, user.CreatedAtUtc);

        return Ok(new AuthResponse(userDto, token));
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login(LoginRequest request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest(new { message = "Email and password are required." });
        }

        var normalizedEmail = request.Email.Trim().ToLowerInvariant();

        var user = await dbContext.Users
            .FirstOrDefaultAsync(u => u.Email.ToLower() == normalizedEmail, cancellationToken);

        if (user == null)
        {
            return Unauthorized(new { message = "Invalid email or password." });
        }

        var saltBytes = Convert.FromBase64String(user.PasswordSalt);
        var computedHash = Rfc2898DeriveBytes.Pbkdf2(
            Encoding.UTF8.GetBytes(request.Password),
            saltBytes,
            iterations: 100_000,
            hashAlgorithm: HashAlgorithmName.SHA256,
            outputLength: 32);

        var expectedHash = Convert.FromBase64String(user.PasswordHash);

        if (!CryptographicOperations.FixedTimeEquals(computedHash, expectedHash))
        {
            return Unauthorized(new { message = "Invalid email or password." });
        }

        var token = GenerateSimpleToken(user.Id, user.Email);
        var userDto = new UserDto(user.Id, user.Name, user.Email, user.CreatedAtUtc);

        return Ok(new AuthResponse(userDto, token));
    }

    [HttpGet("me")]
    public async Task<ActionResult<UserDto>> GetMe([FromHeader(Name = "Authorization")] string? authorization, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(authorization) || !authorization.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
        {
            return Unauthorized(new { message = "Not authenticated." });
        }

        var token = authorization["Bearer ".Length..].Trim();
        var userId = ParseUserIdFromToken(token);

        if (userId == null)
        {
            return Unauthorized(new { message = "Invalid session token." });
        }

        var user = await dbContext.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == userId.Value, cancellationToken);

        if (user == null)
        {
            return NotFound(new { message = "User not found." });
        }

        return Ok(new UserDto(user.Id, user.Name, user.Email, user.CreatedAtUtc));
    }

    private static string GenerateSimpleToken(int userId, string email)
    {
        var raw = $"{userId}:{email}:{DateTime.UtcNow.Ticks}:{Convert.ToHexString(RandomNumberGenerator.GetBytes(16))}";
        return Convert.ToBase64String(Encoding.UTF8.GetBytes(raw));
    }

    private static int? ParseUserIdFromToken(string token)
    {
        try
        {
            var raw = Encoding.UTF8.GetString(Convert.FromBase64String(token));
            var parts = raw.Split(':');
            if (parts.Length >= 2 && int.TryParse(parts[0], out var id))
            {
                return id;
            }
        }
        catch
        {
            // Ignore parse exceptions
        }
        return null;
    }
}
