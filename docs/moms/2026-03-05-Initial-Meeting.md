# 📝 Minutes of Meeting & PRD Brief

**Project / Client:** Frens MVP  
**Date:** 2026-03-05
**Location / Link:** Google Meet  

## 👥 Attendees
**Enigma Ventures:** Andika Leonardo Surya (Project Lead)
**Client:** Frens (Product Owner / Stakeholders)

---

## 🎯 Platform Definition & Core Objective
**Frens** is a song request and donation platform tailored specifically for streamers, heavily focused on the "just-chatting" and interactive livestreaming niche. 

---

## 🎨 UI/UX & Design Direction
* **Visual Tone:** Friendly, approachable, yet premium and modern.
* **Primary Accent Color:** Premium Modern Orange.
* **Development Strategy:** **Frontend-First Approach**. The MVP will focus entirely on building out the UI/frontend to facilitate immediate User Testing and validation. Backend and Database integration will follow post-validation to prevent back-and-forth development cycles.

---

## 🛠️ Technical Constraints & API Strategy
* **Infrastructure Cost:** Strictly **$0** for the MVP phase.
* **Payment Gateway:** Implementation of a **Mock Payment Gateway** for the MVP. No real integration until user validation is complete.
* **Music Engine:** **YouTube Music Integration** (Executed technically via YouTube Data API v3 for search filtering and YouTube IFrame Player API for frontend playback). Make sure it only fetch the "music" category type of video.

---

## 🧑‍💻 User Roles & Stories (Requirements)

### Role 1: Streamer
*As a Streamer, I want to...*
1. **Landing Page:** View a dedicated landing page explaining Frens' value proposition.
2. **Authentication:** Register and verify my account via email.
3. **Authentication:** Log in to my account securely.
4. **Onboarding:** Complete a profile setup onboarding flow seamlessly after registration/login.
5. **Analytics (Total Donations):** View a dashboard to see the total amount of donations collected.
6. **Analytics (Total Donors):** View a dashboard to see the total number of unique donors.
7. **Analytics (Profile Visits):** View a dashboard to see the total number of visitors to my public profile.
8. **Analytics (Top Songs):** View a dashboard to see the most frequently requested songs.
9. **Analytics (Time-Series):** Interact with a time-series chart that toggles between traffic/visits and donation amounts.
10. **OBS Customization (Alerts):** Configure and customize donation alert overlays to embed in OBS.
11. **OBS Customization (Player & Queue):** Configure and customize the music player and request queue list overlay for OBS.
12. **OBS Customization (Leaderboard):** Configure and customize a top-donor leaderboard overlay for OBS.
13. **OBS Customization (Custom):** Set up custom overlay visuals.
14. **Player Management:** Control the music player directly from my dashboard (play, pause, skip).
15. **Queue Management:** Manage the song request queue list.
16. **Donation Settings:** Configure donation options and minimum amounts.
17. **Queue Sorting Rules:** Set the queue priority rules (e.g., "First In, First Out" vs. "Highest Donation Amount Plays First").

### Role 2: Viewer
*As a Viewer, I want to...*
1. **Profile Access:** Access a streamer's public profile page completely friction-free, **without logging in**.
2. **Search:** Search for a specific song to request via the streamer's public profile, **without logging in**.
3. **Selection:** Select a song from the search results to initiate a request, **without logging in**.
4. **Checkout:** Complete a donation for the selected song, attach a custom message, and process the (mock) payment from the public profile, **without logging in**.

---

## 🚀 Next Action Items (Frontend Focus)
| Task / To-Do | Phase | Status |
| :--- | :--- | :--- |
| Develop UI: Streamer Landing Page & Auth Flow | Frontend | ⏳ To Do |
| Develop UI: Streamer Analytics Dashboard & Settings | Frontend | ⏳ To Do |
| Develop UI: Viewer Public Profile & Search/Mock Checkout | Frontend | ⏳ To Do |
| Develop UI: OBS Overlays (Player, Alerts, Leaderboard) | Frontend | ⏳ To Do |
| Conduct User Testing with Streamers | Validation | ⏳ To Do |