IEEE IGDTUW App

IEEE IGDTUW is a modern web & Android app for students, members, and tech enthusiasts. It combines a tech feed, AI integrations, gamification, and interactive community features to keep users engaged and informed.

🚀 Features
1. Tech Feed

Latest technology news and updates

Research articles and insights

Frequent tips for students and developers

Daily Digest:

Logical questions/puzzles for brain training

Quick challenges or quizzes

Upcoming tech or IEEE events

2. Feedback

Star rating system for events, posts, or content

Collect user opinions and improve engagement

3. Chatbot (AI Integration)

Interactive AI assistant for queries

Can answer FAQs or provide tech guidance

Personalized suggestions for users

4. FAQs

Organized frequently asked questions

Help section for app usage or event info

5. Leaderboard & Gamification

Weekly leaderboard for users who participate in quizzes, challenges, or events

Gamified elements to encourage daily engagement

“Gamified Week” challenges and rewards

💻 Tech Stack
Component	Technology
Frontend	React + TypeScript
Styling	Tailwind CSS (Cyberpunk theme with blue-purple accents)
Build Tool	Vite
Backend	Node.js / Supabase
AI/Chatbot	OpenAI API or equivalent AI integration
Gamification	Custom leaderboard + points system
Mobile Deployment	PWA or Capacitor for Android
📦 Folder Structure (Suggested)
IEEE-igdtuw/
├─ frontend/        # React app
│   ├─ src/
│   ├─ components/
│   ├─ pages/
│   ├─ assets/
│   └─ ...
├─ backend/         # Node.js / Supabase
│   ├─ routes/
│   ├─ controllers/
│   ├─ models/
│   └─ ...
├─ supabase/
├─ package.json
├─ vite.config.ts
├─ tailwind.config.js
└─ README.md

⚡ Run Locally (Web)

Clone the repo:

git clone https://github.com/purvamehta2007/IEEE-igdtuw.git
cd IEEE-igdtuw


Install dependencies:

npm install


Create .env for Supabase/AI keys:

VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_OPENAI_KEY=your_openai_api_key


Start development server:

npm run dev


Open http://localhost:3000
 in your browser.

📱 Run on Android
Option 1: Progressive Web App (PWA)

Add PWA plugin for Vite.

Build the app:

npm run build


Deploy dist/ folder online (Vercel/Netlify).

Open the URL in Chrome → “Add to Home Screen” → Works as an Android app.

Option 2: Capacitor

Install Capacitor:

npm install @capacitor/core @capacitor/cli
npx cap init ieee-igdtuw com.example.ieeeigdtuw
npx cap add android


Build the web app and copy to Capacitor:

npm run build
npx cap copy


Open in Android Studio:

npx cap open android


Run on emulator or physical device → native Android app.

🏆 Usage

Open the app in browser or Android device.

Tech Feed: Stay updated with news, research, tips, and daily puzzles.

Feedback: Rate content or events using stars.

Chatbot: Ask questions or get guidance.

FAQs: Browse commonly asked questions.

Leaderboard/Gamification: Participate in quizzes, challenges, and gamified week events to earn points and rank up.
