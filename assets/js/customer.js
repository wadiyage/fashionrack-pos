let editingCustomerId = null

function populateCustomerSelect() {
    const select = document.getElementById('customerSelect')
    if (!select) return

    const options = [
        `<option value="">Walk-in Customer</option>`, 
        ...customers.map(c => `<option value="${c.id}">${c.name}</option>`)
    ]

    const prev = select.value
    select.innerHTML = options.join('')
    if (prev) select.value = prev
}

function renderCustomersTable(list = null) {
    const tbody = document.getElementById('customersTableBody')
    if(!tbody) return

    const data = Array.isArray(list) ? list : customers

    if (!data || data.length === 0) {
        tbody.innerHTML = `
        <tr> 
            <td colspan="5" class="text-center text-muted">No customers found.</td>
        </tr>
        `
        return
    }

    const rows = data.map((c, idx) => {
        return `
        <tr>
            <td>${idx + 1}</td>
            <td>${escapeHtml(c.name || '')}</td>
            <td>${escapeHtml(c.phone || '')}</td>
            <td>${escapeHtml(c.email || '')}</td>
            <td>
                <div class="btn-group" role="group">
                    <button class="btn btn-sm btn-outline-primary" onClick="editCustomer(${c.id})"><i class="bi bi-pencil"></i>Edit</button>
                    <button class="btn btn-sm btn-outline-danger" onClick="deleteCustomer(${c.id})"><i class="bi bi-trash"></i>Delete</button>
                </div>
            </td>
        </tr>
        `
    }).join('')

    tbody.innerHTML = rows
}

function saveCustomer() {
    const name = document.getElementById('customerName').value.trim()
    const phone = document.getElementById('customerPhone').value.trim()
    const email = document.getElementById('customerEmail').value.trim()
    const address = document.getElementById('customerAddress').value.trim()

    if (!name) {
        alert('Please enter customer name')
        return
    }

    if (editingCustomerId) {
        const idx = customers.findIndex(c => c.id === editingCustomerId)
        if (idx !== -1) {
            customers[idx] = Object.assign({}, customers[idx], { name, phone, email, address })
            saveCustomersToStorage()
            renderCustomersTable()
            populateCustomerSelect()
            showStatusMessage('Customer updated', 2000)
        }
    } else {
        const newId = (customers.reduce((m, c) => Math.max(m, c.id || 0), 0) || 0) + 1
        const newCustomer = {
            id: newId,
            name,
            phone,
            email,
            address
        }

        customers.push(newCustomer)
        saveCustomersToStorage()
        renderCustomersTable()
        populateCustomerSelect()
        showStatusMessage('Customer updated', 2000)
    }

    editingCustomerId = null
    document.getElementById('customerForm').reset()
    const modalEl = document.getElementById('customerModal')
    const modal = bootstrap.Modal.getInstance(modalEl)
    if (modal) modal.hide()
}

function editCustomer(id) {
    const c = customers.find(x => x.id === id)
    if (!c) return

    editingCustomerId = id
    document.getElementById('customerName').value = c.name || ''
    document.getElementById('customerPhone').value = c.phone || ''
    document.getElementById('customerEmail').value = c.email || ''
    document.getElementById('customerAddress').value = c.address || ''

    document.getElementById('customerModalLabel').textContent = 'Edit Customer'
    const modalEl = document.getElementById('customerModal')
    const modal = new bootstrap.Modal(modalEl)
    modal.show()
}

function deleteCustomer(id) {
    const c = customers.find(x => x.id === id)
    if (!c) return

    if (!confirm(`Are you sure you want to delete customer "${c.name}"?`)) return

    customers = customers.filter(x => x.id !== id)
    saveCustomersToStorage()
    renderCustomersTable()
    populateCustomerSelect()

    const select = document.getElementById('customerSelect')
    if (select && select.value == id) select.value = ''

    showStatusMessage('Customer deleted', 2000)
}

function filterCustomers(searchTerm) {
    const term = (searchTerm || '').toLowerCase().trim()
    if (!term) {
        renderCustomersTable()
        return
    }

    const filtered = customers.filter(c => {
        return (c.name || '').toLowerCase().includes(term) ||
            (c.phone || '').toLowerCase().includes(term) ||
            (c.email || '').toLowerCase().includes(term)
    })

    renderCustomersTable(filtered)
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

document.addEventListener('DOMContentLoaded', () => {
    const search = document.getElementById('customerSearchInput')
    if (search) {
        let t
        search.addEventListener('input', (e) => {
            clearTimeout(t)
            t = setTimeout(() => filterCustomers(e.target.value), 250)
        })
    }

    const addBtn = document.getElementById('addCustomerBtn')
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            editingCustomerId = null
            document.getElementById('customerForm').reset()
            document.getElementById('customerModalLabel').textContent = 'Add Customer'
        })
    }

    const customersPage = document.getElementById('customersPage')
    if (customersPage) {
        const mo = new MutationObserver(() => {
            const isHidden = customersPage.classList.contains('d-none')
            if (!isHidden) renderCustomersTable()
        })
        mo.observe(customersPage, { attributes: true, attributeFilter: ['class'] })
    }

    if(!document.getElementById('customersPage').classList.contains('d-none')) renderCustomersTable()
})