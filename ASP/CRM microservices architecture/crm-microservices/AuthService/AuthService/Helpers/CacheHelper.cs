using System.Text.Json;
using Microsoft.Extensions.Caching.Distributed;

namespace ClientService.Helpers;

public class CacheHelper
{
    private readonly ILogger<CacheHelper> _logger;
    private readonly IDistributedCache _cache;

    public CacheHelper(IDistributedCache cache, ILogger<CacheHelper> logger)
    {
        _cache = cache;
        _logger = logger;
    }


    public async Task<T?> GetAsync<T>(string key)
    {
        var cached = await _cache.GetStringAsync(key);
        if (cached == null) return default;

        try
        {
            return JsonSerializer.Deserialize<T>(cached);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Ошибка при десериализации кэша {Key}", key);
            return default;
        }
    }
    
    public async Task SetAsync<T>(string key, T data, TimeSpan? ttl = null)
    {
        var options = new DistributedCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = ttl ?? TimeSpan.FromMinutes(5)
        };

        var json = JsonSerializer.Serialize(data);
        await _cache.SetStringAsync(key, json, options);
    }

    public async Task RemoveAsync(string key)
    {
        await _cache.RemoveAsync(key);
    }
}