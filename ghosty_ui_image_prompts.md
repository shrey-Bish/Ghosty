# Ghosty — GPT Image Generation Prompts
### UI Screen Reference Images for Kiro Build
**Usage:** Generate each prompt separately in GPT-4o image generation. Feed resulting images into Kiro as UI reference with the instruction: "Build this screen exactly as shown — match the colors, layout, typography weight, spacing, and component hierarchy."

---

## Design System (Apply to ALL Screens)
- **Background:** Near-black deep slate `#0D1117`
- **Card surfaces:** Slightly elevated dark `#161B22` with hairline borders `rgba(255,255,255,0.08)`
- **Primary accent:** Warm amber `#F59E0B` — high-value connections, CTA buttons, fire emoji states
- **Secondary accent:** Teal `#14B8A6` — medium value, confirmed states, progress
- **Danger/Record:** Vivid rose-red `#F43F5E` — active recording, overdue alerts
- **Primary text:** Near-white `#F0F0EE`
- **Secondary text:** Muted gray `#8B8E98`
- **Font style:** Geometric sans-serif, heavy weight for numbers, medium for headings, regular for body
- **Card radius:** 24px large, 16px medium, 8px small
- **Overall vibe:** Premium dark mobile app — like Revolut or Linear meets a conference networking tool

---

## Screen 01 — Splash / Brand Identity

```
A stunning mobile app splash screen for an app called "Ghosty" — a dark, premium conference networking app. Ultra dark background (#0D1117 deep slate near-black). Centered layout. A large abstract logo mark: a soft glowing ghost silhouette made of smooth, rounded negative space, with a single warm amber gradient glow radiating from its center like a warmth source in darkness. Below the logo, the word "GHOSTY" in a bold geometric sans-serif font, tightly tracked, near-white color. Below that, the tagline "Never let a great conversation ghost you." in small, spaced-out muted gray text. At the very bottom: a soft frosted glass button reading "Get Started →" in amber color. The entire screen has an extremely subtle noise grain texture overlay and a very faint amber vignette glow at the center bottom. Photorealistic mobile UI mockup on iPhone 15 Pro in a dark environment. Ultra-clean, no clutter. 9:19.5 portrait aspect ratio.
```

---

## Screen 02 — Home / Capture Screen (Idle State)

```
A premium dark mobile app home screen for "Ghosty" — a conference networking voice capture app. Ultra dark background (#0D1117). Top section: small "Ghosty" wordmark left-aligned, a small circular user avatar top right. Below: today's event name "ASU Kiro Spark Challenge" in medium amber text, below that the date "Friday, April 24" in muted gray. Center of screen: an enormous circular microphone button, approximately 200px diameter, dark elevated card surface with a hairline amber border, a sleek microphone icon inside in near-white. Around the button: three concentric subtle pulsing rings in amber color with decreasing opacity (0.3, 0.15, 0.05) suggesting a gentle idle animation. Below the button: "Tap to capture a connection" in muted gray italic text. Bottom section: a horizontal stat row showing "3 contacts today" (teal number), "2 followed up" (checkmark), "1 at risk" (small red dot + number). Bottom navigation bar: 4 icons (home active in amber, contacts, dashboard, settings) on a slightly elevated dark surface. iPhone 15 Pro mockup. Hyper-realistic mobile UI. 9:19.5 portrait.
```

---

## Screen 03 — Recording Active State

```
A dramatic mobile app screen showing active voice recording for "Ghosty" conference networking app. Ultra dark (#0D1117) background. The entire screen feels alive and urgent. Top: small "Recording..." label in rose-red (#F43F5E) with a pulsing red dot indicator. Center: the circular microphone button is now fully transformed — glowing rose-red, larger, with intense multiple concentric red pulse rings radiating outward like a heartbeat, each ring animated at different speeds. The button color is a deep red with a subtle radial gradient. Below the button: a real-time audio waveform visualization — a horizontal row of vertical bars varying in height (tall in center, tapering at edges) in rose-red color that react to voice input, like a live EQ. Below the waveform: a timer "0:14" in large bold near-white monospace text. Below timer: "Speak freely — Ghosty is listening" in small muted gray text. Top-left corner: a small "✕ Cancel" text button in muted gray. The background has a very subtle deep red vignette bloom around the edges to signal urgency. iPhone 15 Pro mockup, hyper-realistic dark UI. 9:19.5 portrait.
```

---

## Screen 04 — AI Processing / Thinking State

