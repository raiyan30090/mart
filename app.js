// Toggle Balance Visibility
function toggleBalance() {
    const balanceText = document.getElementById('balance-text');
    if (balanceText) {
        if (balanceText.innerText === '৳ ***') {
            balanceText.innerText = '৳ 5,250.00';
        } else {
            balanceText.innerText = '৳ ***';
        }
    }
}

// Show Alert Message for Feature Buttons
function openFeature(featureName) {
    alert(`"${featureName}" ফিচারটি শীঘ্রই আসছে!`);
}

// Handle Login Form Submission & Role-based Redirection
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const roleSelect = document.getElementById('user-role');
            const selectedRole = roleSelect ? roleSelect.value : 'reseller';

            if (selectedRole === 'admin') {
                window.location.href = 'dashboard.html';
            } else if (selectedRole === 'reseller') {
                window.location.href = 'reseller-dashboard.html';
            } else {
                window.location.href = 'index.html';
            }
        });
    }
});

// Toggle Balance Visibility
function toggleBalance() {
    const balanceText = document.getElementById('balance-text');
    if (balanceText) {
        if (balanceText.innerText === '৳ ***') {
            balanceText.innerText = '৳ 5,250.00';
        } else {
            balanceText.innerText = '৳ ***';
        }
    }
}

// Feature Alert
function openFeature(featureName) {
    alert(`"${featureName}" ফিচারটি শীঘ্রই আসছে!`);
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Handle Login Redirect
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const roleSelect = document.getElementById('user-role');
            const selectedRole = roleSelect ? roleSelect.value : 'reseller';

            if (selectedRole === 'admin') {
                window.location.href = 'dashboard.html';
            } else if (selectedRole === 'reseller') {
                window.location.href = 'reseller-dashboard.html';
            } else {
                window.location.href = 'index.html';
            }
        });
    }

    // 2. Handle Registration Logic & Direct Redirection
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const selectedRole = document.getElementById('reg-role').value;
            
            // Alert message
            alert('🎉 Registration Successful! আপনার ড্যাশবোর্ডে রিডাইরেক্ট করা হচ্ছে...');

            // Direct Redirection based on selected role
            if (selectedRole === 'admin') {
                window.location.href = 'dashboard.html';
            } else if (selectedRole === 'reseller') {
                window.location.href = 'reseller-dashboard.html';
            } else {
                window.location.href = 'index.html';
            }
        });
    }
});