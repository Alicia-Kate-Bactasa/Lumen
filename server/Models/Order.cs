namespace Lumen.Api.Models;

public class Order
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public User? User { get; set; }

    public decimal TotalAmount { get; set; }

    public string Status { get; set; } = "Confirmed";

    public string ShippingAddress { get; set; } = string.Empty;

    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;

    public List<OrderItem> Items { get; set; } = [];
}
