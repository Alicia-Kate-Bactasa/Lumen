namespace Lumen.Api.Models;

public class Product
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Slug { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public decimal Price { get; set; }

    public string ImageUrl { get; set; } = string.Empty;

    public string Category { get; set; } = "Matcha";

    public string CaffeineLevel { get; set; } = "Medium";

    public string TasteNotes { get; set; } = string.Empty;

    public int Sweetness { get; set; } = 5;

    public int Richness { get; set; } = 5;

    public int Freshness { get; set; } = 5;

    public int Toasted { get; set; } = 5;

    public int Floral { get; set; } = 5;

    public int WaterTempC { get; set; } = 80;

    public double SteepMinutes { get; set; } = 1;

    public double AmountTsp { get; set; } = 1;

    public string BrewingTip { get; set; } = string.Empty;

    public int StockQuantity { get; set; }

    public bool Featured { get; set; }

    public bool InStock { get; set; } = true;

    public DateTime CreatedAtUtc { get; set; }
}