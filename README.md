🚀 IEEE IGDTUW App
A modern cyberpunk-themed web and Android application designed for students, IEEE members, and tech enthusiasts to stay connected with technology updates, events, and community engagement.
The IEEE IGDTUW App combines a dynamic tech feed, AI-powered assistance, gamification, and interactive community features into a unified full-stack platform.
📌 Overview
The IEEE IGDTUW App provides a centralized digital platform where users can:
Stay updated with trending technology news
Discover research insights and developer tips
Participate in gamified challenges and leaderboards
Engage with IEEE events and activities
Use an AI-powered assistant for guidance and FAQs
This project demonstrates modern full-stack development using scalable architecture, modular components, and AI integrations.
✨ Key Features
📰 Tech Feed
Latest technology news and updates
Research articles and insights
Tips for students and developers
Daily Digest including puzzles, quizzes, and challenges
Upcoming IEEE and tech events
Trending Today section automatically updates — no manual maintenance required
⭐ Feedback System
Star ratings for posts and events
Collect user feedback to improve content quality
Interactive engagement layer
🤖 AI Chatbot
Smart conversational assistant
Personalized tech guidance
Instant FAQ responses
Navigation and feature assistance
❓ FAQs Section
Structured knowledge base
Quick answers for users
Event and app usage guidance
🏆 Leaderboard & Gamification
Weekly leaderboard rankings
Gamified participation system
Challenges and reward-based engagement
Community motivation through points system
🛠 Tech Stack
Component
Technology
Frontend
React + TypeScript
Styling
Tailwind CSS (Cyberpunk blue-purple theme)
Build Tool
Vite
Backend
Node.js / Supabase
Database
Supabase
AI Integration
OpenAI API or equivalent
Mobile Deployment
Progressive Web App (PWA) / Capacitor
📂 Project Structure
Copy code

IEEE-igdtuw/
├── frontend/        # React UI components and pages
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── assets/
├── backend/         # Server-side logic
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── utils/
├── supabase/        # Database and authentication configs
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
⚡ Installation & Setup
1️⃣ Clone Repository
Copy code

git clone https://github.com/purvamehta2007/IEEE-igdtuw.git
cd IEEE-igdtuw
2️⃣ Install Dependencies
Copy code

npm install
3️⃣ Run Development Server
Copy code

npm run dev
Open in browser:
Copy code

http://localhost:3000
📱 Run on Android
Option 1: Progressive Web App (PWA)
Run the application as an installable Android experience:
Add PWA plugin for Vite
Build project:
Copy code

npm run build
Deploy the dist/ folder (Vercel or Netlify recommended)
Open deployed URL in Chrome → Add to Home Screen
The app behaves like a native Android application.
Option 2: Capacitor (Native Android App)
Convert the web app into a native Android application.
Install Capacitor:
Copy code

npm install @capacitor/core @capacitor/cli
npx cap init ieee-igdtuw com.example.ieeeigdtuw
npx cap add android
Build and sync:
Copy code

npm run build
npx cap copy
Open Android Studio:
Copy code

npx cap open android
Run on emulator or physical device.
🎯 How It Works
Users access the platform via web or Android.
Browse the Tech Feed for latest updates, tips, and challenges.
Interact with the AI chatbot for assistance.
Participate in gamified events and leaderboard activities.
Provide feedback to enhance community-driven improvements.
🔮 Future Improvements
AI-based personalized content recommendations
Integration with IEEE event APIs
Push notifications for updates and events
Advanced gamification rewards system
Offline-first support
🤝 Contributing
Contributions, feature ideas, and improvements are welcome.
Fork the repository
Create a feature branch
Submit a Pull Request
