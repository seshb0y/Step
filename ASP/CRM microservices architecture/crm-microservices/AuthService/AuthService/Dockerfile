
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY Crm.Grpc.Contracts/ Crm.Grpc.Contracts/
COPY AuthService/ AuthService/

RUN dotnet restore ./AuthService/AuthService/AuthService.csproj

WORKDIR /src/AuthService/AuthService
RUN dotnet publish AuthService.csproj -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
COPY AuthService/AuthService/appsettings.json ./appsettings.json
ENTRYPOINT ["dotnet", "AuthService.dll"]
