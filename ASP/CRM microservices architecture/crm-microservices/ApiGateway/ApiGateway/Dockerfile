
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY Crm.Grpc.Contracts/ Crm.Grpc.Contracts/
COPY ApiGateway/ ApiGateway/

RUN dotnet restore ./ApiGateway/ApiGateway/ApiGateway.csproj

WORKDIR /src/ApiGateway/ApiGateway
RUN dotnet publish ApiGateway.csproj -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
COPY ApiGateway/ApiGateway/appsettings.json ./appsettings.json
ENTRYPOINT ["dotnet", "ApiGateway.dll"]
