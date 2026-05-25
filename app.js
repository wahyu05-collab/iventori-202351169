// Real-time monitoring & interactions

document.addEventListener('DOMContentLoaded', function() {
    // Poll stock every 30s on dashboard
    if (window.location.pathname.includes('dashboard.php')) {
        setInterval(refreshStock, 30000); // 30s
    }

    // Confirm deletes
    const deleteLinks = document.querySelectorAll('.danger');
    deleteLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!confirm('Yakin hapus data ini?')) {
                e.preventDefault();
            }
        });
    });
});

function refreshStock() {
    fetch('api/stock.php')  // Future API
        .then(res => res.json())
        .then(data => {
            // Update table rows
            const rows = document.querySelectorAll('.table tbody tr');
            rows.forEach((row, index) => {
                if (data[index]) {
                    row.cells[2].textContent = parseInt(data[index].stok, 10);  // Update stok col (integer)
                    if (data[index].stok <= data[index].stok_min) {
                        row.classList.add('low-stock');
                    } else {
                        row.classList.remove('low-stock');
                    }
                }
            });
        })
        .catch(err => console.error('Refresh failed', err));
}

// Low stock notification (browser)
function showNotification(title, body) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, {body});
    }
}

// Form validations
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        const required = form.querySelectorAll('[required]');
        let valid = true;
        required.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'red';
                valid = false;
            } else {
                input.style.borderColor = '#ddd';
            }
        });
        if (!valid) {
            e.preventDefault();
            alert('Lengkapi field wajib!');
        }
    });
});

