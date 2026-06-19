# Remove existing tar file
Remove-Item -ErrorAction SilentlyContinue ".\build\quasar-webapp.tar"

# Create directory if it doesn't exist (assuming 'build' might not exist after a previous clean)
New-Item -ItemType Directory -Force -Path "build"

# Remove Docker image
docker rmi quasar-webapp:latest

# Build Docker image
docker image build --no-cache -t quasar-webapp:latest .

# Save Docker image to a tar file
# docker save -o ".\build\quasar-webapp.tar" quasar-webapp:latest

# Prune Docker builder cache
docker builder prune -f

Write-Host "* End"