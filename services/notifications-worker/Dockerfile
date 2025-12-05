FROM mcr.microsoft.com/dotnet/runtime:8.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY services/notifications-shared/notifications-shared.csproj services/notifications-shared/
COPY services/notifications-worker/notifications-worker.csproj services/notifications-worker/
RUN dotnet restore services/notifications-worker/notifications-worker.csproj
COPY services/notifications-shared/ services/notifications-shared/
COPY services/notifications-worker/ services/notifications-worker/
WORKDIR /src/services/notifications-worker
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "notifications-worker.dll"]
