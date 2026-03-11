---
name: dynamic-api-patterns
description: RESTful and real-time API design patterns for backend engineers. Use this skill when designing API contracts, implementing REST endpoints, handling pagination, versioning, WebSocket connections, or structuring standardized JSON responses. Covers error formats, authentication flows, and rate limiting patterns.
license: MIT
compatibility: opencode
---

# Dynamic API Patterns

Apply these patterns when designing or implementing APIs to ensure consistency, predictability, and scalability.

## REST Endpoint Conventions

```
GET    /v1/resources              → List (paginated)
GET    /v1/resources/:id          → Get single
POST   /v1/resources              → Create
PUT    /v1/resources/:id          → Full update (entire resource)
PATCH  /v1/resources/:id          → Partial update (specific fields only)
DELETE /v1/resources/:id          → Soft delete (set deleted_at)
```

Always version APIs with `/v1/` prefix. Never break v1 — create v2 for breaking changes.

## Standardized JSON Response Format

**Success:**
```json
{
  "data": { ... },
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 100,
    "total_pages": 5
  }
}
```

**Error:**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable message for the UI",
    "fields": {
      "email": "must be a valid email address",
      "name": "is required"
    }
  }
}
```

**Never** return raw error strings or stack traces to the client.

## HTTP Status Codes

| Situation | Status |
|---|---|
| Success (with body) | `200 OK` |
| Created successfully | `201 Created` |
| No content to return | `204 No Content` |
| Bad request / validation | `400 Bad Request` |
| Not authenticated | `401 Unauthorized` |
| Authenticated but forbidden | `403 Forbidden` |
| Resource not found | `404 Not Found` |
| Conflict (e.g. duplicate email) | `409 Conflict` |
| Unprocessable entity | `422 Unprocessable Entity` |
| Rate limited | `429 Too Many Requests` |
| Internal error | `500 Internal Server Error` |

## Pagination Pattern

Always paginate list endpoints. Use cursor-based pagination for large datasets:

```go
// Query params: ?page=1&per_page=20
type PaginationParams struct {
    Page    int `query:"page" validate:"min=1" default:"1"`
    PerPage int `query:"per_page" validate:"min=1,max=100" default:"20"`
}

func (p PaginationParams) Offset() int {
    return (p.Page - 1) * p.PerPage
}
```

## Request Validation Pattern

Always validate at the handler layer before calling the service:

```go
type CreateUserRequest struct {
    Name     string `json:"name" validate:"required,min=2,max=100"`
    Email    string `json:"email" validate:"required,email"`
    Password string `json:"password" validate:"required,min=8"`
}

func (h *UserHandler) CreateUser(c *gin.Context) {
    var req CreateUserRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(400, errorResponse("VALIDATION_ERROR", err))
        return
    }
    // delegate to service...
}
```

## Authentication Header Pattern

```
Authorization: Bearer <jwt_token>
```

JWT payload should include: `user_id`, `email`, `role`, `exp` (expiry), `iat` (issued at).

Middleware extracts and validates the token, injects `user_id` into request context:
```go
ctx := context.WithValue(r.Context(), UserIDKey, claims.UserID)
```

## Rate Limiting

Use Redis sorted sets for sliding window rate limiting:

```go
// Key: rate_limit:{user_id}:{endpoint}
// Score: unix timestamp in milliseconds
// Member: unique request ID
// Window: 60 seconds, max 100 requests
```

Always return `Retry-After` header when rate limited:
```
HTTP/1.1 429 Too Many Requests
Retry-After: 45
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1710000000
```

## WebSocket Real-Time Pattern

For real-time features (queues, live dashboards), use Redis pub/sub as the message bus:

```
Client → WebSocket handler → Redis pub/sub channel → Broadcast to all connected clients
```

Each WebSocket connection should:
1. Authenticate via JWT query param on connect (`?token=...`)
2. Subscribe to a user-scoped channel (`stream:{streamer_id}`)
3. Handle reconnection with exponential backoff on the client
4. Implement heartbeat ping/pong every 30 seconds
