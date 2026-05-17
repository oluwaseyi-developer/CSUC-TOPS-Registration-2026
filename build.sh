# Render Build Script
# This script is used by Render to build and publish the .NET application

dotnet publish src/CSUC.Registration.Api/CSUC.Registration.Api.csproj -c Release -o out
