// Ensure admin account exists
document.addEventListener('DOMContentLoaded', function() {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  if (!users.find(u => u.username === 'codes')) {
    users.push({fullname: 'Codes Admin', username: 'codes', email: 'admin@codes.com', password: 'admin', courses: [], isAdmin: true});
    localStorage.setItem('users', JSON.stringify(users));
  }
});
// Signup function
function signup(event){
    event.preventDefault();
    const fullname = document.getElementById('fullname').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email') ? document.getElementById('email').value : '';
    const password = document.getElementById('password').value;
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if(users.find(u => u.username === username)){
        alert('Username already exists!');
        return;
    }
    // Save all info for future use
    users.push({fullname, username, email, password, courses: []});
    localStorage.setItem('users', JSON.stringify(users));
    alert('Signup successful! Please login.');
    window.location.href = 'login.html';
}

// Login function
function login(event){
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);
    if(user){
        localStorage.setItem('currentUser', JSON.stringify(user));
        // If admin, go to admin dashboard
        if(user.username === 'codes' && user.password === 'admin') {
          window.location.href = 'admin-dashboard.html';
        } else {
          window.location.href = 'dashboard.html';
        }
    } else {
        alert('Invalid username or password!');
    }
}

// Logout function
function logout(){
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Display user info on dashboard
function loadDashboard(){
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if(!user){ window.location.href='login.html'; return; }
    document.getElementById('welcome').innerText = 'Welcome, ' + user.username;
}

// NTcal AI Assistant function
function ntcalAI(event) {
    event.preventDefault();
    const question = document.getElementById('ai-question').value.trim().toLowerCase();
    let answer = '';
    if (question.includes('html')) {
        answer = 'HTML (HyperText Markup Language) is used to structure web pages. Use tags like <div>, <h1>, <p> to organize content.';
    } else if (question.includes('css')) {
        answer = 'CSS (Cascading Style Sheets) is used for styling. You can use selectors, properties, and values to change colors, layout, and fonts.';
    } else if (question.includes('javascript')) {
        answer = 'JavaScript adds interactivity to your site. Use functions, events, and DOM manipulation to make your site dynamic.';
    } else if (question.includes('responsive')) {
        answer = 'To make your site responsive, use CSS media queries and flexible layouts like grid or flexbox.';
    } else if (question.includes('login') || question.includes('signup')) {
        answer = 'For login/signup, validate user input and store user data securely. Use event handlers and localStorage for simple web apps.';
    } else {
        answer = 'NTcal AI: Sorry, I can only answer basic coding questions about HTML, CSS, JavaScript, and web development.';
    }
    document.getElementById('ai-answer').innerText = answer;
}

// --- Admin Sidebar Active Link ---
document.addEventListener('DOMContentLoaded', function() {
  var sidebar = document.querySelector('.admin-sidebar nav');
  if (sidebar) {
    var links = sidebar.querySelectorAll('a');
    var current = window.location.pathname.split('/').pop();
    links.forEach(function(link) {
      if (link.getAttribute('href') === current) {
        link.classList.add('active');
      }
    });
  }
});
// --- Admin Sidebar Toggle for Mobile ---
document.addEventListener('DOMContentLoaded', function() {
  var sidebar = document.querySelector('.admin-sidebar');
  if (sidebar) {
    var toggleBtn = document.createElement('button');
    toggleBtn.textContent = '☰';
    toggleBtn.className = 'btn';
    toggleBtn.style = 'position:fixed;top:18px;left:18px;z-index:200;font-size:1.3em;padding:6px 14px;background:#6f42c1;color:#fff;border-radius:8px;border:none;display:none;';
    document.body.appendChild(toggleBtn);
    function checkMobile() {
      if (window.innerWidth < 900) {
        toggleBtn.style.display = 'block';
        sidebar.style.display = 'none';
      } else {
        toggleBtn.style.display = 'none';
        sidebar.style.display = 'flex';
      }
    }
    toggleBtn.onclick = function() {
      if (sidebar.style.display === 'none') {
        sidebar.style.display = 'flex';
      } else {
        sidebar.style.display = 'none';
      }
    };
    window.addEventListener('resize', checkMobile);
    checkMobile();
  }
});
// ...existing code...