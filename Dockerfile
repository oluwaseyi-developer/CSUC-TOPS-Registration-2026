FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["src/CSUC.Registration.Api/CSUC.Registration.Api.csproj", "CSUC.Registration.Api/"]
COPY ["src/CSUC.Registration.Application/CSUC.Registration.Application.csproj", "CSUC.Registration.Application/"]
COPY ["src/CSUC.Registration.Domain/CSUC.Registration.Domain.csproj", "CSUC.Registration.Domain/"]
COPY ["src/CSUC.Registration.Infrastructure/CSUC.Registration.Infrastructure.csproj", "CSUC.Registration.Infrastructure/"]
RUN dotnet restore "CSUC.Registration.Api/CSUC.Registration.Api.csproj"
COPY src/ .
WORKDIR "/src/CSUC.Registration.Api"
RUN dotnet build "CSUC.Registration.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CSUC.Registration.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CSUC.Registration.Api.dll"]
