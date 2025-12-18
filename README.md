# FashionRack POS

## Project Title and Description

**FashionRack POS** is a lightweight, single-page application (SPA) designed for point-of-sale operations in retail environments, particularly fashion stores. It provides an intuitive interface for managing products, customers, and orders without requiring a backend server. The system supports essential POS functionalities such as cart management, order processing, receipt generation, and basic reporting, making it ideal for small to medium-sized businesses looking for a cost-effective, browser-based solution.

Built entirely with frontend technologies, FashionRack POS emphasizes simplicity, responsiveness, and ease of use, allowing users to handle transactions efficiently on any device with a modern web browser.

## Features

FashionRack POS includes a comprehensive set of features to streamline retail operations:

- **Products Management**: Browse, filter, and sort products by categories (e.g., tops, shirts, dresses, pants, accessories, footwear, outerwear, seasonal, sale items). Supports gender-based filtering (men, women, unisex).
- **Customer Management**: Add, edit, search, and manage customer information, including name, phone, and email. View customer order history.
- **Shopping Cart**: Dynamic cart with real-time calculations for subtotal, tax (configurable rate), discounts (fixed or percentage), service charges, and total amount. Add/remove items with quantity controls.
- **Orders Management**: Track and manage orders with detailed views, including order number, customer details, items, amounts, status (pending, completed, cancelled), and dates. Search and filter orders by status and date range.
- **Payment Handling**: Support for multiple payment methods (cash, gift cards, other). Quick amount input with automatic change calculation.
- **Receipt Generation**: Generate printable receipts with customizable headers, footers, and store logo inclusion.
- **Responsive Design**: Sidebar for products and cart that can be toggled. Grid/List view toggle for products display.
- **Dark Mode**: Toggle between light and dark themes for better usability in different environments.
- **Export Functionality**: Export orders data to CSV and PDF formats for reporting and record-keeping.
- **Help and Settings**: Built-in help page with FAQs and support contact form. Settings page for configuring store details, tax rates, service charges, themes, and receipt customization.
- **Data Persistence**: Uses browser LocalStorage for storing products, customers, orders, and settings data.

## Tech Stack

- **HTML**: Structure and layout of the application.
- **CSS (Bootstrap 5)**: Responsive styling and UI components for a modern, mobile-friendly interface.
- **Vanilla JavaScript**: Core logic for interactivity, data management, and event handling without external libraries.
- **LocalStorage**: Client-side storage for data persistence across browser sessions.

No backend or database is required, making it easy to deploy and run locally.

## Installation and Usage

### Prerequisites
- A modern web browser (e.g., Chrome, Firefox, Edge, Safari) with JavaScript enabled.
- No additional software or server setup needed.

### Installation Steps
1. **Clone the Repository**:
   ```
   git clone https://github.com/your-username/fashionrack-pos.git
   ```
   Replace `your-username` with the actual repository owner.

2. **Navigate to the Project Directory**:
   ```
   cd fashionrack-pos
   ```

3. **Open the Application**:
   - Open `index.html` in your web browser.
   - Alternatively, serve the files using a local web server (e.g., via VS Code's Live Server extension or Python's `http.server`):
     ```
     python -m http.server 8000
     ```
     Then navigate to `http://localhost:8000` in your browser.

### Usage
- Upon opening, you'll land on the Products page. Use the sidebar to filter products and add items to the cart.
- Navigate between sections (Products, Customers, Orders, Help, Settings) using the top navigation bar.
- Add customers, process orders, and generate receipts as needed.
- Data is automatically saved to LocalStorage and persists across sessions.

## Project Structure

The project follows a modular structure for maintainability:

```
fashionrack-pos/
├── index.html                 # Main SPA container with all sections (Products, Customers, Orders, Help, Settings)
├── assets/
│   ├── bootstrap/
│   │   ├── css/
│   │   │   └── bootstrap.min.css    # Bootstrap CSS framework
│   │   └── js/
│   │       ├── bootstrap.bundle.min.js
│   │       └── bootstrap.min.js     # Bootstrap JavaScript components
│   ├── css/
│   │   ├── cart.css             # Styles for cart sidebar
│   │   ├── customers.css        # Styles for customers page
│   │   ├── layout.css           # General layout styles
│   │   ├── main.css             # Main application styles
│   │   ├── modals.css           # Styles for modals (checkout, product, etc.)
│   │   ├── products.css         # Styles for products grid/list
│   │   ├── responsive.css       # Responsive design adjustments
│   │   └── utilities.css        # Utility classes
│   ├── images/
│   │   ├── icons/               # UI icons
│   │   ├── logos/               # Store logos
│   │   └── products/            # Product images organized by folders
│   └── js/
│       ├── app.js               # Application initialization and global variables
│       ├── cart.js              # Cart management logic
│       ├── customer.js          # Customer management functions
│       ├── orders.js            # Orders handling and receipt generation
│       ├── product.js           # Product listing and management
│       ├── sampleData.js        # Sample data for demonstration
│       ├── storage.js           # LocalStorage utilities
│       └── ui.js                # UI logic, event listeners, and navigation
├── LICENSE                     # Project license file
└── README.md                   # This file
```

### Key Files Explanation
- **`index.html`**: The single-page application container, containing all HTML sections for different pages (Products, Customers, Orders, Help, Settings) and modals.
- **`app.js`**: Handles application initialization, sets up global variables, and coordinates between modules.
- **`ui.js`**: Manages UI interactions, event listeners, navigation between sections, and responsive behaviors.
- **`orders.js`**: Contains logic for order management, receipt generation, and export functionalities.
- **`assets/css/`**: Custom CSS files for styling specific components and ensuring responsive design.
- **`assets/images/`**: Static images for products, icons, and logos used throughout the application.
- **`assets/bootstrap/`**: Bootstrap framework files for UI components and styling.

## Screenshots

*(Add screenshots here to showcase the application in action. Place images in an `screenshots/` folder and reference them below.)*

- **Products Page**: Overview of the products grid with sidebar filters.
- **Cart and Checkout**: Shopping cart sidebar and checkout modal with payment options.
- **Orders Management**: Orders table with search and filter options.
- **Settings Page**: Configuration options for store settings and themes.

## Future Enhancements

FashionRack POS is designed for extensibility. Potential future improvements include:

- **Backend Integration**: Connect to a database (e.g., via REST API) for multi-user support and centralized data storage.
- **Email Receipts**: Send digital receipts via email to customers.
- **Advanced Reporting**: Implement detailed analytics, sales reports, and inventory tracking.
- **User Authentication**: Add login/logout functionality with role-based access (e.g., admin, cashier).
- **Barcode Scanning**: Integrate barcode/QR code scanning for quick product lookup.
- **Mobile App**: Develop a companion mobile app using frameworks like React Native.
- **Multi-Store Support**: Enable management of multiple store locations.
- **Inventory Management**: Add stock tracking, low-stock alerts, and automatic reordering.

Contributions and feature requests are welcome via the project's issue tracker.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

For questions, issues, or contributions, please visit the [GitHub repository](https://github.com/your-username/fashionrack-pos) or contact the maintainers.