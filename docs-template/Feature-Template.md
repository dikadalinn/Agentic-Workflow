# Feature: [Feature Name]
**Status:** [Draft / PM Enriched / Tech Architected]

## 1. Business Context (Owned by @business-analyst)
**Goal:** [What is the business value of this feature?]
**High-Level Flow:** [Step 1 -> Step 2 -> Step 3]

---

## 2. Product & UX Specs (Owned by @product-manager)
**User Stories & Acceptance Criteria:**
- **As a** [Persona], **I want to** [Action], **so that** [Benefit].
  - *AC1:* [Condition]
  - *AC2:* [Condition]

**UI Design Intent & States:**
> **Design Intent:** [How should this feel? e.g., "Dense and professional, prioritizing horizontal space."]
- **Normal State:** [Description]
- **Empty State:** [Description]
- **Error State:** [Description]

---

## 3. Technical Specs (Owned by @tech-lead)
**Database Schema Additions:**
| Table | Column | Type | Constraints |
| :--- | :--- | :--- | :--- |
| `[table_name]` | `[column_name]` | `[type]` | [e.g., Foreign Key] |

**API Endpoints:**
- `GET /api/[resource]`: [Purpose and Auth Requirements]
- `POST /api/[resource]`: [Expected payload format]
