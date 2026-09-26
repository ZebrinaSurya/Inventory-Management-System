# 📦 Inventory Management System — Full-Stack Documentation

A full-stack enterprise web application built using **Java (Spring Boot)** for the backend REST API, an **in-memory H2 database** for persistence, and **React.js** for the frontend user interface.

This application provides real-time stock tracking, automatic low-stock warnings based on custom threshold levels, and complete inventory management operations (CRUD).

---

## 🌟 Key Features

* **Live Inventory Dashboard:** View all current stock items, categories, pricing, and quantities in a clean, responsive layout.
* **Smart Stock Alerts:** Dynamic status badges (`In Stock` vs. `Low Stock`) automatically update based on specified reorder thresholds.
* **Full Stock Management:** Seamlessly add new items, update existing product details, or delete obsolete records.
* **RESTful API Layer:** Independent backend API architecture separating business logic from the user interface.
* **In-Memory Database Console:** Integrated H2 database management portal for direct data querying and verification.

---

## 🏗️ System Architecture & Workflow

The system operates across a 3-tier architecture:

```text
[ React Frontend UI ]  <--->  [ Spring Boot REST API ]  <--->  [ H2 Database ]
  (http://localhost:3000)        (http://localhost:8080)        (In-Memory Store)
```

1. **User Action:** The user inputs product details (Name, Category, Price, Quantity, Reorder Threshold) on the React dashboard.
2. **API Communication:** The frontend sends an HTTP request using Axios to the Spring Boot REST API layer.
3. **Business Processing:** The backend processes the request, executes validation, and maps data via Spring Data JPA.
4. **Data Persistence:** Spring Data JPA persists or updates records directly inside the H2 database engine.
5. **UI Update:** The frontend receives the JSON response and dynamically re-renders the inventory table with updated stock levels and status indicators.

---

## 🛠️ Tech Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Backend Language** | Java 17+ / 21 | LTS Version |
| **Backend Framework** | Spring Boot 3 | REST Controller, Spring Data JPA |
| **Database** | H2 Database | In-Memory Relational Engine |
| **Frontend Library** | React.js | Hooks, Functional Components, Axios |
| **Styling** | Custom CSS3 | Modern, Responsive Dashboard Design |
| **Build Tools** | Maven & npm | Dependency Management |

---

## 📁 Project Folder Structure

```text
Inventory_Management_System/
│
├── backend/                  # Spring Boot API Application
│   ├── src/main/java/        # Controllers, Repositories, Entities
│   ├── src/main/resources/   # Application Properties Config
│   └── pom.xml               # Maven Dependencies
│
└── frontend/                 # React Frontend Application
    ├── src/                  # React Components & CSS Styles
    ├── public/               # Web Assets
    └── package.json          # Node Dependencies & Scripts
```

---

## 🚀 Quick Start & Running Guide

### 1. Running the Backend (Spring Boot)

1. Open the `backend` project directory in **IntelliJ IDEA** or **Eclipse**.
2. Ensure your Project SDK is set to **Java 17 or 21** (`File -> Project Structure -> SDK`).
3. Run `InventoryManagementApplication.java`.
4. The backend API service will start on port `8080`.

---

### 2. Running the Frontend (React)

1. Open your terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
4. The web dashboard will open automatically at `http://localhost:3000`.

---

## 📍 Endpoint Access Guide

Visiting `http://localhost:8080/` directly will display a **Whitelabel Error Page (404 Not Found)** because the backend is a REST API without a root web page. Use the specific endpoints below:

* **Interactive Web Application (React UI):**  
  `http://localhost:3000`  
  *(Main dashboard to view, add, edit, and delete stock items)*

* **Backend Product Data API (JSON Output):**  
  `http://localhost:8080/api/products`  
  *(REST API endpoint returning raw database records in JSON format)*

* **Database Web Console (H2 Console):**  
  `http://localhost:8080/h2-console`  
  * **JDBC URL:** `jdbc:h2:mem:inventorydb`
  * **User Name:** `sa`
  * **Password:** *(Leave completely blank)*  
  *(Execute direct SQL queries like `SELECT * FROM PRODUCTS`)*

---

## 📡 REST API Reference

| HTTP Method | Endpoint | Action | Request Payload |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Retrieve all items | None |
| `GET` | `/api/products/{id}` | Retrieve item by ID | None |
| `POST` | `/api/products` | Create a new item | Product JSON Object |
| `PUT` | `/api/products/{id}` | Update item by ID | Product JSON Object |
| `DELETE` | `/api/products/{id}` | Delete item by ID | None |

### Sample JSON Payload (POST / PUT)
```json
{
  "name": "Wireless Mouse",
  "category": "Electronics",
  "quantity": 15,
  "price": 29.99,
  "reorderLevel": 5
}
```