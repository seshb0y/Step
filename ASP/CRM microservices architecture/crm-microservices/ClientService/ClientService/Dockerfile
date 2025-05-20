
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY Crm.Grpc.Contracts/ Crm.Grpc.Contracts/
COPY ClientService/ ClientService/

RUN dotnet restore ./ClientService/ClientService/ClientService.csproj

WORKDIR /src/ClientService/ClientService
RUN dotnet publish ClientService.csproj -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
COPY ClientService/ClientService/appsettings.json ./appsettings.json
ENTRYPOINT ["dotnet", "ClientService.dll"]
