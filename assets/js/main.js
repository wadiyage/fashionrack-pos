let cart = []
let products = []
let customers = []

let currentCategory = 'all'

let searchTimeout; // Used for search debounce

let userToggledSidebar = false
let userToggledCartSidebar = false
let lastWidth = window.innerWidth

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
        badge: null,
        gender: 'women'
    },
    {
        id: 2,
        name: 'Yellow Back-Printed Top',
        category: 'tops',
        price: 2800,
        stock: 50,
        sku: 'TOP-YLW-002',
        image: 'assets/images/products/back-printed-yellow-color-top/back-printed-yellow-color-top-0114168837800.jpg',
        badge: 'New',
        gender: 'women'
    },
    {
        id: 3,
        name: 'Beige Bodycon Dress',
        category: 'dresses',
        price: 5400,
        stock: 18,
        sku: 'DRS-BGE-003',
        image: 'assets/images/products/beige-color-bodycon-dress/beige-color-bodycon-dress-0114168909900.jpg',
        badge: null,
        gender: 'women'
    },
    {
        id: 4,
        name: 'Cutout Bodycon Midi Dress',
        category: 'dresses',
        price: 6200,
        stock: 10,
        sku: 'DRS-MID-004',
        image: 'assets/images/products/cutout-bodycon-midi-dress/cutout-bodycon-midi-dress-010102508243-1.jpg',
        badge: 'Hot',
        gender: 'women'
    },
    {
        id: 5,
        name: 'Light Green Sleeveless Top',
        category: 'tops',
        price: 2400,
        stock: 40,
        sku: 'TOP-GRN-005',
        image: 'assets/images/products/light-green-sleeve-less-top/light-green-sleeve-less-top--0114168964900.jpg',
        badge: null,
        gender: 'women'
    },
    {
        id: 6,
        name: 'Pink Crew Neck T-Shirt',
        category: 'shirts',
        price: 2200,
        stock: 60,
        sku: 'TSH-PNK-006',
        image: 'assets/images/products/pink-color-crew-neck-t-shirt/pink-color-crew-neck-t-shirt--010104518368.jpg',
        badge: null,
        gender: 'women'
    },
    {
        id: 7,
        name: 'Women’s Belted Mini Dress',
        category: 'dresses',
        price: 5300,
        stock: 25,
        sku: 'DRS-MLT-007',
        image: 'assets/images/products/womens-belted-mini-dress/womens-belted-mini-dress-0101141901250.jpg',
        badge: null,
        gender: 'women'
    },
    {
        id: 8,
        name: 'Long Sleeve Round Neck Dress',
        category: 'dresses',
        price: 5800,
        stock: 12,
        sku: 'DRS-LNG-008',
        image: 'assets/images/products/womens-long-sleeve-round-neck-dress2/womens-long-sleeve-round-neck-dress--0114164539600-1.jpg',
        badge: 'Limited',
        gender: 'women'
    },
    {
        id: 9,
        name: 'Women’s Printed Mini Dress',
        category: 'dresses',
        price: 4500,
        stock: 20,
        sku: 'DRS-PRT-009',
        image: 'assets/images/products/womens-printed-mini-dress/womens-printed-mini-dress-0114165105200-1.jpg',
        badge: null,
        gender: 'women'
    },
    {
        id: 10,
        name: 'Striped Casual Dress',
        category: 'dresses',
        price: 4900,
        stock: 28,
        sku: 'DRS-STR-010',
        image: 'assets/images/products/womens-stripe-printed-dress/womens-stripe-printed-dress-0114165129400.jpg',
        badge: 'New',
        gender: 'women'
    },
    {
        id: 11,
        name: 'Striped Summer Dress',
        category: 'dresses',
        price: 4700,
        stock: 30,
        sku: 'DRS-STR-011',
        image: 'assets/images/products/womens-stripe-printed-dress2/womens-stripe-printed-dress-0114165129400-1.jpg',
        badge: null,
        gender: 'women'
    },
    {
        id: 12,
        name: 'White Maxi Dress',
        category: 'dresses',
        price: 6000,
        stock: 14,
        sku: 'DRS-WHT-012',
        image: 'assets/images/products/womens-white-maxi-dress/womens-white-maxi-dress--0114164707700.jpg',
        badge: 'Best Seller',
        gender: 'women'
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
    const toggleSidebarBtn = document.getElementById('toggleSidebar')
    if (toggleSidebarBtn) toggleSidebarBtn.addEventListener('click', toggleSidebar);

    document.querySelectorAll('.gender-filter').forEach(checkbox => {
        checkbox.addEventListener('change', filterAndDisplayProducts)
    });

    const searchInput = document.getElementById('searchInput')
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout)
            searchTimeout = setTimeout(filterAndDisplayProducts, 300) // Delay search to prevent excessive filtering
        })
    }

    const sortDropdown = document.getElementById('sortDropdown')
    if (sortDropdown) sortDropdown.addEventListener('change', filterAndDisplayProducts)

    const gridToggle = document.getElementById('gridToggle')
    if (gridToggle) gridToggle.addEventListener('click', toggleGridView)

    const toggleCartBtn = document.getElementById('toggleCartSidebarBtn')
    if (toggleCartBtn) toggleCartBtn.addEventListener('click', toggleCartSidebar)

    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay) {
        cartOverlay.addEventListener('click', () => {
            const cartSidebar = document.querySelector('.sidebar-cart');
            const productsSection = document.querySelector('.products-section');
            const toggleBtn = document.getElementById('toggleCartSidebarBtn');

            cartSidebar.classList.remove('open');
            productsSection.classList.remove('shrinked');
            toggleBtn.classList.remove('active');
            cartOverlay.classList.remove('active');

            userToggledCartSidebar = false; // Reset user toggle state
        });
    }

    const amountReceived = document.getElementById('amountReceived');
    if (amountReceived) amountReceived.addEventListener('input', calculateChange)

    document.querySelectorAll('.payment-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const method = this.id.replace('PaymentBtn', '')
            selectPaymentMethod(method)
        })
    })


    window.addEventListener('resize', handleResponsiveSidebar)
    handleResponsiveSidebar()

    window.addEventListener('resize', handleResponsiveCartSidebar)
    handleResponsiveCartSidebar()
}

