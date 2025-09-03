# Health Library Frontend

A modern web application built with Next.js for managing hospital operations, patient monitoring, and healthcare services.

## 🚀 Features

- **Patient Management** - Patient registration and profile management
- **Doctor Dashboard** - Healthcare provider interface
- **Hospital Administration** - Hospital management portal
- **Blood Monitoring** - Real-time blood test results and tracking
- **Patient Monitoring** - Health status tracking and alerts
- **Responsive Design** - Mobile and desktop optimized

## 🛠️ Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript/JavaScript
- **Styling**: CSS/Tailwind CSS
- **Editor**: TinyMCE
- **HTTP Client**: Axios/Fetch

## 📋 Prerequisites

- Node.js >= 16.0.0
- npm/yarn/pnpm/bun

## 🚀 Getting Started

### Environment Setup
Create a `.env` file in the root directory:
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_IMAGE_URL=http://localhost:3000/upload/
NEXT_PUBLIC_TINY_MCE_API_KEY=tinymceapi
```

### Installation
```bash
npm install
```

### Running the Application
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the application.

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🌐 API Integration

The frontend connects to the Health Library Backend API running on `http://localhost:3000`. Ensure the backend is running before starting the frontend application.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

UNLICENSED
