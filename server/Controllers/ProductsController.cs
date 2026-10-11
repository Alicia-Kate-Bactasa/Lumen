using Lumen.Api.Data;
using Lumen.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Lumen.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(AppDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetAll(CancellationToken cancellationToken)
    {
        var products = await dbContext.Products
            .AsNoTracking()
            .OrderBy(product => product.Name)
            .ToListAsync(cancellationToken);

        return Ok(products);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Product>> GetById(int id, CancellationToken cancellationToken)
    {
        var product = await dbContext.Products.AsNoTracking().FirstOrDefaultAsync(product => product.Id == id, cancellationToken);

        return product is null ? NotFound() : Ok(product);
    }

    [HttpPost]
    public async Task<ActionResult<Product>> Create(Product product, CancellationToken cancellationToken)
    {
        product.CreatedAtUtc = DateTime.UtcNow;

        dbContext.Products.Add(product);
        await dbContext.SaveChangesAsync(cancellationToken);

        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<Product>> Update(int id, Product product, CancellationToken cancellationToken)
    {
        var existing = await dbContext.Products.FirstOrDefaultAsync(item => item.Id == id, cancellationToken);

        if (existing is null)
        {
            return NotFound();
        }

        existing.Name = product.Name;
        existing.Slug = product.Slug;
        existing.Description = product.Description;
        existing.Price = product.Price;
        existing.ImageUrl = product.ImageUrl;
        existing.Category = product.Category;
        existing.CaffeineLevel = product.CaffeineLevel;
        existing.TasteNotes = product.TasteNotes;
        existing.Sweetness = product.Sweetness;
        existing.Richness = product.Richness;
        existing.Freshness = product.Freshness;
        existing.Toasted = product.Toasted;
        existing.Floral = product.Floral;
        existing.WaterTempC = product.WaterTempC;
        existing.SteepMinutes = product.SteepMinutes;
        existing.AmountTsp = product.AmountTsp;
        existing.BrewingTip = product.BrewingTip;
        existing.StockQuantity = product.StockQuantity;
        existing.Featured = product.Featured;
        existing.InStock = product.InStock;

        await dbContext.SaveChangesAsync(cancellationToken);

        return Ok(existing);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        var existing = await dbContext.Products.FirstOrDefaultAsync(item => item.Id == id, cancellationToken);

        if (existing is null)
        {
            return NotFound();
        }

        dbContext.Products.Remove(existing);
        await dbContext.SaveChangesAsync(cancellationToken);

        return NoContent();
    }
}