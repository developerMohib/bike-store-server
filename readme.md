# 🛒 Bike Store  

🚀 **Live Demo**: [Bike Store](https://bike-store-server.onrender.com)

Welcome to **Bike Store**, a backend application designed to manage products, orders, and revenues. Built with **TypeScript**, **Nodejs**, **Express.js**, **MongoDB**, and **Mongoose**, this project implements clean architecture, validation, and advanced error handling to ensure high reliability.  

---

## 📹 **Project Video View**
Watch its features and functionality [Video](https://youtu.be/vbe8HFxhz_U?si=VFsnAj1dpEXtsYTQ)

---

## 📋 **Features**

### ✨ **Product Management**  
- Create, Update, Read, and Delete products.

### 🛍️ **Order Management**  
- Place orders with dynamic total price calculation.  
- Manage order statuses with ease.  

### 📈 **Revenue Reporting**  
- Calculate and view revenue generated from completed orders.  

### ⚡ **Key Highlights**  
- **Validation**: Mongoose input validation.  
- **Error Handling**: middleware for consistent error responses.  
- **Scalable Architecture**: Modular structure for easy scalability and maintainability.  


## 🛠️ **Technologies Used**

- **Backend Framework**: Express.js  
- **Programming Language**: TypeScript  
- **Database**: MongoDB with Mongoose  
- **Validation**: Mongoose
- **Linting and Formatting**: ESLint and Prettier  
- **Deployment**: Vercel  

## 📂 **Folder Structure**

```plaintext
Folder_Name/
│
├── dist/                # Compiled JavaScript files
├── node_modules/        # Node.js dependencies
├── src/                 # Source code
│   ├── config/          # Database and environment configurations
│   ├── middlewares/     # Middleware for validation and error handling
│   ├── modules/         # Mongoose schemas and models
│   ├── utils/           # Helper functions
│   ├── index.ts         # Initializes Express app
│   └── server.ts        # Entry point to start the server
├── .env                 # Environment variables
├── .gitignore           # Files to be ignored by Git
├── .prettierrc          # Prettier configuration for formatting
├── .eslint.config.mjs   # ESLint configuration for linting
├── package-lock.json    # Dependency tree lock file
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── vercel.json          # vercel deployment

🏁 Getting Started
Follow these steps to set up the project locally:

📂 Step 1: Clone the Repository
bash
Copy code
git clone https://github.com/your-username/bike-store-server.git
cd bike-store-server
📦 Step 2: Install Dependencies
Install all required dependencies:

bash
Copy code
npm install
🔧 Step 3: Configure Environment Variables
Create a .env file in the root directory and add the following variables:

env
Copy code
MONGODB_URI=your-mongodb-connection-string
PORT=4000
Replace your-mongodb-connection-string with your MongoDB URI.

▶️ Step 4: Run the Application
Start the development server:

bash
Copy code
npm run dev
The application will be live at http://localhost:4000.

📡 API Endpoints
📝 Product Endpoints
POST /api/products: Add a new product.
GET /api/products: Retrieve all products.
GET /api/products/:productId: Retrieve details of a specific product.
PUT /api/products/:productId: Update product details.
DELETE /api/products/:productId: Delete a product.
🛍️ Order Endpoints
POST /api/orders: Place an order.
GET /api/orders/revenue: Retrieve revenue details.
🌐 Scripts
The following scripts are available in the package.json:

Command	Description
npm run dev	Starts the development server.
npm run build	Compiles TypeScript to JavaScript.
npm run start	Starts the production server.
npm run lint	Runs ESLint for linting.
npm run format	Formats code using Prettier.
🛠️ Contributing
Contributions are welcome! Please follow these steps:
```
Fork the repository.
Create a feature branch: git checkout -b my-feature.
Commit your changes: git commit -m "Add new feature".
Push to the branch: git push origin my-feature.
Submit a pull request.