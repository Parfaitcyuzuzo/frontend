document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const registrationForm = document.getElementById('registrationForm');
    const loginContainer = document.getElementById('loginContainer');
    const registrationContainer = document.getElementById('registrationContainer');
    const logoutBtn = document.getElementById('logoutBtn');
    const loggedInUserSpan = document.getElementById('loggedInUser');
    
    // Mock user database
    const users = [
        { username: 'admin', password: 'admin123' },
        { username: 'teacher', password: 'teacher123' }
    ];
    
    // Mock student database (stored in localStorage)
    let students = JSON.parse(localStorage.getItem('students')) || [];
    
    // Login Handler
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Check credentials
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            // Successful login
            loginContainer.style.display = 'none';
            registrationContainer.style.display = 'block';
            loggedInUserSpan.textContent = username;
            fetchStudents();
        } else {
            alert('Invalid username or password');
        }
    });
    
    // Logout Handler
    logoutBtn.addEventListener('click', function() {
        loginContainer.style.display = 'block';
        registrationContainer.style.display = 'none';
        loginForm.reset();
    });
    
    // Registration Handler
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const student = {
            id: Date.now(), // Simple ID generation
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            course: document.getElementById('course').value
        };
        
        // Add to mock database
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));
        
        alert('Student registered successfully!');
        registrationForm.reset();
        fetchStudents();
    });
    
    // Fetch students and display
    function fetchStudents() {
        const studentsList = document.getElementById('studentsList');
        studentsList.innerHTML = '';
        
        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.course}</td>
            `;
            studentsList.appendChild(row);
        });
    }
});