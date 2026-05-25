// Real-time monitoring & interactions

document.addEventListener('DOMContentLoaded', function () {

    // Untuk halaman dashboard.html
    if (window.location.pathname.includes('dashboard.html')) {
        setInterval(refreshStock, 30000);
    }

    // Confirm delete
    const deleteLinks = document.querySelectorAll('.danger');

    deleteLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            if (!confirm('Yakin hapus data ini?')) {
                e.preventDefault();
            }
        });
    });

    // Form validation
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function (e) {

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

});

// Dummy refresh stock
function refreshStock() {
    console.log('Refresh stock berjalan...');
}

// Browser notification
function showNotification(title, body) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, { body });
    }
}
