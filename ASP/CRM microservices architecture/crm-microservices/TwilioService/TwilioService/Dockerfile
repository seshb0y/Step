
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY Crm.Grpc.Contracts/ Crm.Grpc.Contracts/
COPY TwilioService/ TwilioService/

RUN dotnet restore ./TwilioService/TwilioService/TwilioService.csproj

WORKDIR /src/TwilioService/TwilioService
RUN dotnet publish TwilioService.csproj -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
COPY TwilioService/TwilioService/appsettings.json ./appsettings.json
ENTRYPOINT ["dotnet", "TwilioService.dll"]
