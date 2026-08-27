// ==========================================
// ১. ব্যালেন্স হাইড এবং শো করার ডায়নামিক ফাংশন
// ==========================================
function toggleBalance() {
    const balanceText = document.getElementById('balance-text');
    if (balanceText) {
        // ব্যালেন্স টগল করার লজিক (হাইড থাকলে শো করবে, শো থাকলে হাইড করবে)
        if (balanceText.innerText.includes('***') || balanceText.innerText.includes('Tap Now') || balanceText.innerText.includes('ব্যালেন্স দেখুন')) {
            balanceText.innerHTML = '৳ 5,250.00 <i class="fa-regular fa-eye-slash"></i>';
        } else {
            balanceText.innerHTML = '৳ *** <i class="fa-regular fa-eye"></i>';
        }
    }
}

// ==========================================
// ২. ফিচার এবং কার্ড ক্লিক হ্যান্ডলার
// ==========================================
function openFeature(featureName, targetUrl = null) {
    if (targetUrl) {
        window.location.href = targetUrl;
    } else {
        alert(`📌 "${featureName}" অপশনে আপনাকে স্বাগতম!\n\nএই ফিচারটির বিস্তারিত কাজ শীঘ্রই যুক্ত করা হবে।`);
    }
}

// ==========================================
// ৩. অথেন্টিকেশন ও ফর্ম হ্যান্ডলিং (DOMContentLoaded)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

    // --- এ. রেজিস্ট্রেশন হ্যান্ডলিং (LocalStorage-এ ডেটা সেভ করা) ---
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const roleElement = document.getElementById('reg-role');
            const nameElement = document.getElementById('reg-name');
            const emailElement = document.getElementById('reg-email');
            const passwordElement = document.getElementById('reg-password');

            const role = roleElement ? roleElement.value : 'reseller';
            const name = nameElement ? nameElement.value : '';
            const email = emailElement ? emailElement.value : '';
            const password = passwordElement ? passwordElement.value : '';

            // আগে সেভ করা ইউজারের ডেটা চেক করা
            let users = JSON.parse(localStorage.getItem('martUsers')) || [];

            // একই ইমেইল/ইউজারনেম দিয়ে ডুপ্লিকেট অ্যাকাউন্ট বন্ধ করা
            const userExists = users.some(u => u.email === email);
            if (userExists) {
                alert('❌ এই ইমেইল বা নম্বর দিয়ে ইতোমধ্যে একটি অ্যাকাউন্ট আছে!');
                return;
            }

            // নতুন ইউজারের তথ্য জমা রাখা
            users.push({ role, name, email, password });
            localStorage.setItem('martUsers', JSON.stringify(users));

            alert('🎉 Registration Successful! আপনার অ্যাকাউন্ট তৈরি হয়েছে। এখন সেট করা পাসওয়ার্ড দিয়ে লগইন করুন।');
            window.location.href = 'login.html';
        });
    }

    // --- বি. লগইন হ্যান্ডলিং (নিবন্ধিত পাসওয়ার্ড ও রোল চেক করা) ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const roleSelect = document.getElementById('user-role');
            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');

            const selectedRole = roleSelect ? roleSelect.value : 'reseller';
            const enteredEmail = usernameInput ? usernameInput.value : '';
            const enteredPassword = passwordInput ? passwordInput.value : '';

            let users = JSON.parse(localStorage.getItem('martUsers')) || [];

            // রেজিস্ট্রেশনের সময় দেওয়া তথ্য মিল আছে কি না তা চেক করা
            const validUser = users.find(u => 
                u.email === enteredEmail && 
                u.password === enteredPassword && 
                u.role === selectedRole
            );

            if (validUser) {
                // সেশনে লগইন ইউজার সেভ রাখা
                localStorage.setItem('currentUser', JSON.stringify(validUser));
                alert(`✅ স্বাগতম ${validUser.name || ''}! সফলভাবে লগইন হয়েছে।`);

                // রোল অনুযায়ী রিডাইরেক্ট করা
                if (selectedRole === 'admin') {
                    window.location.href = 'dashboard.html';
                } else if (selectedRole === 'reseller') {
                    window.location.href = 'reseller-dashboard.html';
                } else {
                    window.location.href = 'index.html';
                }
            } else {
                alert('❌ ভুল ইমেইল, পাসওয়ার্ড অথবা অ্যাকাউন্টের ধরন! রেজিস্ট্রেশনকৃত সঠিক তথ্য দিয়ে চেষ্টা করুন।');
            }
        });
    }
});

// --- পাসওয়ার্ড রিসেট হ্যান্ডলার ---
    const forgotForm = document.getElementById('forgot-form');
    if (forgotForm) {
        forgotForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('reset-email').value;
            const newPassword = document.getElementById('new-password').value;

            let users = JSON.parse(localStorage.getItem('martUsers')) || [];

            // ইউজার খুঁজে বের করা
            let userIndex = users.findIndex(u => u.email === email);

            if (userIndex !== -1) {
                // নতুন পাসওয়ার্ড আপডেট করা
                users[userIndex].password = newPassword;
                localStorage.setItem('martUsers', JSON.stringify(users));

                alert('✅ পাসওয়ার্ড সফলভাবে আপডেট হয়েছে! এখন নতুন পাসওয়ার্ড দিয়ে লগইন করুন।');
                window.location.href = 'login.html';
            } else {
                alert('❌ এই ইমেইল বা নম্বর দিয়ে কোনো অ্যাকাউন্ট পাওয়া যায়নি!');
            }
        });
    }