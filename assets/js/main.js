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
        name: 'Pink Back-Printed Top',
        category: 'tops',
        price: 2900,
        stock: 32,
        sku: 'TOP-PNK-001',
        image: 'assets/images/products/back-printed-pink-color-top/back-printed-top-pink-color-top--0114168837800-1-17506560643iwq1qMYjD.jpg',
        badge: null
    },
    {
        id: 2,
        name: 'Yellow Back-Printed Top',
        category: 'tops',
        price: 2800,
        stock: 50,
        sku: 'TOP-YLW-002',
        image: 'assets/images/products/back-printed-yellow-color-top/back-printed-yellow-color-top-0114168837800.jpg',
        badge: 'New'
    },
    {
        id: 3,
        name: 'Beige Bodycon Dress',
        category: 'dresses',
        price: 5400,
        stock: 18,
        sku: 'DRS-BGE-003',
        image: 'assets/images/products/beige-color-bodycon-dress/beige-color-bodycon-dress-0114168909900.jpg',
        badge: null
    },
    {
        id: 4,
        name: 'Cutout Bodycon Midi Dress',
        category: 'dresses',
        price: 6200,
        stock: 10,
        sku: 'DRS-MID-004',
        image: 'assets/images/products/cutout-bodycon-midi-dress/cutout-bodycon-midi-dress-010102508243-1.jpg',
        badge: 'Hot'
    },
    {
        id: 5,
        name: 'Light Green Sleeveless Top',
        category: 'tops',
        price: 2400,
        stock: 40,
        sku: 'TOP-GRN-005',
        image: 'assets/images/products/light-green-sleeve-less-top/light-green-sleeve-less-top--0114168964900.jpg',
        badge: null
    },
    {
        id: 6,
        name: 'Pink Crew Neck T-Shirt',
        category: 'shirts',
        price: 2200,
        stock: 60,
        sku: 'TSH-PNK-006',
        image: 'assets/images/products/pink-color-crew-neck-t-shirt/pink-color-crew-neck-t-shirt--010104518368.jpg',
        badge: null
    },
    {
        id: 7,
        name: 'Women’s Belted Mini Dress',
        category: 'dresses',
        price: 5300,
        stock: 25,
        sku: 'DRS-MLT-007',
        image: 'assets/images/products/womens-belted-mini-dress/womens-belted-mini-dress-0101141901250.jpg',
        badge: null
    },
    {
        id: 8,
        name: 'Long Sleeve Round Neck Dress',
        category: 'dresses',
        price: 5800,
        stock: 12,
        sku: 'DRS-LNG-008',
        image: 'assets/images/products/womens-long-sleeve-round-neck-dress2/womens-long-sleeve-round-neck-dress--0114164539600-1.jpg',
        badge: 'Limited'
    },
    {
        id: 9,
        name: 'Women’s Printed Mini Dress',
        category: 'dresses',
        price: 4500,
        stock: 20,
        sku: 'DRS-PRT-009',
        image: 'assets/images/products/womens-printed-mini-dress/womens-printed-mini-dress-0114165105200-1.jpg',
        badge: null
    },
    {
        id: 10,
        name: 'Striped Casual Dress',
        category: 'dresses',
        price: 4900,
        stock: 28,
        sku: 'DRS-STR-010',
        image: 'assets/images/products/womens-stripe-printed-dress/womens-stripe-printed-dress-0114165129400.jpg',
        badge: 'New'
    },
    {
        id: 11,
        name: 'Striped Summer Dress',
        category: 'dresses',
        price: 4700,
        stock: 30,
        sku: 'DRS-STR-011',
        image: 'assets/images/products/womens-stripe-printed-dress2/womens-stripe-printed-dress-0114165129400-1.jpg',
        badge: null
    },
    {
        id: 12,
        name: 'White Maxi Dress',
        category: 'dresses',
        price: 6000,
        stock: 14,
        sku: 'DRS-WHT-012',
        image: 'assets/images/products/womens-white-maxi-dress/womens-white-maxi-dress--0114164707700.jpg',
        badge: 'Best Seller'
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
    document.getElementById('searchInput').addEventListener('input', filterAndDisplayProducts);
    document.getElementById('sortDropdown').addEventListener('change', filterAndDisplayProducts);
    document.getElementById('gridToggle').addEventListener('click', toggleGridView);
    document.getElementById('toggleSidebar').addEventListener('click', toggleSidebar);
    document.getElementById('amountReceived').addEventListener('input', calculateChange);
    
    document.querySelectorAll('.payment-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const method = this.id.replace('PaymentBtn', '');
            selectPaymentMethod(method);
        });
    });
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar-categories')
    const content = document.querySelector('.main-content')
    const icon = document.querySelector('#toggleSidebar i')

    sidebar.classList.toggle('.collapsed')
    content.classList.toggle('.expanded')
    icon.classList.toggle('rotate')
}

function loadProducts() {
    filterAndDisplayProducts();
}

function filterAndDisplayProducts() {
    let filtered = products;
    
    if (currentCategory !== 'all') {
        filtered = filtered.filter(p => p.category === currentCategory);
    }
    
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchTerm) ||
            p.sku.toLowerCase().includes(searchTerm)
        );
    }
    
    const sortBy = document.getElementById('sortDropdown').value;
    filtered = sortProducts(filtered, sortBy);
    
    displayProducts(filtered);
    updateProductCount(filtered.length);
}

function sortProducts(items, sortBy) {
    const sorted = [...items];
    
    switch(sortBy) {
        case 'name':
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            sorted.sort((a, b) => b.id - a.id);
            break;
    }
    
    return sorted;
}

function displayProducts(items) {
    const container = document.getElementById('productsContainer');
    const emptyState = document.getElementById('emptyState');
    const loadingState = document.getElementById('loadingState');
    
    if (items.length === 0) {
        container.innerHTML = '';
        emptyState.classList.remove('d-none');
        return;
    }
    
    emptyState.classList.add('d-none');
    loadingState.classList.add('d-none');
    
    container.innerHTML = items.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
    const stockClass = product.stock === 0 ? 'stock-out' : product.stock < 10 ? 'stock-low' : '';
    const stockText = product.stock === 0 ? 'Out of Stock' : product.stock < 10 ? `Only ${product.stock} left` : 'In Stock';
    
    return `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}"/>
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-sku">SKU: ${product.sku}</div>
                <div class="product-stock ${stockClass}">${stockText}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

function updateProductCount(count) {
    document.getElementById('productCount').textContent = count;
}

function filterProducts(category) {
    currentCategory = category;
    
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.category === category) {
            item.classList.add('active');
        }
    });
    
    const categoryNames = {
        'all': 'All Products',
        'shirts': 'Shirts',
        'pants': 'Pants',
        'dresses': 'Dresses',
        'accessories': 'Accessories',
        'footwear': 'Footwear',
        'outerwear': 'Outerwear',
        'seasonal': 'Seasonal',
        'sale': 'Sale Items'
    };
    
    document.getElementById('sectionTitle').textContent = categoryNames[category];
    
    filterAndDisplayProducts();
}