# WarrantyMe - Digital Warranty Management System

<div align="center">
  <img src="public/images/warranty-me-logo.png" alt="WarrantyMe Logo" width="200"/>
  <br />
  <br />
  <a href="https://warranty-me.vercel.app">
    <img src="https://img.shields.io/badge/Vercel-Deployed-black" alt="Vercel" />
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License" />
  </a>
</div>


## Overview

WarrantyMe is a comprehensive digital warranty management system that helps users store, track, and manage product warranties efficiently. Built with React and powered by Google Drive, it offers a secure and organized way to maintain warranty documents.

## Key Features

- Secure Google Authentication
- Cloud Storage with Google Drive Integration
- Warranty Expiration Tracking
- Rich Text Editor for Warranty Details
- Responsive Material UI Design
- Expiration Notifications
- Quick Search and Filter

## Tech Stack

### Frontend
- React 18
- Material UI
- React Router v6
- React Quill
- Firebase Authentication
- Axios

### Backend
- Express.js
- Google Drive API
- JWT Authentication
- CORS

## Prerequisites

- Node.js (v14 or higher)
- Google Cloud Platform Account
- Firebase Account
- npm or yarn

## Installation & Setup

1. **Clone Repository**
- git clone https://github.com/yourusername/warranty-me.git
- cd warranty-me
- Access the application at  : http://localhost:3000
  
# Project Structure
warranty-me/
├── src/
│   ├── components/
│   │   ├── Login.js
│   │   ├── Navigation.js
│   │   ├── WarrantyEditor.js
│   │   └── WarrantyList.js
│   ├── services/
│   │   └── driveService.js
│   ├── utils/
│   │   └── firebase.js
│   └── App.js
├── backend/
│   ├── server.js
│   └── package.json
├── public/
├── package.json
├── vercel.json
└── README.md

## Security
- Google OAuth 2.0 Authentication
- JWT Token Implementation
- Secure File Storage
- CORS Protection
- Environment Variable Security
  
## Contributing
1. Fork the repository
2. Create feature branch ( git checkout -b feature/AmazingFeature )
3. Commit changes ( git commit -m 'Add AmazingFeature' )
4. Push to branch ( git push origin feature/AmazingFeature )
5. Open Pull Request
   
## License
This project is licensed under the MIT License.

## Acknowledgments
- Google Cloud Platform
- Firebase Team
- Material-UI Team
- Open Source Community
Made with ❤️ by WarrantyMe Team