function loadProducts() {
    filterAndDisplayProducts()
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


    const selectedGenders = Array.from(document.querySelectorAll('.gender-filter:checked'))
        .map(cb => cb.dataset.gender);

    if (selectedGenders.length > 0) {
        filtered = filtered.filter(p => selectedGenders.includes(p.gender));
    }

    const sortBy = document.getElementById('sortDropdown').value;
    filtered = sortProducts(filtered, sortBy);

    displayProducts(filtered);
    updateProductCount(filtered.length);
}

function sortProducts(items, sortBy) {
    const sorted = [...items];

    switch (sortBy) {
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

    const searchTerm = document.getElementById('searchInput').value;

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
        'tops': 'Tops',
        'shirts': 'Shirts',
        'dresses': 'Dresses',
        'pants': 'Pants',
        'accessories': 'Accessories',
        'footwear': 'Footwear',
        'outerwear': 'Outerwear',
        'seasonal': 'Seasonal',
        'sale': 'Sale Items'
    };


    document.getElementById('sectionTitle').textContent = categoryNames[category];

    filterAndDisplayProducts();
}

function highlightMatch(text, searchTerm) {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi'); // case-insensitive
    return text.replace(regex, '<mark>$1</mark>');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || product.stock === 0) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity++;
        } else {
            alert('Cannot add more items. Stock limit reached.');
            return;
        }
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            sku: product.sku,
            image: product.image,
            quantity: 1,
            stock: product.stock
        });
    }

    updateCart();
    showStatusMessage(`${product.name} added to cart`, 2000);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    quantity = parseInt(quantity);
    if (quantity < 1) {
        removeFromCart(productId);
    } else if (quantity <= item.stock) {
        item.quantity = quantity;
        updateCart();
    } else {
        alert(`Cannot exceed available stock (${item.stock})`);
    }
}

function updateCart() {
    updateCartDisplay();
    updateCartTotals();
    updateCheckoutModal();
}

