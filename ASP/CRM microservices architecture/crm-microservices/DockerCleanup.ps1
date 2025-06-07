# Проверка, установлен ли Docker
if (-not (Get-Command "docker" -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Docker не установлен или не найден в PATH." -ForegroundColor Red
    exit
}

Write-Host "`n🧊 Собираю информацию об использовании диска Docker...`n" -ForegroundColor Cyan
docker system df

Write-Host "`n⚠️ Это удалит ВСЕ неиспользуемые:" -ForegroundColor Yellow
Write-Host "- остановленные контейнеры"
Write-Host "- неиспользуемые образы"
Write-Host "- неиспользуемые volume'ы"
Write-Host "- build-кэш" 
Write-Host "`n"

$confirm = Read-Host "❓ Очистить всё это? (y/n)"
if ($confirm -ne 'y') {
    Write-Host "🚫 Отмена очистки." -ForegroundColor DarkYellow
    exit
}

Write-Host "`n🚀 Очистка Docker...`n" -ForegroundColor Green

# Останавливаем все контейнеры
docker stop $(docker ps -q) 2>$null

# Основная очистка
docker system prune -a --volumes -f

# Очистка build-кэша
docker builder prune -f

Write-Host "`n✅ Очистка завершена!" -ForegroundColor Green
docker system df
