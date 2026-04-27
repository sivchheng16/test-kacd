# KOOMPI Academy

A premium, cinematic digital learning ecosystem engineered for the next generation of Khmer developers. This platform balances high-performance software education with visceral user experiences, serving as the official technical hub for the **KOOMPI Collective**.

## 🌌 The Vision
This platform is more than a curriculum; it is a technical statement for **sovereign technology**. Built to empower students within the KOOMPI OS ecosystem, it provides a high-fidelity learning path from computer foundations to professional full-stack engineering, architected by the KOOMPI team.

## ✨ Key Features

### 📚 Interactive Curriculum
- **8-Track Deep Dive**: A comprehensive learning path covering Computer Foundations (Linux), Web Development (HTML/CSS/JS), Version Control (Git), and modern frameworks (React/Next.js).
- **AI Course Generator**: Personalized learning paths and course modules generated using Moonshot AI integration.
- **Progress Tracking**: Persistent lesson completion and "last viewed" tracking powered by Supabase.

### 🔐 Secure Authentication
- **KOOMPI ID Integration**: Seamless sign-in experience using KOOMPI ID OAuth 2.0 with PKCE flow.
- **Role-Based Access**: Specialized views for students and administrative controls.

### 📜 Certificate Minting
- **Digital Credentials**: Automated issuance of ERC1155 certificates via KOOMPI ID upon course completion.

## 🛠 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS |
| **Backend** | Node.js (Express) |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | KOOMPI ID (OAuth 2.0 + PKCE) |
| **AI** | OpenAI SDK (Moonshot AI) |
| **Deployment** | Vercel (Hybrid SPA + Serverless Functions) |

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+)
- A Supabase Project
- A KOOMPI ID Developer Account

### Local Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/sivchheng16/koompi-academy.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   Create a `.env` file based on `.env.example`.
4. Run the application:
   - **Backend**: `node --env-file=.env server.js` (starts on port 3001)
   - **Frontend**: `npm run dev` (starts on port 3000)

## ☁️ Deployment

### Vercel (Recommended)
This project is architected to run seamlessly on Vercel:
- **API Routing**: Handled via `vercel.json` and the `api/` directory.
- **Environment Variables**: Ensure all keys from `.env` (including `VITE_` prefixed ones) are added to your Vercel project settings.
- **Callback URL**: Add `https://your-domain.vercel.app/auth/callback` to your KOOMPI ID Allowed Redirect URIs.

## 📐 Architecture Note
The project follows a **Hybrid Modular Architecture**:
- `src/`: React frontend with Tailwind CSS and Framer Motion.
- `server.js`: Express backend handling Auth proxy, AI generation, and Supabase logic.
- `api/`: Vercel-specific serverless entry point.
- `curriculum/`: (Optional) Static markdown or JSON lesson data.

---

*Architected in Phnom Penh // 2026 // KOOMPI Collective Studio*