```
A beautiful mobile app loading/processing screen for "Ghosty" conference networking app. Ultra dark (#0D1117) background. Center of screen: a medium circular loader, not a spinner but a smooth pulsing orb — an amber glowing sphere about 80px that slowly breathes in scale and opacity. Inside the orb center: a tiny ghost icon outline in near-white. Below the orb: the text "Ghosty is thinking..." in medium-weight near-white font, 18px. Below that: three dot-step indicators showing process stages, currently highlighted on step 2: "✓ Transcribed  →  ● Extracting  →  ○ Scoring" — completed steps in teal with checkmarks, current step in amber, pending in gray. Below the steps: a muted gray italic hint text "Usually takes 2–3 seconds" in 13px. The background has a very faint, slow-moving amber particle drift — like 6-8 tiny warm dots floating lazily upward. Bottom 30% of screen: a blurred dark card shape rising from the bottom suggesting a contact card is materializing, its content blurred/frosted, building anticipation. iPhone 15 Pro mockup, cinematic dark UI feel. 9:19.5 portrait.
```

---

## Screen 05 — Contact Card Swipe to Confirm

```
A stunning mobile swipe-card UI for "Ghosty" conference networking app. Ultra dark (#0D1117) background. Main element: a large swipe card dominating the center of the screen, slightly elevated above the background with a subtle upward drop shadow in amber. Card surface: dark (#161B22) with 24px radius corners and hairline amber border. Card content (top to bottom inside the card): A row with a large auto-generated avatar circle (initials "PK" in amber text on dark amber background), next to: name "Priya Kumar" in bold 20px near-white, below it "Senior PM · Stripe" in 14px muted gray. A teal pill badge: "#recruiting". A horizontal divider hairline. Below: "Connection Value" label in 12px muted gray, and a large "9.2 / 10" score in 28px bold amber with a 🔥 emoji. Below the score: 3 small detail chips in rounded dark pill shapes: "→ Follow up after May 15" · "Consumer growth · SF" · "Knows data team HM". Card bottom: two action buttons side by side — left: muted gray "↩ Re-record" with subtle border, right: glowing amber "Confirm →" button. Outside the card at the very bottom: small gray text "Swipe right to confirm · Swipe left to re-record". Subtle left/right gradient hints at edges suggesting swipeable card. iPhone 15 Pro mockup. 9:19.5 portrait.
```

---

## Screen 06 — Connection Value Score Breakdown

```
A premium mobile detail screen for "Ghosty" — showing a transparent connection value score breakdown. Ultra dark (#0D1117) background. Top: a back arrow and "Connection Value" as page title in bold near-white. Large hero section: circular gauge chart (donut style) — dark circle background, amber arc filling 92% of the ring, large "9.2" in 36px bold amber at center with "out of 10" in 12px gray below it. Below the gauge: the label "🔥 High Priority Connection" in amber. Horizontal separator line. Section titled "Score Breakdown" in 12px uppercase muted gray. Below: 5 rows of scoring factors, each row showing: a factor icon (small geometric), factor name in near-white, a small horizontal progress bar (dark background, filled portion in amber to teal gradient), and the points value right-aligned. Rows: "Role Seniority: Senior PM → 2.8/3.0" · "Company Tier: Stripe → 2.0/2.0" · "Opportunity Type: Recruiting → 2.0/2.0" · "Career Relevance: Product/Growth → 1.8/2.0" · "Recency Bonus: Today → 1.0/1.0". Below: a small teal info note: "Score decays 10% per week without follow-up". Bottom: full-width amber button "Draft Follow-up Message →". iPhone 15 Pro mockup. 9:19.5 portrait.
```

---

## Screen 07 — Follow-up Priority Queue

```
A sleek mobile list screen for "Ghosty" — showing today's follow-up priority queue. Ultra dark (#0D1117) background. Top: page title "Follow Up" in bold near-white 22px. Below title: two tab pills — "Today  3" (amber, selected) and "This Week  8" (gray, unselected). Section label: "High Priority" in small uppercase amber 11px with a flame icon. Three contact cards stacked vertically (each card slightly elevated, dark #161B22, 16px radius, 1px hairline border): Card 1 (Urgent): left side avatar "PK", right side: name bold "Priya Kumar", company/role in gray "Senior PM · Stripe", below: a red urgency chip "Due in 4 hours", right: connection score "9.2" in amber. Card 2: avatar "WC", name "Wei Chen", "VP Eng · Google", chip "Due tomorrow" in amber, score "8.7". Card 3: avatar "MR", name "Marcus Reed", "Founder · DevSeed", chip "Due in 3 days" in teal, score "7.4". Each card has a small right chevron arrow. Below the three cards: section label "Medium Priority" in gray. Two more partially visible cards below to suggest scrollability. Very top right: a small filter icon in muted gray. Bottom nav bar with "Follow Up" tab active in amber. iPhone 15 Pro mockup. 9:19.5 portrait.
```

