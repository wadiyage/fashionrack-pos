const STORAGE_KEYS = {
    PRODUCTS: 'products',
    CUSTOMERS: 'customers',
    CART: 'cart'
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
    products = loadFromStorage(STORAGE_KEYS.PRODUCTS, sampleProducts)

    const storedCustomers = loadFromStorage(STORAGE_KEYS.CUSTOMERS, sampleCustomers)
    customers = storedCustomers.length ? storedCustomers : JSON.parse(JSON.stringify(sampleCustomers))

    cart = loadFromStorage(STORAGE_KEYS.CART, [])
}

function loadFromStorage(key, fallback) {
    const raw = localStorage.getItem(key)
    if(!raw) {
        localStorage.setItem(key, JSON.stringify(fallback))
        return JSON.parse(JSON.stringify(fallback))
    }
    return JSON.parse(raw)
}

function clearAllStorage() {
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS)
    localStorage.removeItem(STORAGE_KEYS.CUSTOMERS)
    localStorage.removeItem(STORAGE_KEYS.CART)
}