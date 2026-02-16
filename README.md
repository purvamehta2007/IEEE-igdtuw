IEEE IGDTUW App
📌 Overview

IEEE IGDTUW App is a modern web and Android application for students, members, and tech enthusiasts.
It provides a tech feed, AI integrations, gamification, and interactive community features to keep users engaged, informed, and connected with IEEE events and updates.

This project demonstrates full-stack development, integrating a responsive frontend, backend APIs, AI chatbot, gamified leaderboard, and modular architecture.

✨ Features

✅ Tech Feed

Latest technology news and updates

Research articles and insights

Frequent tips for students and developers

Daily Digest: Logical puzzles, quizzes, and challenges

Upcoming IEEE & tech events

✅ Feedback System

Star rating for posts, events, and content

Collect user opinions to improve experience

✅ AI Chatbot

Interactive assistant for queries

Personalized tech guidance

Can answer FAQs

✅ FAQs Section

Organized frequently asked questions

Help for app usage and events

✅ Leaderboard & Gamification

Weekly leaderboard for participation in quizzes and challenges

Gamified Week events with points and rewards

🛠 Tech Stack
Component	Technology
Frontend	React + TypeScript
Styling	Tailwind CSS (Cyberpunk theme: blue-purple)
Build Tool	Vite
Backend	Node.js / Supabase
AI / Chatbot	OpenAI API or equivalent
Gamification	Leaderboard + points system
Mobile Deployment	PWA or Capacitor for Android
📂 Project Structure
IEEE-igdtuw/
├── frontend/        # React UI components and pages
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── assets/
├── backend/         # Node.js / Supabase server-side logic
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── utils/
├── supabase/        # Database and auth configurations
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md

⚡ Installation & Setup

1️⃣ Clone the repository

git clone https://github.com/purvamehta2007/IEEE-igdtuw.git
cd IEEE-igdtuw


2️⃣ Install dependencies

npm install


3️⃣ Create .env file

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_OPENAI_KEY=your_openai_api_key


4️⃣ Run development server

npm run dev


Open http://localhost:3000
 in your browser.

📱 Run on Android
Option 1: Progressive Web App (PWA)

Add PWA plugin for Vite

Build the app:

npm run build


Deploy dist/ folder online (Vercel/Netlify)

Open URL in Chrome → Add to Home Screen → Works as an Android app

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


Run on emulator or physical device → native Android app

🎯 How It Works

Users open the app on web or Android.

Explore the Tech Feed for news, tips, and puzzles.

Use the AI Chatbot for guidance or FAQs.

Participate in leaderboard challenges and gamified weekly events.

Rate content via feedback system to improve experience.

🔮 Future Improvements

AI-based personalized recommendations

Integration with IEEE event APIs

Push notifications for tech updates

Advanced gamification rewards

Offline mode support
