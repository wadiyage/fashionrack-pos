function showStatusMessage(message, duration = 3000) {
    const statusEl = document.getElementById('statusMessage')
    statusEl.textContent = message
    setTimeout(() => {
        statusEl.textContent = ''
    }, duration)
}