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
    const cartSidebar = document.querySelector('.sidebar-cart')
    const productsSection = document.querySelector('.products-section')
    const toggleBtn = document.getElementById('toggleCartSidebarBtn')
    const cartOverlay = document.getElementById('cartOverlay')

    const isOpen = cartSidebar.classList.toggle('open')

    if (isOpen) {
        toggleBtn.classList.add('active')
        productsSection.classList.add('shrinked')

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
    const cartSidebar = document.querySelector('.sidebar-cart')
    const productsSection = document.querySelector('.products-section')
    const width = window.innerWidth;

    if (!userToggledCartSidebar) {
        if (width < 992) {
            cartSidebar.classList.remove('open')
            productsSection.classList.remove('shrinked')
        } else {
            cartSidebar.classList.add('open')
            productsSection.classList.add('shrinked')
        }
    }
}

function toggleGridView() {
    const container = document.getElementById('productsContainer')
    const isGridView = container.classList.contains('grid-view')

    if (isGridView) {
        container.classList.remove('grid-view')
    } else {
        container.classList.add('grid-view')
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode')
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'))
}

function logoutUser() {
    if (confirm('Are you sure you want to logout?')) {
        showStatusMessage('Logged out', 2000)
    }
}

function setupEventListeners() {
    const toggleSidebarBtn = document.getElementById('toggleSidebar')
    if (toggleSidebarBtn) toggleSidebarBtn.addEventListener('click', toggleSidebar)

    document.querySelectorAll('.gender-filter').forEach(checkbox => {
        checkbox.addEventListener('change', filterAndDisplayProducts)
    })

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

    const cartOverlay = document.getElementById('cartOverlay')
    if (cartOverlay) {
        cartOverlay.addEventListener('click', () => {
            const cartSidebar = document.querySelector('.sidebar-cart')
            const productsSection = document.querySelector('.products-section')
            const toggleBtn = document.getElementById('toggleCartSidebarBtn')

            cartSidebar.classList.remove('open')
            productsSection.classList.remove('shrinked')
            toggleBtn.classList.remove('active')
            cartOverlay.classList.remove('active')

            userToggledCartSidebar = false
        });
    }

    const amountReceived = document.getElementById('amountReceived')
    if (amountReceived) amountReceived.addEventListener('input', calculateChange)

    document.querySelectorAll('.payment-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const method = this.id.replace('PaymentBtn', '')
            selectPaymentMethod(method)
        })
    })

    const navProducts = document.getElementById('navProducts')
    navProducts?.addEventListener('click', () => {
        showPage('productsPage')
    })

    const navCustomers = document.getElementById('navCustomers')
    navCustomers?.addEventListener('click', () => {
        showPage('customersPage')
    })

    const navOrders = document.getElementById('navOrders')
    navOrders?.addEventListener('click', () => {
        showPage('ordersPage')
    })

    window.addEventListener('resize', handleResponsiveSidebar)
    handleResponsiveSidebar()

    window.addEventListener('resize', handleResponsiveCartSidebar)
    handleResponsiveCartSidebar()
}

function saveSettings() {
    const taxRate = parseFloat(document.getElementById('taxRate').value) / 100
    // In a real app, these would be saved to localStorage or backend
    showStatusMessage('Settings saved', 2000)
}

function showPage(page) {
    const pages = ['productsPage', 'customersPage', 'ordersPage']

    pages.forEach(p => {
        document.getElementById(p).classList.add('d-none')
    })

    const activePage = document.getElementById(page)
    activePage.classList.remove('d-none')

    const headerHeight = document.querySelector('header').offsetHeight

    window.scrollTo({
        top: activePage.offsetTop - headerHeight,
        behavior: 'smooth'
    })
}