namespace Lumen.Api.Models;

public record RegisterRequest(string Name, string Email, string Password);

public record LoginRequest(string Email, string Password);

public record UserDto(int Id, string Name, string Email, DateTime CreatedAtUtc);

public record AuthResponse(UserDto User, string Token);

public record CreateOrderItemRequest(int ProductId, string ProductName, decimal Price, int Quantity);

public record CreateOrderRequest(int UserId, string ShippingAddress, List<CreateOrderItemRequest> Items);

public record OrderItemDto(int Id, int ProductId, string ProductName, decimal Price, int Quantity);

public record OrderDto(int Id, int UserId, decimal TotalAmount, string Status, string ShippingAddress, DateTime CreatedAtUtc, List<OrderItemDto> Items);
