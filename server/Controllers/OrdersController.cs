using Lumen.Api.Data;
using Lumen.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Lumen.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController(AppDbContext dbContext) : ControllerBase
{
    private const decimal FreeShippingLimit = 45.0m;
    private const decimal StandardShippingFee = 4.99m;

    [HttpPost]
    public async Task<ActionResult<OrderDto>> Create(CreateOrderRequest request, CancellationToken cancellationToken)
    {
        if (request.UserId <= 0)
        {
            return BadRequest(new { message = "Valid user ID is required to place an order." });
        }

        var user = await dbContext.Users.FindAsync([request.UserId], cancellationToken);
        if (user == null)
        {
            return BadRequest(new { message = "User account not found. Please log in again." });
        }

        if (request.Items == null || request.Items.Count == 0)
        {
            return BadRequest(new { message = "Your cart cannot be empty." });
        }

        var subtotal = request.Items.Sum(item => item.Price * item.Quantity);
        var shipping = subtotal >= FreeShippingLimit ? 0m : StandardShippingFee;
        var totalAmount = subtotal + shipping;

        var order = new Order
        {
            UserId = request.UserId,
            ShippingAddress = string.IsNullOrWhiteSpace(request.ShippingAddress) ? "Standard Delivery" : request.ShippingAddress.Trim(),
            Status = "Confirmed",
            TotalAmount = totalAmount,
            CreatedAtUtc = DateTime.UtcNow,
            Items = request.Items.Select(item => new OrderItem
            {
                ProductId = item.ProductId,
                ProductName = item.ProductName,
                Price = item.Price,
                Quantity = item.Quantity
            }).ToList()
        };

        dbContext.Orders.Add(order);
        await dbContext.SaveChangesAsync(cancellationToken);

        var dto = new OrderDto(
            order.Id,
            order.UserId,
            order.TotalAmount,
            order.Status,
            order.ShippingAddress,
            order.CreatedAtUtc,
            order.Items.Select(i => new OrderItemDto(i.Id, i.ProductId, i.ProductName, i.Price, i.Quantity)).ToList()
        );

        return CreatedAtAction(nameof(GetById), new { id = order.Id }, dto);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<OrderDto>> GetById(int id, CancellationToken cancellationToken)
    {
        var order = await dbContext.Orders
            .AsNoTracking()
            .Include(o => o.Items)
            .FirstOrDefaultAsync(o => o.Id == id, cancellationToken);

        if (order == null)
        {
            return NotFound();
        }

        var dto = new OrderDto(
            order.Id,
            order.UserId,
            order.TotalAmount,
            order.Status,
            order.ShippingAddress,
            order.CreatedAtUtc,
            order.Items.Select(i => new OrderItemDto(i.Id, i.ProductId, i.ProductName, i.Price, i.Quantity)).ToList()
        );

        return Ok(dto);
    }

    [HttpGet("user/{userId:int}")]
    public async Task<ActionResult<IEnumerable<OrderDto>>> GetByUser(int userId, CancellationToken cancellationToken)
    {
        var orders = await dbContext.Orders
            .AsNoTracking()
            .Where(o => o.UserId == userId)
            .Include(o => o.Items)
            .OrderByDescending(o => o.CreatedAtUtc)
            .ToListAsync(cancellationToken);

        var dtos = orders.Select(order => new OrderDto(
            order.Id,
            order.UserId,
            order.TotalAmount,
            order.Status,
            order.ShippingAddress,
            order.CreatedAtUtc,
            order.Items.Select(i => new OrderItemDto(i.Id, i.ProductId, i.ProductName, i.Price, i.Quantity)).ToList()
        ));

        return Ok(dtos);
    }
}
