#  Team Details 

>  Problem Statement 3: ReWear – Community Clothing Exchange   
> Team Name: Team ADT


---
Video Link => [Working Demo](https://vimeo.com/1100841854/dbecf0dc59?share=copy)


##  Team Members

| Name             | Email                         |
|------------------|-------------------------------|
| Daksh Nayak      | dakshnayak635@gmail.com       |
| Ayush Burde      | aayuwork7@gmail.com           |
| Anshuraj Singh   | singhanshuraj935@gmail.com    |
| Toshit Rewatkar  | toshitrewatkar3205@gmail.com  |



 We’re building ReWear to promote sustainable fashion by enabling peer-to-peer clothing swaps with a clean, minimal tech stack and thoughtful user experience.


# ReWear - Sustainable Clothing Exchange Platform

A full-stack web application for sustainable fashion exchange where users can upload unused clothes and either swap them with others or redeem them via a point-based system.

 Features

### User Features
- **Authentication**: JWT-based login/register with Google OAuth support
- **Item Management**: Upload, edit, and delete clothing items with images
- **Browse & Search**: Discover items with filters and search functionality
- **Swap System**: Request swaps with other users or redeem items with points
- **Dashboard**: View your items, requests, and points
- **Profile Management**: Update profile information and preferences

 Admin Features
- **User Management**: View, ban/unban users, and manage roles
- **Item Approval**: Review and approve/reject item listings
- **Platform Statistics**: Monitor platform usage and activity
- **Content Moderation**: Ensure quality and appropriate content

 Tech Stack

 Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** authentication with Google OAuth
- **Cloudinary** for image uploads
- **Multer** for file handling

Frontend
- **React** with Vite
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Lucide React** for icons

 Project Structure

```
rewear/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   ├── api/           # API utilities
│   │   └── utils/         # Utility functions
│   ├── public/
│   └── package.json
├── server/                 # Node.js backend
│   ├── controllers/       # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── config/           # Configuration files
│   └── package.json
└── README.md
```

 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Cloudinary account
- Google OAuth credentials
 Backend Setup

1. **Navigate to server directory**:
   ```bash
   cd server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create environment file**:
   ```bash
   cp env.example .env
   ```

4. **Configure environment variables** in `.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/rewear
   JWT_SECRET=your_jwt_secret_key_here
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   FRONTEND_URL=http://localhost:5173
   ```

5. **Start the server**:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to client directory**:
   ```bash
   cd client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/google` - Google OAuth
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Items
- `GET /api/items` - Get all items (with filters)
- `GET /api/items/:id` - Get single item
- `POST /api/items` - Create new item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item
- `PATCH /api/items/:id/approve` - Approve/reject item (admin)
- `GET /api/items/user/me` - Get user's items

### Swaps
- `POST /api/swaps` - Create swap request
- `GET /api/swaps/my-requests` - Get user's requests
- `GET /api/swaps/my-items-requests` - Get requests for user's items
- `PATCH /api/swaps/:id/respond` - Respond to swap request
- `PATCH /api/swaps/:id/cancel` - Cancel swap request
- `GET /api/swaps/history` - Get swap history

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/dashboard` - Get dashboard data
- `GET /api/users/admin/all` - Get all users (admin)
- `GET /api/users/admin/:id` - Get user details (admin)
- `PATCH /api/users/admin/:id/ban` - Ban/unban user (admin)
- `PATCH /api/users/admin/:id/role` - Update user role (admin)
- `GET /api/users/admin/pending-items` - Get pending items (admin)
- `GET /api/users/admin/stats` - Get platform stats (admin)

## 🔧 Configuration

### MongoDB Setup
1. Install MongoDB locally or use MongoDB Atlas
2. Create a database named `rewear`
3. Update `MONGODB_URI` in your `.env` file

### Cloudinary Setup
1. Create a Cloudinary account
2. Get your cloud name, API key, and API secret
3. Update the Cloudinary credentials in your `.env` file

### Google OAuth Setup
1. Go to Google Cloud Console
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs
6. Update Google credentials in your `.env` file

 Customization

### Styling
The project uses Tailwind CSS for styling. You can customize the design by:
- Modifying `tailwind.config.js` in the client directory
- Updating color schemes and components
- Adding custom CSS in `src/index.css`

### Components
All React components are modular and reusable. You can:
- Add new components in `src/components/`
- Create new pages in `src/pages/`
- Extend functionality by adding new routes and API endpoints

 Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Deploy to platforms like Heroku, Railway, or DigitalOcean
3. Ensure MongoDB connection is properly configured

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to platforms like Vercel, Netlify, or GitHub Pages
3. Update API base URL in production

##  Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

##  License

This project is licensed under the MIT License.

 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API endpoints

##  Future Enhancements

- Real-time notifications
- Chat system between users
- Advanced search and filtering
- Mobile app development
- Payment integration
- Social features and sharing
- Analytics and reporting
- Multi-language support 
