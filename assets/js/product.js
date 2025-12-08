function highlightMatch(text, searchTerm) {
    if (!searchTerm) return text
    const regex = new RegExp(`(${searchTerm})`, 'gi')
    return text.replace(regex, '<mark>$1</mark>')
}

function loadProducts() {
    filterAndDisplayProducts()
}

function filterAndDisplayProducts() {
    let filtered = products

    if (currentCategory !== 'all') {
        filtered = filtered.filter(p => p.category === currentCategory)
    }

    const searchTerm = document.getElementById('searchInput').value.toLowerCase()
    if (searchTerm) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchTerm) ||
            p.sku.toLowerCase().includes(searchTerm)
        )
    }


    const selectedGenders = Array.from(document.querySelectorAll('.gender-filter:checked'))
        .map(cb => cb.dataset.gender)

    if (selectedGenders.length > 0) {
        filtered = filtered.filter(p => selectedGenders.includes(p.gender))
    }

    const sortBy = document.getElementById('sortDropdown').value
    filtered = sortProducts(filtered, sortBy)

    displayProducts(filtered);
    updateProductCount(filtered.length)
}

function sortProducts(items, sortBy) {
    const sorted = [...items]

    switch (sortBy) {
        case 'name':
            sorted.sort((a, b) => a.name.localeCompare(b.name))
            break
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price)
            break
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price)
            break
        case 'newest':
            sorted.sort((a, b) => b.id - a.id)
            break
        default:
    }

    return sorted
}

function displayProducts(items) {
    const container = document.getElementById('productsContainer')
    const emptyState = document.getElementById('emptyState')
    const loadingState = document.getElementById('loadingState')

    if (items.length === 0) {
        container.innerHTML = ''
        emptyState.classList.remove('d-none')
        return
    }

    emptyState.classList.add('d-none')
    loadingState.classList.add('d-none')

    container.innerHTML = items.map(product => createProductCard(product)).join('')
}

function createProductCard(product) {
    const stockClass = product.stock === 0 ? 'stock-out' : product.stock < 10 ? 'stock-low' : ''
    const stockText = product.stock === 0 ? 'Out of Stock' : product.stock < 10 ? `Only ${product.stock} left` : 'In Stock'

    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || ''
    const name = highlightMatch(product.name, searchTerm)
    const sku = highlightMatch(product.sku, searchTerm)

    return `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}"/>
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <div class="product-name">${name}</div>
                <div class="product-price">LKR ${product.price.toFixed(2)}</div>
                <div class="product-sku">SKU: ${sku}</div>
                <div class="product-stock ${stockClass}">${stockText}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
                    Add to Cart
                </button>
            </div>
        </div>
    `
}

function updateProductCount(count) {
    document.getElementById('productCount').textContent = count
}

function filterProducts(category) {
    currentCategory = category

    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.toggle('active',item.dataset.category === category)
    })

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
    }


    document.getElementById('sectionTitle').textContent = categoryNames[category]

    filterAndDisplayProducts()
}

function saveProduct() {
    const name = document.getElementById('productName').value
    const category = document.getElementById('productCategory').value
    const price = parseFloat(document.getElementById('productPrice').value)
    const stock = parseInt(document.getElementById('productStock').value)
    const sku = document.getElementById('productSku').value

    if (!name.trim() || !category || !price || !stock || !sku.trim()) {
        alert('Please fill all required fields')
        return
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
    }

    products.push(newProduct)

    document.getElementById('productForm').reset()
    const modal = bootstrap.Modal.getInstance(document.getElementById('productModal'))
    modal.hide()

    filterAndDisplayProducts()
    showStatusMessage('Product added successfully', 2000)
}