# TinyURLs

A modern URL shortening service built with React, Node.js, and MongoDB.

## Features

- ✂️ **URL Shortening**: Convert long URLs into concise, shareable links.
- 📊 **Analytics**: Track the number of visitors for each shortened link. (Upcomming)
- 💳 **Payment Integration**: Includes Razorpay integration for potential premium features.
- 📱 **Responsive Design**: Built with Tailwind CSS for a seamless experience on all devices.

## Tech Stack

### Frontend
- React.js (with Vite)
- Tailwind CSS
- React Router
- Axios (for API calls)
- Razorpay Checkout

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB (with Mongoose)
- short-uuid (for generating short IDs)
- CORS
- dotenv (for environment variables)

## Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn
- MongoDB instance (local or cloud)
- Razorpay Account (if using payment features)

## Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/SURAJSHARMA-ind/URLShortner.git
    cd URLShortner
    ```

2.  **Backend Setup**:
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` directory and add the following variables:
    ```plaintext
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    BASE_URL=http://localhost:3000 # Or your deployed backend URL
    RAZORPAY_KEY_ID=your_razorpay_key_id
    RAZORPAY_KEY_SECRET=your_razorpay_secret
    ```

3.  **Frontend Setup**:
    ```bash
    cd ../frontend
    npm install
    ```
    Create a `.env` file in the `frontend` directory and add the following variables:
    ```plaintext
    VITE_HOST=http://localhost:3000 # Your backend API base URL
    VITE_RAZORPAY_KEY=your_razorpay_key_id
    ```

## Running the Application

1.  **Start the backend server**:
    ```bash
    cd backend
    npm run dev 
    ```
    The backend server will typically run on `http://localhost:3000`.

2.  **Start the frontend development server**:
    ```bash
    cd ../frontend
    npm run dev
    ```
    The frontend application will usually be available at `http://localhost:5173` (or another port specified by Vite).

## API Endpoints

The backend exposes the following endpoints:

-   `POST /api/v1/short/url`: Creates a new shortened URL.
    -   **Request Body**: `{ "url": "your_long_url_here" }`
    -   **Response**: `{ "message": "...", "shortUrl": "..." }`
-   `GET /:shortId`: Redirects to the original long URL associated with the `shortId` and increments the visitor count.
-   `POST /api/v1/payment/order`: (Assuming based on `paymentRoutes`) Creates a Razorpay order.
-   `POST /api/v1/payment/verify`: (Assuming based on `paymentRoutes`) Verifies a Razorpay payment.
