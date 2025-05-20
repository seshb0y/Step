
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY Crm.Grpc.Contracts/ Crm.Grpc.Contracts/
COPY OrderService/ OrderService/

RUN dotnet restore ./OrderService/OrderService/OrderService.csproj

WORKDIR /src/OrderService/OrderService
RUN dotnet publish OrderService.csproj -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
COPY OrderService/OrderService/appsettings.json ./appsettings.json
ENTRYPOINT ["dotnet", "OrderService.dll"]
