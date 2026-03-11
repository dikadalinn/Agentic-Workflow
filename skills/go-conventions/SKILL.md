---
name: go-conventions
description: Idiomatic Go code conventions covering error handling, concurrency, naming, project structure, testing patterns, and performance optimization. Based on Google Go Style Guide, Uber Go Style Guide, and Effective Go. Use this skill when writing, reviewing, or refactoring Go backend code.
license: MIT
compatibility: opencode
---

# Idiomatic Go Conventions

You are a Senior Go Engineer. When writing or reviewing Go code, you MUST adhere to the following conventions derived from the Google Go Style Guide, Uber Go Style Guide, and Effective Go.

## Error Handling

Always wrap errors with context using `fmt.Errorf` and `%w`:

```go
// ✅ Correct
if err != nil {
    return fmt.Errorf("operation failed: %w", err)
}

// ❌ Wrong — loses error chain
if err != nil {
    return errors.New("operation failed")
}
```

Export sentinel errors for callers to match:

```go
var (
    ErrNotFound = errors.New("resource not found")
    ErrInvalid  = errors.New("invalid input")
)
```

Use `errors.Is()` and `errors.As()` for checking error types — never string comparison.

## Context Usage

Always pass `context.Context` as the **first parameter** in any function making external calls (DB, HTTP, Redis, etc.):

```go
// ✅ Correct
func (s *Service) DoThing(ctx context.Context, id int64) error {
    ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
    defer cancel()
    return s.repo.Find(ctx, id)
}
```

Never store context in a struct field. Never pass `nil` context — use `context.Background()` or `context.TODO()` at the top level.

## Concurrency

Use goroutines conservatively. Always ensure goroutines can be cancelled via context:

```go
// ✅ Start a goroutine with proper context propagation
go func(ctx context.Context) {
    select {
    case <-ctx.Done():
        return
    case result := <-workChan:
        process(result)
    }
}(ctx)
```

Prefer channels over shared memory. Use `sync.Mutex` only when channel approach is impractical. Always use `sync.WaitGroup` when coordinating multiple goroutines:

```go
var wg sync.WaitGroup
for _, item := range items {
    wg.Add(1)
    go func(i Item) {
        defer wg.Done()
        process(i)
    }(item)
}
wg.Wait()
```

Use `sync.Pool` for objects that are expensive to allocate and frequently reused (e.g., byte buffers).

## Naming Conventions

- **Interfaces**: Use `-er` suffix for single-method interfaces (`Reader`, `Writer`, `Storer`)
- **Structs**: PascalCase for exported, camelCase for unexported
- **Acronyms**: All caps (`HTTPClient`, `JSONParser`, `URLPath`)
- **Packages**: short, lowercase, no underscores (`httputil`, not `http_util`)
- **Receivers**: Short, 1-2 letter abbreviation of the type name (`s` for `Service`, `r` for `Repository`)

```go
// ✅ Correct
type UserStore interface {
    Save(ctx context.Context, u *User) error
}

type userRepository struct{ db *pgxpool.Pool }
func (r *userRepository) Save(ctx context.Context, u *User) error { ... }
```

## Project Structure

```
project/
├── cmd/
│   ├── api/              # HTTP server entry point (main.go)
│   └── worker/           # Background worker entry point
├── internal/
│   ├── domain/           # Business entities — no external dependencies
│   ├── repository/       # Data access layer (implements domain interfaces)
│   ├── service/          # Business logic (orchestrates repositories)
│   ├── handler/          # HTTP handlers (thin layer, delegates to service)
│   └── middleware/       # HTTP middleware
├── pkg/                  # Public reusable packages (safe to import externally)
├── migrations/           # SQL migration files
└── docs/                 # Architecture documentation
```

**Dependency direction**: `handler → service → repository → domain`. Never import upward (e.g., domain must not import service).

## Service Pattern

```go
type Service struct {
    repo   Repository
    cache  *redis.Client
    logger *zap.Logger
}

func (s *Service) Create(ctx context.Context, req CreateRequest) (*Response, error) {
    // 1. Validate input
    if err := req.Validate(); err != nil {
        return nil, fmt.Errorf("validation: %w", err)
    }
    // 2. Check cache
    if cached := s.cache.Get(ctx, cacheKey(req)); cached != nil {
        return cached, nil
    }
    // 3. Execute business logic
    result, err := s.repo.Create(ctx, req)
    if err != nil {
        return nil, fmt.Errorf("create: %w", err)
    }
    // 4. Invalidate related cache keys
    s.cache.Del(ctx, relatedKeys(req)...)
    return result, nil
}
```

## Testing Patterns

Always use **table-driven tests**:

```go
func TestService_Create(t *testing.T) {
    tests := []struct {
        name    string
        input   CreateRequest
        want    *Response
        wantErr error
    }{
        {"valid input", validReq, expectedResp, nil},
        {"missing name", missingNameReq, nil, ErrInvalid},
    }
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got, err := svc.Create(context.Background(), tt.input)
            if !errors.Is(err, tt.wantErr) {
                t.Errorf("got error %v, want %v", err, tt.wantErr)
            }
            if !reflect.DeepEqual(got, tt.want) {
                t.Errorf("got %v, want %v", got, tt.want)
            }
        })
    }
}
```

Use `testcontainers-go` for integration tests against real Postgres/Redis. Never mock the database in integration tests.

## Performance

- Run `go tool pprof` before optimizing — never guess
- Use `EXPLAIN ANALYZE` in Postgres for slow queries
- Use `pgxpool` for connection pooling (set `MaxConns` to 20-50)
- Batch inserts/updates instead of per-row operations
- Use `pipeline` for bulk Redis operations
- Set TTL on every Redis cache key — never store indefinitely
- Prefer `strings.Builder` over `+` concatenation in loops

## When to Ask for Clarification

Always ask before proceeding if:
- There are multiple valid architectural approaches (e.g., sync vs async processing)
- A security implication is unclear (e.g., auth scope, token expiry)
- A database schema change would affect multiple features
- An API contract change is being proposed (breaking vs non-breaking)

**Remember: A senior Go engineer knows what they don't know.**
