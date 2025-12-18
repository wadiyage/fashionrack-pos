let products = []
let customers = []

let cart = []

let orders = []
let currentFilteredOrders = []

let currentCategory = 'all'

let searchTimeout

let userToggledSidebar = false
let userToggledCartSidebar = false
let lastWidth = window.innerWidth

let selectedPaymentMethod = null
let discountApplied = 0
let discountType = 'fixed'

const TAX_RATE = 0.10
const SERVICE_CHARGE_RATE = 0

document.addEventListener('DOMContentLoaded', initializeApp)

function initializeApp() {
    initializeStorage(sampleProducts, sampleCustomers)

    loadProducts();
    setupEventListeners();
    populateCustomerSelect();

    if(typeof renderCustomersTable === 'function') renderCustomersTable()
    showStatusMessage('System ready', 3000);
}

window.addEventListener('load', () => {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode')
    }
})

