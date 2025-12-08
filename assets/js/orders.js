function updateCheckoutModal() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const discountAmount = discountType === 'percent'
        ? (subtotal * discountApplied / 100)
        : discountApplied
    const taxableAmount = subtotal - discountAmount
    const tax = taxableAmount * TAX_RATE
    const serviceCharge = taxableAmount * SERVICE_CHARGE_RATE
    const total = taxableAmount + tax + serviceCharge

    document.getElementById('checkoutItems').textContent = cart.length
    document.getElementById('checkoutSubtotal').textContent = `$${subtotal.toFixed(2)}`
    document.getElementById('checkoutTax').textContent = `$${tax.toFixed(2)}`
    document.getElementById('checkoutTotal').textContent = `$${total.toFixed(2)}`

    if (discountAmount > 0) {
        document.getElementById('checkoutDiscountRow').style.display = 'flex'
        document.getElementById('checkoutDiscount').textContent = `-$${discountAmount.toFixed(2)}`
    } else {
        document.getElementById('checkoutDiscountRow').style.display = 'none'
    }

    document.getElementById('orderNumber').textContent = String(Math.floor(Math.random() * 90000) + 10000)
}

function selectPaymentMethod(method) {
    selectedPaymentMethod = method

    document.querySelectorAll('.payment-btn').forEach(btn => {
        btn.classList.remove('active')
    })
    document.getElementById(method + 'PaymentBtn').classList.add('active')

    document.querySelectorAll('.payment-panel').forEach(panel => {
        panel.classList.add('d-none')
    })

    const panelId = method === 'gift' ? 'giftPanel' : method + 'Panel'
    const panel = document.getElementById(panelId)
    if (panel) {
        panel.classList.remove('d-none')
    }

    document.getElementById('completeSaleBtn').disabled = false
}

function setQuickAmount(amount) {
    const current = parseFloat(document.getElementById('amountReceived').value) || 0
    document.getElementById('amountReceived').value = (current + amount).toFixed(2)
    calculateChange()
}

function calculateChange() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const discountAmount = discountType === 'percent'
        ? (subtotal * discountApplied / 100)
        : discountApplied
    const taxableAmount = subtotal - discountAmount
    const tax = taxableAmount * TAX_RATE
    const serviceCharge = taxableAmount * SERVICE_CHARGE_RATE
    const total = taxableAmount + tax + serviceCharge

    const amountReceived = parseFloat(document.getElementById('amountReceived').value) || 0
    const change = Math.max(0, amountReceived - total)

    document.getElementById('changeDue').textContent = `$${change.toFixed(2)}`
}

function completeSale() {
    if (!selectedPaymentMethod) {
        alert('Please select a payment method')
        return;
    }

    if (selectedPaymentMethod === 'cash') {
        const amountReceived = parseFloat(document.getElementById('amountReceived').value)
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        const discountAmount = discountType === 'percent'
            ? (subtotal * discountApplied / 100)
            : discountApplied
        const taxableAmount = subtotal - discountAmount
        const tax = taxableAmount * TAX_RATE
        const serviceCharge = taxableAmount * SERVICE_CHARGE_RATE
        const total = taxableAmount + tax + serviceCharge

        if (amountReceived < total) {
            alert('Insufficient payment amount')
            return
        }
    }

    generateReceipt();

    const checkoutModal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'))
    checkoutModal.hide()

    const receiptModal = new bootstrap.Modal(document.getElementById('receiptModal'))
    receiptModal.show()

    setTimeout(() => {
        resetCart();
    }, 1000)

    showStatusMessage('Order completed successfully!', 3000)
}

function generateReceipt() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const discountAmount = discountType === 'percent'
        ? (subtotal * discountApplied / 100)
        : discountApplied
    const taxableAmount = subtotal - discountAmount;
    const tax = taxableAmount * TAX_RATE;
    const serviceCharge = taxableAmount * SERVICE_CHARGE_RATE
    const total = taxableAmount + tax + serviceCharge

    const orderNumber = document.getElementById('orderNumber').textContent
    const timestamp = new Date().toLocaleString()

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
    `

    document.getElementById('receiptContent').innerHTML = receiptHTML
}

function printReceipt() {
    window.print()
}

function emailReceipt() {
    alert('Email functionality would be implemented with backend integration')
}