---

## Screen 08 — AI Draft Message Screen

```
A polished mobile message drafting screen for "Ghosty" conference networking app. Ultra dark (#0D1117) background. Top: back arrow, title "Draft Message" in near-white bold, and a small "Priya Kumar · Stripe" subtitle in muted gray. Below title: three tab pills: "LinkedIn" (selected, amber underline), "Email", "Cover Letter". Dark elevated card (#161B22, 24px radius) containing the draft message. Inside the card: small amber label "AI Draft — tap to edit" in 11px. Below: the actual draft message text in 15px near-white, line-height generous: "Hi Priya — it was great connecting with you at the Kiro Spark Challenge today. Your point about building for emerging markets in Stripe's consumer growth team really resonated with me — it's exactly the problem space I've been obsessed with. I'd love to stay in touch after May 15th as you mentioned. I'm attaching my profile below." The text has a blinking text cursor at the end to suggest it's editable. Below the card: a row of 3 small dark pill buttons: "Make shorter" · "More formal" · "Add skill highlight". A frosted glass bottom action bar: left "Copy" button with icon, right "Send via LinkedIn ↗" amber glowing button. iPhone 15 Pro mockup. 9:19.5 portrait.
```

---

## Screen 09 — Social Capital Dashboard

```
A stunning mobile analytics dashboard for "Ghosty" conference networking app — showing social capital metrics. Ultra dark (#0D1117) background. Top: "Dashboard" title bold near-white, subtitle "April 2025" in muted gray, small "Export ↗" button top right in muted teal. Hero stat card: large dark elevated card (#161B22, 24px radius), showing: "$1.4M" in massive 42px bold amber text, below it "Estimated Career Pipeline Value" in 14px gray, below that a small green upward arrow "+ 3 connections today". Below the hero card: a smooth area chart — x-axis showing last 7 days (dates), y-axis unlabeled, the chart area is a smooth curve filled with a vertical gradient from amber (top, 40% opacity) to transparent (bottom). The line itself is bright amber, 2px. Three data points have small amber circles. Chart background is dark elevated surface. Below the chart: "By Intent Tag" heading, and a horizontal row of 5 small stat pills, each showing intent tag emoji + label + count: "🎯 Recruiting 4" (amber) · "🧠 Mentor 2" (purple-ish) · "🤝 Collab 3" (teal) · "📣 Amplify 1" (coral) · "💡 Peer 6" (gray). Below: "At Risk" section — a small red warning banner showing 2 contacts at risk with a "View" button in red outline. iPhone 15 Pro. 9:19.5 portrait.
```

---

## Screen 10 — Event Summary (End of Day)

```
A beautiful post-event summary modal screen for "Ghosty" conference networking app. Ultra dark (#0D1117) background with a soft frosted glass full-screen sheet rising from the bottom. The sheet is dark (#161B22) with 28px top radius corners. Top of sheet: a celebration micro-moment — 5-6 tiny amber and teal geometric confetti shapes scattered above the heading. Large heading: "Event Wrapped 🎯" in bold 24px near-white. Subtitle: "ASU Kiro Spark Challenge · Apr 24" in muted gray 14px. A horizontal 3-stat row in rounded dark cards: "11 Contacts" (teal number) · "$1.4M Value" (amber number) · "73% 🔥 High Priority" (amber). Below: a ranked top-3 list — section label "Top Connections" in uppercase amber 11px. Three rows: each showing rank number, avatar initials circle, name, company, and score badge. Row 1: "1 · PK · Priya Kumar · Stripe · 9.2🔥", Row 2: "2 · WC · Wei Chen · Google · 8.7", Row 3: "3 · MR · Marcus Reed · DevSeed · 7.4". Below: a bold full-width amber glowing button: "Send All Follow-ups Now →". Below that: a gray text link "Review individually". The modal handle bar at very top of sheet. Background behind modal slightly blurred/dark. iPhone 15 Pro. 9:19.5 portrait.
```

