let cart = [];
let products = [];
let customers = [];
let currentCategory = 'all';
let selectedPaymentMethod = null;
let discountApplied = 0;
let discountType = 'fixed';

const TAX_RATE = 0.10;
const SERVICE_CHARGE_RATE = 0;

const sampleProducts = [
    {
        id: 1,
        name: 'Classic White T-Shirt',
        category: 'shirts',
        price: 29.99,
        stock: 45,
        sku: 'CWT-001',
        image: '👕',
        badge: null
    },
    {
        id: 2,
        name: 'Blue Denim Jacket',
        category: 'outerwear',
        price: 89.99,
        stock: 15,
        sku: 'BDJ-002',
        image: '🧥',
        badge: null
    },
    {
        id: 3,
        name: 'Black Slim Pants',
        category: 'pants',
        price: 59.99,
        stock: 32,
        sku: 'BSP-003',
        image: '👖',
        badge: null
    },
    {
        id: 4,
        name: 'Floral Summer Dress',
        category: 'dresses',
        price: 79.99,
        stock: 18,
        sku: 'FSD-004',
        image: '👗',
        badge: 'NEW'
    },
    {
        id: 5,
        name: 'Leather Belt',
        category: 'accessories',
        price: 34.99,
        stock: 50,
        sku: 'LBT-005',
        image: '🎀',
        badge: null
    },
    {
        id: 6,
        name: 'Sport Running Shoes',
        category: 'footwear',
        price: 119.99,
        stock: 5,
        sku: 'SRS-006',
        image: '👟',
        badge: 'SALE'
    },
    {
        id: 7,
        name: 'Wool Sweater',
        category: 'outerwear',
        price: 69.99,
        stock: 22,
        sku: 'WS-007',
        image: '🧶',
        badge: null
    },
    {
        id: 8,
        name: 'Winter Beanie',
        category: 'seasonal',
        price: 24.99,
        stock: 60,
        sku: 'WB-008',
        image: '🧢',
        badge: null
    },
    {
        id: 9,
        name: 'Red Summer Shorts',
        category: 'seasonal',
        price: 44.99,
        stock: 28,
        sku: 'RSS-009',
        image: '🩳',
        badge: null
    },
    {
        id: 10,
        name: 'Designer Sunglasses',
        category: 'accessories',
        price: 149.99,
        stock: 8,
        sku: 'DG-010',
        image: '🕶️',
        badge: 'SALE'
    },
    {
        id: 11,
        name: 'Casual Button-Up',
        category: 'shirts',
        price: 49.99,
        stock: 35,
        sku: 'CBU-011',
        image: '👔',
        badge: null
    },
    {
        id: 12,
        name: 'Elegant Dress Shoes',
        category: 'footwear',
        price: 129.99,
        stock: 12,
        sku: 'EDS-012',
        image: '👠',
        badge: null
    }
];

const sampleCustomers = [
    { id: 1, name: 'John Doe', phone: '555-0001', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', phone: '555-0002', email: 'jane@example.com' },
    { id: 3, name: 'Mike Johnson', phone: '555-0003', email: 'mike@example.com' }
];

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    products = JSON.parse(JSON.stringify(sampleProducts));
    customers = JSON.parse(JSON.stringify(sampleCustomers));
    
    loadProducts();
    setupEventListeners();
    populateCustomerSelect();
    showStatusMessage('System ready', 3000);
}

function setupEventListeners() {
    document.getElementById('toggleSidebar').addEventListener('click', toggleSidebar);
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar-categories')
    const content = document.querySelector('.main-content')
    const icon = document.querySelector('#toggleSidebar i')

    sidebar.classList.toggle('.collapsed')
    content.classList.toggle('.expanded')
    icon.classList.toggle('rotate')
}