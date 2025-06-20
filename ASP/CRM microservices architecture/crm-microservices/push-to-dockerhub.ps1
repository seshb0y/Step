$dockerUser = "seshb0y"

$projectName = "crm-microservices"

$services = @(
    "frontend",
    "twilioservice",
    "authservice",
    "clientservice",
    "orderservice",
    "taskservice",
    "apigateway"
)

foreach ($s in $services) {
    $service = $s.Trim()
    Write-Host "Service: '$service'" -ForegroundColor Cyan
    if ([string]::IsNullOrWhiteSpace($service)) {
        Write-Host "Пропускаю пустой элемент!" -ForegroundColor Red
        continue
    }
    $localTag = "$projectName-$service".ToLower()
    $remoteTag = "$dockerUser/$service`:latest"

    Write-Host "🏷 Tagging $localTag as $remoteTag" -ForegroundColor Yellow
    docker tag $localTag $remoteTag

    Write-Host "Pushing $remoteTag" -ForegroundColor Green
    docker push $remoteTag
}

Write-Host "Push completed successfully." -ForegroundColor Cyan