---

## Screen 11 — QR Code Quick-Add

```
A sleek mobile QR code exchange screen for "Ghosty" conference networking app. Ultra dark (#0D1117) background. Two-section layout split cleanly in the center. Top half: dark elevated card (#161B22, 24px radius, with subtle amber inner glow border). Inside: label "Your Ghosty Code" in 12px uppercase amber. A large centered QR code — the QR code itself is styled: dark background, amber colored modules instead of black, with the Ghosty ghost icon in the center of the QR code as the embedded logo, clean and readable. Below the QR code inside the card: "Alex Rivera · Product Manager · ASU" in small near-white text, and a teal "@alexrivera" handle. Small amber "Share ↗" button at bottom of card. Horizontal divider with "OR SCAN" centered in muted gray. Bottom half: a live camera viewfinder section — dark rounded rectangle showing a simulated camera feed (dark with slight grain), with four corner bracket markers in amber highlighting the scan zone. Below the viewfinder: "Point at someone's Ghosty QR code" in 13px muted gray. A small "Enter email instead" text link below in muted teal. iPhone 15 Pro mockup. 9:19.5 portrait.
```

---

## Screen 12 — Onboarding / Career Goal Setup

```
A premium multi-step onboarding screen for "Ghosty" conference networking app — step 3 of 4, "Set Your Career Goal". Ultra dark (#0D1117) background. Top: very small step indicator — 4 dots in a row, dot 3 filled amber, others muted gray. Large heading: "What are you hunting for?" in bold 26px near-white with a small hand-drawn underline in amber below "hunting". Subtle subtext: "Ghosty will score every connection based on this." in 14px muted gray. Below: 5 large selectable option cards stacked vertically. Each card: dark elevated (#161B22, 16px radius, hairline border). SELECTED card (card 1): amber border glow, amber left-side accent bar, amber checkmark top-right. Card 1 selected: "🎯  Land a New Role" bold near-white + "Full-time, internship, or contract" gray small text. Cards 2-5 unselected: "🚀  Find a Co-Founder" · "🌱  Find a Mentor" · "📢  Grow My Audience" · "🤝  Build Partnerships". Each unselected card has hairline gray border, no glow. At very bottom: a full-width amber glowing button "Continue →" with very subtle shimmer effect on the button. iPhone 15 Pro mockup. 9:19.5 portrait.
```

---

## BONUS — Full App Overview Composite

```
A stunning product showcase image for "Ghosty" — a dark premium conference networking mobile app. Pure near-black background (#0A0A0F). Centered composition showing 5 iPhone 15 Pro mockups arranged in a slight arc/fan layout, each phone slightly angled (±5 degrees). Each phone shows a different app screen with rich dark UI: Phone 1 (leftmost, tilted left): the home screen with the giant pulsing amber microphone button. Phone 2 (slightly left-center): the swipe contact card screen with "Priya Kumar" card. Phone 3 (center, largest, straight on): the social capital dashboard with the amber area chart and "$1.4M" hero stat. Phone 4 (slightly right-center): the follow-up queue with priority list. Phone 5 (rightmost, tilted right): the AI draft message screen. Above the phones: the Ghosty wordmark in large bold geometric font, near-white with a soft amber glow. Below the phones: the tagline "Never let a great conversation ghost you." in spaced-out uppercase gray letters. Ambient amber light leaks from behind the phones, very subtle. The overall image has a very slight warm grain texture. Photorealistic Apple-style product marketing image quality. 16:9 landscape aspect ratio.
```

---

## Prompting Tips for Best Results

1. **Use GPT-4o image generation** (not DALL-E 2). It understands UI layout significantly better.
2. **Generate one screen at a time** — don't batch them. Each prompt is self-contained.
3. **If a screen looks off**, add to the end of any prompt: *"Ensure this looks like a real published App Store app — not a concept render or wireframe. Photorealistic UI, not illustrated."*
4. **For Kiro handoff**, label each image file: `ghosty-screen-01-splash.png`, `ghosty-screen-02-home.png`, etc.
5. **Kiro prompt to use with each image**: *"Implement this screen in React Native with Expo. Match the dark color scheme (#0D1117 background, #F59E0B amber accent, #14B8A6 teal accent, #F43F5E red/recording accent). Use NativeWind for styling. Recreate the exact layout, component hierarchy, spacing proportions, and typography weights shown in the image."*
