FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY services/notifications-shared/notifications-shared.csproj services/notifications-shared/
COPY services/notifications-api/notifications-api.csproj services/notifications-api/
RUN dotnet restore services/notifications-api/notifications-api.csproj
COPY services/notifications-shared/ services/notifications-shared/
COPY services/notifications-api/ services/notifications-api/
WORKDIR /src/services/notifications-api
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "notifications-api.dll"]
