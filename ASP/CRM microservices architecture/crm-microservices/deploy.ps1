# Parameters
$Namespace = "crm-system"
$ManifestDir = "k8s/"
$FrontendPath = "CRMFront"
$ImageName = "crm-microservices-frontend:latest"

Write-Host "Step 1: Connecting to Minikube docker daemon..."
& minikube -p minikube docker-env --shell powershell | Invoke-Expression

Write-Host "Step 2: Building frontend (npm run build)..."
Set-Location $FrontendPath

# Build the project
$npmBuildResult = npm run build

# Check for errors
if ($LASTEXITCODE -ne 0) {
    Write-Error "npm run build failed. Check the output above."
    exit 1
}

Write-Host "Build completed successfully."

Write-Host "Step 3: Building Docker image ($ImageName)..."
docker build -t $ImageName .

Set-Location ..

Write-Host "Step 4: Applying manifests from $ManifestDir..."
kubectl apply -n $Namespace -f $ManifestDir

Write-Host "Step 5: Restarting all deployments in namespace $Namespace..."
kubectl rollout restart deployment -n $Namespace

Write-Host "Step 6: Current pod status:"
kubectl get pods -n $Namespace

Write-Host "`nDone. Open http://crm.local"

pause
