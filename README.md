## Table of Contents
- Introduction
- Features
- Technologies Used.
- Installation
- Environment Variables
- Usage
- Contributing
- Author

# Nation property - Booking App - Server sider
This project is a full-stack booking application built with the MERN stack (MongoDB, Express, React, Node.js), inspired by Airbnb. Users can upload and list their properties, search for accommodations, and book stays, calculation of stay duration and pricing to ensure a seamless booking experience for both hosts and guest.

## Features
- **User Authentication:** Secure user login and registration with JWT-based authentication.
- **Property Management:** Add, update, and delete products with detailed descriptions, images, and prices.
- **Book Property:** Automatic calculation of stay duration and total price based on check-in and check-out dates.
- **Search and Filter:** Search for products and filter by categories, price, and ratings.
- **Responsive Design:** Fully responsive design ensuring a smooth experience on both desktop and mobile devices.
  

## Technologies Used
### Backend
- Node js
- Express js

### Database
- MongoDB

### Libaries
- Bcyrptjs
- Jsonwebtoken (JWT)
  
## Installation
### Prerequisites
- Node.js and npm installed

From your command line, first clone the app:
### 
```bash
# Clone this repository
$ git clone https://github.com/mr-atuzie/booking_BE

# Go into the repository
$ cd booking_BE

# Install dependencies
$ npm install
```

### Set up environment variables:
```bash
PORT=7000
DB=your_mongodb_uri
JWT_SECRET=your_jwt_secret
FRONTEND_URL=your_frontend_url
NODE_ENV=production
```

### Start the development servers
```bash
$ npm run start
$ npm run dev
```
## Usage
### API Endpoints:
Here are some of the key API endpoints available,to test your API endpoints, you can use Postman. 

**User Endpoints:**
```bash
# Register a new user
POST /api/users/register

#Log in a user and obtain a JWT token
POST /api/users/login

# Send an reset password token to user email 
POST /api/users/forgot-password

# Destroy user HTTPS cookie
POST /api/users/logout

# Retrieve user profile data (authentication required).
GET /api/users/profile
```

## Related Repositories
Frontend Repository: [https://github.com/mr-atuzie/booking_FE](https://github.com/mr-atuzie/booking_FE)

## Demo
[https://nation-properties.netlify.app](https://nation-properties.netlify.app)

## Contributions
Steps to Contribute
### 1-Fork the repository
Click on the "Fork" button at the top right of the repository page to create a copy of this repository under your own GitHub account.

### 2-Clone your forked repository
```bash
$ git clone https://github.com/yourusername/booking_BE.git
$ cd booking_BE
```
### 3-Create a new branch:
```bash
$ git checkout -b feature/your-feature-name
```
### 4-Make your changes
Make the necessary changes or additions to the codebase.

### 5-Commit your changes
```bash
$ git add .
$ git commit -m "Add feature: description of the feature"
```
### 6-Push your changes to your forked repository
```bash
$git push origin feature/your-feature-name
```

### 7-Create a pull request
- Go to the original repository on GitHub and you should see a prompt to create a pull request from your new branch. Follow the instructions to open a pull request.
- Ensure your pull request description clearly explains the changes and why they are necessary.

### 8-Review process
- Your pull request will be reviewed by the project maintainers. You might be asked to make some changes before it gets merged.

## Author 👨‍💻
- **Rex Atuzie** - **[Linkedin](www.linkedin.com/in/rex-atuzie-0ab67820)**, **[Twitter](https://twitter.com/AtuzieR)**, **[Github](https://github.com/mr-atuzie)**, **[Portfolio](https://rexatuzie.netlify.app)**  