function updateCartDisplay() {
    const cartContainer = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartSidebarBadge = document.getElementById('cartSidebarBadge')

    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0)
    cartCount.textContent = totalQty
    if (cartSidebarBadge) cartSidebarBadge.textContent = totalQty

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart text-center py-5">
                <i class="bi bi-cart-x"></i>
                <p class="text-muted">Your cart is empty</p>
            </div>
        `
        document.getElementById('checkoutBtn').disabled = true
        return
    }

    document.getElementById('checkoutBtn').disabled = false

    cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image"><img src="${item.image}" alt="${item.name}" /></div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-variant">SKU: ${item.sku}</div>
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                <div class="cart-item-unit-price">Unit: $${item.price.toFixed(2)}</div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('')
}

function updateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = discountType === 'percent'
        ? (subtotal * discountApplied / 100)
        : discountApplied;
    const taxableAmount = subtotal - discountAmount;
    const tax = taxableAmount * TAX_RATE;
    const serviceCharge = taxableAmount * SERVICE_CHARGE_RATE;
    const total = taxableAmount + tax + serviceCharge;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('serviceCharge').textContent = `$${serviceCharge.toFixed(2)}`;
    document.getElementById('totalAmount').textContent = `$${total.toFixed(2)}`;
}

function applyDiscount() {
    const amount = parseFloat(document.getElementById('discountAmount').value) || 0;
    discountType = document.getElementById('discountType').value;

    if (amount < 0) {
        alert('Discount cannot be negative');
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (discountType === 'percent' && amount > 100) {
        alert('Discount percentage cannot exceed 100%');
        return;
    }

    if (discountType === 'fixed' && amount > subtotal) {
        alert('Discount cannot exceed subtotal');
        return;
    }

    discountApplied = amount;
    updateCartTotals();
    updateCheckoutModal();
    showStatusMessage('Discount applied', 2000);
}


function updateCheckoutModal() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = discountType === 'percent'
        ? (subtotal * discountApplied / 100)
        : discountApplied;
    const taxableAmount = subtotal - discountAmount;
    const tax = taxableAmount * TAX_RATE;
    const serviceCharge = taxableAmount * SERVICE_CHARGE_RATE;
    const total = taxableAmount + tax + serviceCharge;

    document.getElementById('checkoutItems').textContent = cart.length;
    document.getElementById('checkoutSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkoutTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('checkoutTotal').textContent = `$${total.toFixed(2)}`;

    if (discountAmount > 0) {
        document.getElementById('checkoutDiscountRow').style.display = 'flex';
        document.getElementById('checkoutDiscount').textContent = `-$${discountAmount.toFixed(2)}`;
    } else {
        document.getElementById('checkoutDiscountRow').style.display = 'none';
    }

    document.getElementById('orderNumber').textContent = String(Math.floor(Math.random() * 90000) + 10000);
}

function selectPaymentMethod(method) {
    selectedPaymentMethod = method;

    document.querySelectorAll('.payment-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(method + 'PaymentBtn').classList.add('active');

    document.querySelectorAll('.payment-panel').forEach(panel => {
        panel.classList.add('d-none');
    });

    const panelId = method === 'gift' ? 'giftPanel' : method + 'Panel';
    const panel = document.getElementById(panelId);
    if (panel) {
        panel.classList.remove('d-none');
    }

    document.getElementById('completeSaleBtn').disabled = false;
}

function setQuickAmount(amount) {
    const current = parseFloat(document.getElementById('amountReceived').value) || 0;
    document.getElementById('amountReceived').value = (current + amount).toFixed(2);
    calculateChange();
}

function calculateChange() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = discountType === 'percent'
        ? (subtotal * discountApplied / 100)
        : discountApplied;
    const taxableAmount = subtotal - discountAmount;
    const tax = taxableAmount * TAX_RATE;
    const serviceCharge = taxableAmount * SERVICE_CHARGE_RATE;
    const total = taxableAmount + tax + serviceCharge;

    const amountReceived = parseFloat(document.getElementById('amountReceived').value) || 0;
    const change = Math.max(0, amountReceived - total);

    document.getElementById('changeDue').textContent = `$${change.toFixed(2)}`;
}

function completeSale() {
    if (!selectedPaymentMethod) {
        alert('Please select a payment method');
        return;
    }

    if (selectedPaymentMethod === 'cash') {
        const amountReceived = parseFloat(document.getElementById('amountReceived').value);
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discountAmount = discountType === 'percent'
            ? (subtotal * discountApplied / 100)
            : discountApplied;
        const taxableAmount = subtotal - discountAmount;
        const tax = taxableAmount * TAX_RATE;
        const serviceCharge = taxableAmount * SERVICE_CHARGE_RATE;
        const total = taxableAmount + tax + serviceCharge;

        if (amountReceived < total) {
            alert('Insufficient payment amount');
            return;
        }
    }

    generateReceipt();

    const checkoutModal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
    checkoutModal.hide();

    const receiptModal = new bootstrap.Modal(document.getElementById('receiptModal'));
    receiptModal.show();

    setTimeout(() => {
        resetCart();
    }, 1000);

    showStatusMessage('Order completed successfully!', 3000);
}

function generateReceipt() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = discountType === 'percent'
        ? (subtotal * discountApplied / 100)
        : discountApplied;
    const taxableAmount = subtotal - discountAmount;
    const tax = taxableAmount * TAX_RATE;
    const serviceCharge = taxableAmount * SERVICE_CHARGE_RATE;
    const total = taxableAmount + tax + serviceCharge;

    const orderNumber = document.getElementById('orderNumber').textContent;
    const timestamp = new Date().toLocaleString();

    const receiptHTML = `
        <div style="text-align: center; font-family: monospace;">
            <h5>FASHIONRACK POS</h5>
            <p>================================</p>
            <p><strong>Order #${orderNumber}</strong></p>
            <p>${timestamp}</p>
            <p>================================</p>
            
            <table style="width: 100%; margin: 15px 0;">
                <tr>
                    <th style="text-align: left;">Item</th>
                    <th style="text-align: center;">Qty</th>
                    <th style="text-align: right;">Total</th>
                </tr>
                ${cart.map(item => `
                    <tr>
                        <td style="text-align: left;">${item.name}</td>
                        <td style="text-align: center;">${item.quantity}</td>
                        <td style="text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                `).join('')}
            </table>
            
            <p>================================</p>
            <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
            ${discountAmount > 0 ? `<p><strong>Discount:</strong> -$${discountAmount.toFixed(2)}</p>` : ''}
            <p><strong>Tax (10%):</strong> $${tax.toFixed(2)}</p>
            <p><strong>Service Charge:</strong> $${serviceCharge.toFixed(2)}</p>
            <p>================================</p>
            <p style="font-size: 1.2rem;"><strong>TOTAL: $${total.toFixed(2)}</strong></p>
            <p>================================</p>
            
            <p><strong>Payment Method:</strong> ${selectedPaymentMethod.toUpperCase()}</p>
            ${selectedPaymentMethod === 'cash' ? `
                <p><strong>Change Due:</strong> $${(parseFloat(document.getElementById('amountReceived').value || 0) - total).toFixed(2)}</p>
            ` : ''}
            
            <p style="margin-top: 20px;">Thank you for your purchase!</p>
            <p>Please visit us again.</p>
        </div>
    `;

    document.getElementById('receiptContent').innerHTML = receiptHTML;
}

function printReceipt() {
    window.print();
}

function emailReceipt() {
    alert('Email functionality would be implemented with backend integration');
}

function resetCart() {
    cart = [];
    discountApplied = 0;
    discountType = 'fixed';
    selectedPaymentMethod = null;

    document.getElementById('discountAmount').value = '';
    document.getElementById('discountType').value = 'fixed';
    document.getElementById('amountReceived').value = '';
    document.getElementById('cardRefId').value = '';

    updateCart();
}

function populateCustomerSelect() {
    const select = document.getElementById('customerSelect');
    const options = '<option value="">Walk-in Customer</option>' +
        customers.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    select.innerHTML = options;
}

function saveCustomer() {
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const email = document.getElementById('customerEmail').value;
    const address = document.getElementById('customerAddress').value;

    if (!name.trim()) {
        alert('Please enter customer name');
        return;
    }

    const newCustomer = {
        id: customers.length + 1,
        name,
        phone,
        email,
        address
    };

    customers.push(newCustomer);

    document.getElementById('customerForm').reset();
    const modal = bootstrap.Modal.getInstance(document.getElementById('customerModal'));
    modal.hide();

    populateCustomerSelect();
    showStatusMessage('Customer added successfully', 2000);
}

function saveProduct() {
    const name = document.getElementById('productName').value;
    const category = document.getElementById('productCategory').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const stock = parseInt(document.getElementById('productStock').value);
    const sku = document.getElementById('productSku').value;

    if (!name.trim() || !category || !price || !stock || !sku.trim()) {
        alert('Please fill all required fields');
        return;
    }

    const newProduct = {
        id: products.length + 1,
        name,
        category,
        price,
        stock,
        sku,
        image: '📦',
        badge: null
    };

    products.push(newProduct);

    document.getElementById('productForm').reset();
    const modal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
    modal.hide();

    filterAndDisplayProducts();
    showStatusMessage('Product added successfully', 2000);
}

function saveSettings() {
    const taxRate = parseFloat(document.getElementById('taxRate').value) / 100;
    // In a real app, these would be saved to localStorage or backend
    showStatusMessage('Settings saved', 2000);
}

function toggleGridView() {
    const container = document.getElementById('productsContainer');
    const isGridView = container.classList.contains('grid-view');

    if (isGridView) {
        container.classList.remove('grid-view');
    } else {
        container.classList.add('grid-view');
    }
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar-categories')
    const toggleBtn = document.getElementById('toggleSidebar')
    const productsSection = document.querySelector('.products-section')

    const isCollapsed = sidebar.classList.toggle('collapsed')

    if (isCollapsed) {
        toggleBtn.classList.add('collapsed')
        productsSection.classList.add('expanded')
    }
    else {
        toggleBtn.classList.remove('collapsed')
        productsSection.classList.remove('expanded')
    }


    userToggledSidebar = true
}

function handleResponsiveSidebar() {
    const sidebar = document.querySelector('.sidebar-categories')
    const toggleBtn = document.getElementById('toggleSidebar')
    const productsSection = document.querySelector('.products-section')
    const width = window.innerWidth

    console.log("Responsive handler triggered, width:", width);
    if ((lastWidth >= 992 && width < 992) || (lastWidth < 992 && width >= 992)) userToggledSidebar = false

    lastWidth = width;

    if (userToggledSidebar) return

    if (width < 992) {
        sidebar.classList.add('collapsed')
        toggleBtn.classList.add('collapsed')

        productsSection.classList.add('expanded')
    } else {
        sidebar.classList.remove('collapsed')
        toggleBtn.classList.remove('collapsed')

        productsSection.classList.remove('expanded')
    }
}

function toggleCartSidebar() {
    const cartSidebar = document.querySelector('.sidebar-cart');
    const productsSection = document.querySelector('.products-section');
    const toggleBtn = document.getElementById('toggleCartSidebarBtn');
    const cartOverlay = document.getElementById('cartOverlay');

    const isOpen = cartSidebar.classList.toggle('open');

    if (isOpen) {
        toggleBtn.classList.add('active');
        productsSection.classList.add('shrinked');

        if (window.innerWidth < 992) {
            cartOverlay.classList.add('active')
        }
    } else {
        toggleBtn.classList.remove('active');
        productsSection.classList.remove('shrinked')

        cartOverlay.classList.remove('active')
    }

    userToggledCartSidebar = true
}

function handleResponsiveCartSidebar() {
    const cartSidebar = document.querySelector('.sidebar-cart');
    const productsSection = document.querySelector('.products-section');
    const width = window.innerWidth;

    if (!userToggledCartSidebar) {
        if (width < 992) {
            cartSidebar.classList.remove('open');
            productsSection.classList.remove('shrinked');
        } else {
            cartSidebar.classList.add('open');
            productsSection.classList.add('shrinked');
        }
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

function logoutUser() {
    if (confirm('Are you sure you want to logout?')) {
        showStatusMessage('Logged out', 2000)
        // In a real app, this would redirect to login page
    }
}

function showStatusMessage(message, duration = 3000) {
    const statusEl = document.getElementById('statusMessage')
    statusEl.textContent = message
    setTimeout(() => {
        statusEl.textContent = ''
    }, duration)
}

window.addEventListener('load', () => {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});
