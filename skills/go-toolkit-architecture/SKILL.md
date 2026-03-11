---
name: go-toolkit-architecture
description: Go backend project scaffolding and clean architecture patterns. Use this skill when setting up a new Go service, defining its folder structure, wiring dependency injection, and establishing the layered architecture (handler → service → repository → domain). Covers entry points, middleware, config loading, and idiomatic Go project layout.
license: MIT
compatibility: opencode
---

# Go Toolkit Architecture

You are setting up or reviewing a Go backend project structure. Apply Clean Architecture principles strictly — dependencies must only point inward toward the domain.

## Canonical Project Structure

```
project/
├── cmd/
│   ├── api/
│   │   └── main.go          # HTTP server entry point. Wire all dependencies here.
│   └── worker/
│       └── main.go          # Background job runner entry point.
├── internal/
│   ├── domain/              # Pure business entities. NO external imports.
│   │   ├── user.go          # Entity structs and domain-level validation
│   │   └── errors.go        # Sentinel errors (ErrNotFound, ErrInvalid, etc.)
│   ├── repository/          # Data access. Implements domain interfaces.
│   │   ├── user_repo.go
│   │   └── postgres/        # Postgres-specific implementation
│   ├── service/             # Business logic. Orchestrates repositories.
│   │   └── user_service.go
│   ├── handler/             # HTTP handlers. Thin layer — parse, delegate, respond.
│   │   ├── user_handler.go
│   │   └── middleware/
│   │       ├── auth.go
│   │       ├── cors.go
│   │       └── logger.go
│   └── config/              # Config loading from env vars (via envconfig or viper)
│       └── config.go
├── pkg/                     # Public, reusable packages safe for external import
│   └── httputil/
├── migrations/              # SQL migration files (goose or atlas format)
│   ├── 001_create_users.sql
│   └── 002_add_sessions.sql
└── docs/                    # Architecture documentation (this project's docs/ dir)
```

## Dependency Rule (CRITICAL)

```
handler → service → repository → domain
```

- `domain` imports NOTHING from this project
- `repository` imports only `domain`
- `service` imports `domain` and `repository` (via interfaces)
- `handler` imports `service` (via interfaces)

**Never** import a package that is "above" you in the dependency chain.

## Entry Point Pattern (cmd/api/main.go)

```go
func main() {
    cfg := config.Load()                         // Load config from env
    db := postgres.Connect(cfg.DatabaseURL)      // Init DB pool
    cache := redis.NewClient(cfg.RedisURL)       // Init Redis

    userRepo := repository.NewUserRepo(db)       // Init repositories
    userSvc := service.NewUserService(userRepo, cache) // Init services
    userHandler := handler.NewUserHandler(userSvc)     // Init handlers

    router := gin.New()
    router.Use(middleware.Logger(), middleware.CORS())
    handler.RegisterRoutes(router, userHandler)

    log.Fatal(http.ListenAndServe(":"+cfg.Port, router))
}
```

## Config Pattern

Always load config from environment variables. Use `envconfig` or `viper`:

```go
type Config struct {
    Port        string `env:"PORT" envDefault:"8080"`
    DatabaseURL string `env:"DATABASE_URL,required"`
    RedisURL    string `env:"REDIS_URL" envDefault:"localhost:6379"`
    JWTSecret   string `env:"JWT_SECRET,required"`
}

func Load() Config {
    var cfg Config
    if err := envconfig.Process("", &cfg); err != nil {
        log.Fatalf("config: %v", err)
    }
    return cfg
}
```

## Middleware Standards

Always include these middleware in order:
1. `RequestID` — attach a unique ID to every request for tracing
2. `Logger` — structured log with method, path, status, duration
3. `Recovery` — catch panics, return 500
4. `CORS` — configure allowed origins from config, not hardcoded
5. `Auth` — JWT validation on protected routes only

## Interface-First Design

Define interfaces in the consumer package, not the implementation package:

```go
// In service package — defines what it needs from the repository
type UserRepository interface {
    Create(ctx context.Context, u *domain.User) error
    GetByID(ctx context.Context, id int64) (*domain.User, error)
    GetByEmail(ctx context.Context, email string) (*domain.User, error)
}
```

This keeps packages loosely coupled and makes testing trivial (mock the interface).
