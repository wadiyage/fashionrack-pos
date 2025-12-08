function populateCustomerSelect() {
    const select = document.getElementById('customerSelect')
    const options = '<option value="">Walk-in Customer</option>' +
        customers.map(c => `<option value="${c.id}">${c.name}</option>`).join('')
    select.innerHTML = options
}

function saveCustomer() {
    const name = document.getElementById('customerName').value
    const phone = document.getElementById('customerPhone').value
    const email = document.getElementById('customerEmail').value
    const address = document.getElementById('customerAddress').value

    if (!name.trim()) {
        alert('Please enter customer name')
        return
    }

    const newCustomer = {
        id: customers.length + 1,
        name,
        phone,
        email,
        address
    }

    customers.push(newCustomer)

    document.getElementById('customerForm').reset()
    const modal = bootstrap.Modal.getInstance(document.getElementById('customerModal'))
    modal.hide()

    populateCustomerSelect()
    showStatusMessage('Customer added successfully', 2000)
}