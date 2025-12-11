function addToCart(productId) {
    const product = products.find(p => p.id === productId)
    if (!product || product.stock === 0) return

    const existingItem = cart.find(item => item.id === productId)

    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity++
        } else {
            alert('Cannot add more items. Stock limit reached.')
            return
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
        })
    }

    updateCart()
    saveCartToStorage()
    showStatusMessage(`${product.name} added to cart`, 2000)
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId)
    updateCart()
    saveCartToStorage()
}

function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId)
    if (!item) return

    quantity = parseInt(quantity)
    if (quantity < 1) {
        removeFromCart(productId)
    } else if (quantity <= item.stock) {
        item.quantity = quantity
        updateCart()
        saveCartToStorage()
    } else {
        alert(`Cannot exceed available stock (${item.stock})`)
    }
}

function updateCart() {
    updateCartDisplay()
    updateCartTotals()
    updateCheckoutModal()
}

function updateCartDisplay() {
    const cartContainer = document.getElementById('cartItems')
    const cartCount = document.getElementById('cartCount')
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
                <div class="cart-item-price">LKR ${(item.price * item.quantity).toFixed(2)}</div>
                <div class="cart-item-unit-price">Unit: LKR ${item.price.toFixed(2)}</div>
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
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const discountAmount = discountType === 'percent'
        ? (subtotal * discountApplied / 100)
        : discountApplied
    const taxableAmount = subtotal - discountAmount
    const tax = taxableAmount * TAX_RATE
    const serviceCharge = taxableAmount * SERVICE_CHARGE_RATE
    const total = taxableAmount + tax + serviceCharge

    document.getElementById('subtotal').textContent = `LKR ${subtotal.toFixed(2)}`
    document.getElementById('tax').textContent = `LKR ${tax.toFixed(2)}`
    document.getElementById('serviceCharge').textContent = `LKR ${serviceCharge.toFixed(2)}`
    document.getElementById('totalAmount').textContent = `LKR ${total.toFixed(2)}`
}

function applyDiscount() {
    const amount = parseFloat(document.getElementById('discountAmount').value) || 0
    discountType = document.getElementById('discountType').value

    if (amount < 0) {
        alert('Discount cannot be negative')
        return
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    if (discountType === 'percent' && amount > 100) {
        alert('Discount percentage cannot exceed 100%')
        return
    }

    if (discountType === 'fixed' && amount > subtotal) {
        alert('Discount cannot exceed subtotal')
        return
    }

    discountApplied = amount
    updateCartTotals()
    updateCheckoutModal()
    showStatusMessage('Discount applied', 2000)
}

function resetCart() {
    cart = []
    discountApplied = 0
    discountType = 'fixed'
    selectedPaymentMethod = null

    document.getElementById('discountAmount').value = ''
    document.getElementById('discountType').value = 'fixed'
    document.getElementById('amountReceived').value = ''
    document.getElementById('cardRefId').value = ''

    updateCart()
    saveCartToStorage()
}