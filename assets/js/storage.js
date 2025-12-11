const STORAGE_KEYS = {
    PRODUCTS: 'pos_products',
    CUSTOMERS: 'pos_customers',
    CART: 'pos_cart'
}

function saveProductsToStorage() {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products))
}

function saveCustomersToStorage() {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers))
}

function saveCartToStorage() {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart))
}

function loadProductsFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS)
    return stored ? JSON.parse(stored) : []
}

function loadCustomersFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEYS.CUSTOMERS)
    return stored ? JSON.parse(stored) : []
}

function loadCartFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEYS.CART)
    return stored ? JSON.parse(stored) : []
}

function initializeStorage(sampleProducts, sampleCustomers) {
    const storedProducts = loadProductsFromStorage()
    const storedCustomers = loadCustomersFromStorage()

    if (!storedProducts || storedProducts.length === 0) {
        products = JSON.parse(JSON.stringify(sampleProducts))
        saveProductsToStorage()
    } else {
        products = storedProducts
    }

    if (!storedCustomers || storedCustomers.length === 0) {
        customers = JSON.parse(JSON.stringify(sampleCustomers))
        saveCustomersToStorage()
    } else {
        customers = storedCustomers
    }

    cart = loadCartFromStorage()
}

function clearAllStorage() {
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS)
    localStorage.removeItem(STORAGE_KEYS.CUSTOMERS)
    localStorage.removeItem(STORAGE_KEYS.CART)
}