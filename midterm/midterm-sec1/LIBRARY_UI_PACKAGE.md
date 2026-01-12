# 📚 LIBRARY MANAGEMENT SYSTEM - UI PACKAGE
## Complete UI for Midterm Practical Exam (Sec 1)

---

## 📋 ภาพรวม

เอกสารนี้มี UI สมบูรณ์สำหรับ **Library Management System** เท่านั้น

**สำหรับ:** Version 1 - Library Management  

---

## 🎯 สิ่งที่จะได้รับ

### 1️⃣ **Monolithic UI** (ไฟล์เดียว)
- HTML + CSS + JavaScript ในไฟล์เดียว
- พร้อมใช้กับ Monolithic server.js ที่ให้มา

### 2️⃣ **Layered UI** (แยกไฟล์)
- `index.html` - โครงสร้าง
- `style.css` - สไตล์
- `api.js` - API Client
- `app.js` - Logic

### 3️⃣ **วิธีทดสอบ**
- Test Backend (curl)
- Test Frontend (browser)

---

## 💻 PART 1: MONOLITHIC UI

### โครงสร้างโปรเจกต์

```
monolithic-library/
├── server.js          # ให้มาพร้อมโจทย์
├── package.json
├── library.db         # สร้างอัตโนมัติ
└── public/
    └── index.html     # 👇 Copy code ด้านล่าง
```

---

### 📄 ไฟล์: `public/index.html`

**วิธีใช้:** Copy code ทั้งหมดด้านล่าง → สร้างไฟล์ `public/index.html`

```html
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Library Management - Monolithic</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            padding: 30px;
        }
        
        header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 3px solid #667eea;
            margin-bottom: 30px;
        }
        
        header h1 {
            color: #667eea;
            font-size: 32px;
            margin-bottom: 10px;
        }
        
        .badge {
            display: inline-block;
            padding: 5px 15px;
            background: #f3f4f6;
            border-radius: 20px;
            font-size: 14px;
            color: #6b7280;
        }
        
        .toolbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            flex-wrap: wrap;
            gap: 15px;
        }
        
        .filters {
            display: flex;
            gap: 10px;
        }
        
        .filter-btn {
            padding: 10px 20px;
            border: 2px solid #667eea;
            background: white;
            color: #667eea;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s;
        }
        
        .filter-btn.active,
        .filter-btn:hover {
            background: #667eea;
            color: white;
        }
        
        .btn {
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            transition: all 0.3s;
        }
        
        .btn-primary {
            background: #667eea;
            color: white;
        }
        
        .btn-primary:hover {
            background: #5568d3;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        
        .btn-success { background: #10b981; color: white; }
        .btn-warning { background: #f59e0b; color: white; }
        .btn-danger { background: #ef4444; color: white; }
        .btn-secondary { background: #6b7280; color: white; }
        
        .statistics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .stat-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 25px;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }
        
        .stat-card h3 {
            font-size: 36px;
            margin-bottom: 5px;
        }
        
        .stat-card p {
            font-size: 14px;
            opacity: 0.9;
        }
        
        .book-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .book-card {
            background: white;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            padding: 20px;
            transition: all 0.3s;
        }
        
        .book-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
            border-color: #667eea;
        }
        
        .book-card h3 {
            color: #1f2937;
            margin-bottom: 10px;
            font-size: 18px;
        }
        
        .book-card .author {
            color: #6b7280;
            font-size: 14px;
            margin-bottom: 10px;
        }
        
        .book-card .isbn {
            color: #9ca3af;
            font-size: 12px;
            margin-bottom: 15px;
        }
        
        .status-badge {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 15px;
        }
        
        .status-available {
            background: #d1fae5;
            color: #065f46;
        }
        
        .status-borrowed {
            background: #fee2e2;
            color: #991b1b;
        }
        
        .actions {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
        }
        
        .actions button {
            flex: 1;
            min-width: 80px;
            padding: 8px 12px;
            font-size: 13px;
        }
        
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .modal-content {
            background: white;
            padding: 30px;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .modal-header h2 {
            color: #667eea;
        }
        
        .close {
            font-size: 28px;
            cursor: pointer;
            color: #6b7280;
        }
        
        .close:hover {
            color: #ef4444;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            color: #374151;
            font-weight: 600;
        }
        
        .form-group input {
            width: 100%;
            padding: 12px;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            font-size: 14px;
            transition: border-color 0.3s;
        }
        
        .form-group input:focus {
            outline: none;
            border-color: #667eea;
        }
        
        .form-actions {
            display: flex;
            gap: 10px;
            margin-top: 25px;
        }
        
        .form-actions button {
            flex: 1;
        }
        
        .loading {
            text-align: center;
            padding: 40px;
            color: #6b7280;
        }
        
        .no-books {
            text-align: center;
            padding: 60px 20px;
            color: #6b7280;
            font-size: 18px;
        }
        
        @media (max-width: 768px) {
            .toolbar {
                flex-direction: column;
                align-items: stretch;
            }
            
            .filters {
                justify-content: center;
            }
            
            .book-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>📚 Library Management System</h1>
            <span class="badge">🏗️ Monolithic Architecture</span>
        </header>
        
        <div class="toolbar">
            <button class="btn btn-primary" onclick="showAddModal()">
                ➕ Add New Book
            </button>
            
            <div class="filters">
                <button class="filter-btn active" onclick="filterBooks('all')">
                    All Books
                </button>
                <button class="filter-btn" onclick="filterBooks('available')">
                    Available
                </button>
                <button class="filter-btn" onclick="filterBooks('borrowed')">
                    Borrowed
                </button>
            </div>
        </div>
        
        <div class="statistics">
            <div class="stat-card">
                <h3 id="stat-available">0</h3>
                <p>Available</p>
            </div>
            <div class="stat-card">
                <h3 id="stat-borrowed">0</h3>
                <p>Borrowed</p>
            </div>
            <div class="stat-card">
                <h3 id="stat-total">0</h3>
                <p>Total Books</p>
            </div>
        </div>
        
        <div id="loading" class="loading" style="display: none;">
            Loading books...
        </div>
        
        <div id="book-list" class="book-grid">
            <!-- Books will be loaded here -->
        </div>
    </div>
    
    <!-- Add/Edit Book Modal -->
    <div id="book-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="modal-title">Add New Book</h2>
                <span class="close" onclick="closeModal()">&times;</span>
            </div>
            <form id="book-form" onsubmit="handleSubmit(event)">
                <input type="hidden" id="book-id">
                
                <div class="form-group">
                    <label for="title">Book Title *</label>
                    <input type="text" id="title" required placeholder="Enter book title">
                </div>
                
                <div class="form-group">
                    <label for="author">Author *</label>
                    <input type="text" id="author" required placeholder="Enter author name">
                </div>
                
                <div class="form-group">
                    <label for="isbn">ISBN *</label>
                    <input type="text" id="isbn" required placeholder="Enter ISBN (10-13 digits)">
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">
                        💾 Save Book
                    </button>
                    <button type="button" class="btn btn-secondary" onclick="closeModal()">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </div>
    
    <script>
        // Global state
        let currentFilter = 'all';
        
        // Load books on page load
        document.addEventListener('DOMContentLoaded', () => {
            loadBooks();
        });
        
        // Load books from API
        async function loadBooks(status = null) {
            try {
                document.getElementById('loading').style.display = 'block';
                document.getElementById('book-list').style.display = 'none';
                
                let url = '/api/books';
                if (status) {
                    url += `?status=${status}`;
                }
                
                const response = await fetch(url);
                const data = await response.json();
                
                displayBooks(data.books);
                updateStatistics(data.statistics);
                
                document.getElementById('loading').style.display = 'none';
                document.getElementById('book-list').style.display = 'grid';
                
            } catch (error) {
                console.error('Error loading books:', error);
                alert('Failed to load books. Please try again.');
                document.getElementById('loading').style.display = 'none';
            }
        }
        
        // Display books in grid
        function displayBooks(books) {
            const container = document.getElementById('book-list');
            
            if (books.length === 0) {
                container.innerHTML = '<div class="no-books">📚 No books found</div>';
                return;
            }
            
            container.innerHTML = books.map(book => `
                <div class="book-card">
                    <h3>${escapeHtml(book.title)}</h3>
                    <p class="author">👤 ${escapeHtml(book.author)}</p>
                    <p class="isbn">🔖 ISBN: ${escapeHtml(book.isbn)}</p>
                    <span class="status-badge status-${book.status}">
                        ${book.status === 'available' ? '✅' : '📖'} ${book.status.toUpperCase()}
                    </span>
                    <div class="actions">
                        ${book.status === 'available' 
                            ? `<button class="btn btn-success" onclick="borrowBook(${book.id})">Borrow</button>`
                            : `<button class="btn btn-warning" onclick="returnBook(${book.id})">Return</button>`
                        }
                        <button class="btn btn-secondary" onclick="editBook(${book.id})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteBook(${book.id})">Delete</button>
                    </div>
                </div>
            `).join('');
        }
        
        // Update statistics
        function updateStatistics(stats) {
            document.getElementById('stat-available').textContent = stats.available;
            document.getElementById('stat-borrowed').textContent = stats.borrowed;
            document.getElementById('stat-total').textContent = stats.total;
        }
        
        // Filter books
        function filterBooks(status) {
            currentFilter = status;
            
            // Update active button
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Load books with filter
            if (status === 'all') {
                loadBooks();
            } else {
                loadBooks(status);
            }
        }
        
        // Show add book modal
        function showAddModal() {
            document.getElementById('modal-title').textContent = 'Add New Book';
            document.getElementById('book-form').reset();
            document.getElementById('book-id').value = '';
            document.getElementById('book-modal').style.display = 'flex';
        }
        
        // Close modal
        function closeModal() {
            document.getElementById('book-modal').style.display = 'none';
        }
        
        // Handle form submit
        async function handleSubmit(event) {
            event.preventDefault();
            
            const id = document.getElementById('book-id').value;
            const bookData = {
                title: document.getElementById('title').value,
                author: document.getElementById('author').value,
                isbn: document.getElementById('isbn').value
            };
            
            try {
                let response;
                if (id) {
                    // Update existing book
                    response = await fetch(`/api/books/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(bookData)
                    });
                } else {
                    // Create new book
                    response = await fetch('/api/books', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(bookData)
                    });
                }
                
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error);
                }
                
                alert(id ? 'Book updated successfully!' : 'Book added successfully!');
                closeModal();
                loadBooks(currentFilter === 'all' ? null : currentFilter);
                
            } catch (error) {
                alert('Error: ' + error.message);
            }
        }
        
        // Edit book
        async function editBook(id) {
            try {
                const response = await fetch(`/api/books/${id}`);
                const book = await response.json();
                
                document.getElementById('modal-title').textContent = 'Edit Book';
                document.getElementById('book-id').value = book.id;
                document.getElementById('title').value = book.title;
                document.getElementById('author').value = book.author;
                document.getElementById('isbn').value = book.isbn;
                
                document.getElementById('book-modal').style.display = 'flex';
                
            } catch (error) {
                alert('Error loading book details: ' + error.message);
            }
        }
        
        // Borrow book
        async function borrowBook(id) {
            if (!confirm('Do you want to borrow this book?')) return;
            
            try {
                const response = await fetch(`/api/books/${id}/borrow`, {
                    method: 'PATCH'
                });
                
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error);
                }
                
                alert('Book borrowed successfully!');
                loadBooks(currentFilter === 'all' ? null : currentFilter);
                
            } catch (error) {
                alert('Error: ' + error.message);
            }
        }
        
        // Return book
        async function returnBook(id) {
            if (!confirm('Do you want to return this book?')) return;
            
            try {
                const response = await fetch(`/api/books/${id}/return`, {
                    method: 'PATCH'
                });
                
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error);
                }
                
                alert('Book returned successfully!');
                loadBooks(currentFilter === 'all' ? null : currentFilter);
                
            } catch (error) {
                alert('Error: ' + error.message);
            }
        }
        
        // Delete book
        async function deleteBook(id) {
            if (!confirm('Are you sure you want to delete this book?')) return;
            
            try {
                const response = await fetch(`/api/books/${id}`, {
                    method: 'DELETE'
                });
                
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error);
                }
                
                alert('Book deleted successfully!');
                loadBooks(currentFilter === 'all' ? null : currentFilter);
                
            } catch (error) {
                alert('Error: ' + error.message);
            }
        }
        
        // Escape HTML to prevent XSS
        function escapeHtml(text) {
            const map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };
            return text.replace(/[&<>"']/g, m => map[m]);
        }
    </script>
</body>
</html>
```

**✅ เสร็จแล้ว!** รัน server แล้วเปิด http://localhost:3000

---

## 💻 PART 2: LAYERED UI

### โครงสร้างโปรเจกต์

```
layered-library/
├── src/               # นักศึกษาต้องสร้าง (Backend)
│   ├── presentation/
│   ├── business/
│   └── data/
├── server.js
├── package.json
├── library.db
└── public/            # 👇 Copy 4 ไฟล์ด้านล่าง
    ├── index.html
    ├── css/
    │   └── style.css
    └── js/
        ├── api.js
        └── app.js
```

---

### 📄 ไฟล์ที่ 1: `public/index.html`

```html
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Library Management - Layered</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>📚 Library Management System</h1>
            <span class="badge">🏗️ Layered Architecture</span>
        </header>
        
        <div class="toolbar">
            <button class="btn btn-primary" id="add-btn">
                ➕ Add New Book
            </button>
            
            <div class="filters">
                <button class="filter-btn active" data-filter="all">All Books</button>
                <button class="filter-btn" data-filter="available">Available</button>
                <button class="filter-btn" data-filter="borrowed">Borrowed</button>
            </div>
        </div>
        
        <div class="statistics">
            <div class="stat-card">
                <h3 id="stat-available">0</h3>
                <p>Available</p>
            </div>
            <div class="stat-card">
                <h3 id="stat-borrowed">0</h3>
                <p>Borrowed</p>
            </div>
            <div class="stat-card">
                <h3 id="stat-total">0</h3>
                <p>Total Books</p>
            </div>
        </div>
        
        <div id="loading" class="loading">Loading books...</div>
        
        <div id="book-list" class="book-grid"></div>
    </div>
    
    <!-- Modal -->
    <div id="book-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="modal-title">Add New Book</h2>
                <span class="close">&times;</span>
            </div>
            <form id="book-form">
                <input type="hidden" id="book-id">
                
                <div class="form-group">
                    <label for="title">Book Title *</label>
                    <input type="text" id="title" required>
                </div>
                
                <div class="form-group">
                    <label for="author">Author *</label>
                    <input type="text" id="author" required>
                </div>
                
                <div class="form-group">
                    <label for="isbn">ISBN *</label>
                    <input type="text" id="isbn" required>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">💾 Save</button>
                    <button type="button" class="btn btn-secondary" id="cancel-btn">Cancel</button>
                </div>
            </form>
        </div>
    </div>
    
    <script src="js/api.js"></script>
    <script src="js/app.js"></script>
</body>
</html>
```

---

### 📄 ไฟล์ที่ 2: `public/css/style.css`

```css
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 20px;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    padding: 30px;
}

header {
    text-align: center;
    padding-bottom: 20px;
    border-bottom: 3px solid #667eea;
    margin-bottom: 30px;
}

header h1 {
    color: #667eea;
    font-size: 32px;
    margin-bottom: 10px;
}

.badge {
    display: inline-block;
    padding: 5px 15px;
    background: #f3f4f6;
    border-radius: 20px;
    font-size: 14px;
    color: #6b7280;
}

.toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 15px;
}

.filters {
    display: flex;
    gap: 10px;
}

.filter-btn {
    padding: 10px 20px;
    border: 2px solid #667eea;
    background: white;
    color: #667eea;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s;
}

.filter-btn.active,
.filter-btn:hover {
    background: #667eea;
    color: white;
}

.btn {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.3s;
}

.btn-primary {
    background: #667eea;
    color: white;
}

.btn-primary:hover {
    background: #5568d3;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.btn-success { background: #10b981; color: white; }
.btn-warning { background: #f59e0b; color: white; }
.btn-danger { background: #ef4444; color: white; }
.btn-secondary { background: #6b7280; color: white; }

.statistics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.stat-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 25px;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.stat-card h3 {
    font-size: 36px;
    margin-bottom: 5px;
}

.stat-card p {
    font-size: 14px;
    opacity: 0.9;
}

.book-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
}

.book-card {
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    padding: 20px;
    transition: all 0.3s;
}

.book-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    border-color: #667eea;
}

.book-card h3 {
    color: #1f2937;
    margin-bottom: 10px;
    font-size: 18px;
}

.book-card .author {
    color: #6b7280;
    font-size: 14px;
    margin-bottom: 10px;
}

.book-card .isbn {
    color: #9ca3af;
    font-size: 12px;
    margin-bottom: 15px;
}

.status-badge {
    display: inline-block;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 15px;
}

.status-available {
    background: #d1fae5;
    color: #065f46;
}

.status-borrowed {
    background: #fee2e2;
    color: #991b1b;
}

.actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.actions button {
    flex: 1;
    min-width: 80px;
    padding: 8px 12px;
    font-size: 13px;
}

.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    padding: 30px;
    border-radius: 15px;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.modal-header h2 {
    color: #667eea;
}

.close {
    font-size: 28px;
    cursor: pointer;
    color: #6b7280;
}

.close:hover {
    color: #ef4444;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    color: #374151;
    font-weight: 600;
}

.form-group input {
    width: 100%;
    padding: 12px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 14px;
    transition: border-color 0.3s;
}

.form-group input:focus {
    outline: none;
    border-color: #667eea;
}

.form-actions {
    display: flex;
    gap: 10px;
    margin-top: 25px;
}

.form-actions button {
    flex: 1;
}

.loading {
    text-align: center;
    padding: 40px;
    color: #6b7280;
    display: none;
}

.no-books {
    text-align: center;
    padding: 60px 20px;
    color: #6b7280;
    font-size: 18px;
}

@media (max-width: 768px) {
    .toolbar {
        flex-direction: column;
        align-items: stretch;
    }
    
    .filters {
        justify-content: center;
    }
    
    .book-grid {
        grid-template-columns: 1fr;
    }
}
```

---

### 📄 ไฟล์ที่ 3: `public/js/api.js`

```javascript
// API Client for Library Management
class LibraryAPI {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    
    async getAllBooks(status = null) {
        let url = `${this.baseURL}/books`;
        if (status) {
            url += `?status=${status}`;
        }
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        return await response.json();
    }
    
    async getBookById(id) {
        const response = await fetch(`${this.baseURL}/books/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch book');
        }
        return await response.json();
    }
    
    async createBook(bookData) {
        const response = await fetch(`${this.baseURL}/books`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
        
        return await response.json();
    }
    
    async updateBook(id, bookData) {
        const response = await fetch(`${this.baseURL}/books/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
        
        return await response.json();
    }
    
    async borrowBook(id) {
        const response = await fetch(`${this.baseURL}/books/${id}/borrow`, {
            method: 'PATCH'
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
        
        return await response.json();
    }
    
    async returnBook(id) {
        const response = await fetch(`${this.baseURL}/books/${id}/return`, {
            method: 'PATCH'
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
        
        return await response.json();
    }
    
    async deleteBook(id) {
        const response = await fetch(`${this.baseURL}/books/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
        
        return await response.json();
    }
}

// Initialize API client
const api = new LibraryAPI('/api');
```

---

### 📄 ไฟล์ที่ 4: `public/js/app.js`

```javascript
// Main Application Logic for Library Management
let currentFilter = 'all';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadBooks();
});

// Setup event listeners
function setupEventListeners() {
    document.getElementById('add-btn').addEventListener('click', showAddModal);
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            filterBooks(filter);
        });
    });
    
    document.querySelector('.close').addEventListener('click', closeModal);
    document.getElementById('cancel-btn').addEventListener('click', closeModal);
    document.getElementById('book-form').addEventListener('submit', handleSubmit);
}

// Load books
async function loadBooks(status = null) {
    try {
        showLoading();
        
        const data = await api.getAllBooks(status);
        
        displayBooks(data.books);
        updateStatistics(data.statistics);
        
        hideLoading();
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to load books: ' + error.message);
        hideLoading();
    }
}

// Display books
function displayBooks(books) {
    const container = document.getElementById('book-list');
    
    if (books.length === 0) {
        container.innerHTML = '<div class="no-books">📚 No books found</div>';
        return;
    }
    
    container.innerHTML = books.map(book => createBookCard(book)).join('');
}

// Create book card HTML
function createBookCard(book) {
    return `
        <div class="book-card">
            <h3>${escapeHtml(book.title)}</h3>
            <p class="author">👤 ${escapeHtml(book.author)}</p>
            <p class="isbn">🔖 ISBN: ${escapeHtml(book.isbn)}</p>
            <span class="status-badge status-${book.status}">
                ${book.status === 'available' ? '✅' : '📖'} ${book.status.toUpperCase()}
            </span>
            <div class="actions">
                ${book.status === 'available' 
                    ? `<button class="btn btn-success" onclick="borrowBook(${book.id})">Borrow</button>`
                    : `<button class="btn btn-warning" onclick="returnBook(${book.id})">Return</button>`
                }
                <button class="btn btn-secondary" onclick="editBook(${book.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteBook(${book.id})">Delete</button>
            </div>
        </div>
    `;
}

// Update statistics
function updateStatistics(stats) {
    document.getElementById('stat-available').textContent = stats.available;
    document.getElementById('stat-borrowed').textContent = stats.borrowed;
    document.getElementById('stat-total').textContent = stats.total;
}

// Filter books
function filterBooks(status) {
    currentFilter = status;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === status) {
            btn.classList.add('active');
        }
    });
    
    loadBooks(status === 'all' ? null : status);
}

// Show/hide loading
function showLoading() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('book-list').style.display = 'none';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('book-list').style.display = 'grid';
}

// Modal functions
function showAddModal() {
    document.getElementById('modal-title').textContent = 'Add New Book';
    document.getElementById('book-form').reset();
    document.getElementById('book-id').value = '';
    document.getElementById('book-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('book-modal').style.display = 'none';
}

// Form submit
async function handleSubmit(event) {
    event.preventDefault();
    
    const id = document.getElementById('book-id').value;
    const bookData = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        isbn: document.getElementById('isbn').value
    };
    
    try {
        if (id) {
            await api.updateBook(id, bookData);
            alert('Book updated successfully!');
        } else {
            await api.createBook(bookData);
            alert('Book added successfully!');
        }
        
        closeModal();
        loadBooks(currentFilter === 'all' ? null : currentFilter);
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Edit book
async function editBook(id) {
    try {
        const book = await api.getBookById(id);
        
        document.getElementById('modal-title').textContent = 'Edit Book';
        document.getElementById('book-id').value = book.id;
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('isbn').value = book.isbn;
        
        document.getElementById('book-modal').style.display = 'flex';
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Borrow book
async function borrowBook(id) {
    if (!confirm('Do you want to borrow this book?')) return;
    
    try {
        await api.borrowBook(id);
        alert('Book borrowed successfully!');
        loadBooks(currentFilter === 'all' ? null : currentFilter);
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Return book
async function returnBook(id) {
    if (!confirm('Do you want to return this book?')) return;
    
    try {
        await api.returnBook(id);
        alert('Book returned successfully!');
        loadBooks(currentFilter === 'all' ? null : currentFilter);
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Delete book
async function deleteBook(id) {
    if (!confirm('Are you sure?')) return;
    
    try {
        await api.deleteBook(id);
        alert('Book deleted successfully!');
        loadBooks(currentFilter === 'all' ? null : currentFilter);
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Escape HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
```

---

## 🧪 PART 3: วิธีทดสอบ

### ทดสอบ Backend (API)

```bash
# Terminal 1: รัน server
npm start

# Terminal 2: ทดสอบ APIs

# 1. Get all books
curl http://localhost:3000/api/books

# 2. Create book
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "isbn": "9780132350884"
  }'

# 3. Borrow book
curl -X PATCH http://localhost:3000/api/books/1/borrow

# 4. Return book
curl -X PATCH http://localhost:3000/api/books/1/return

# 5. Delete book
curl -X DELETE http://localhost:3000/api/books/1
```

### ทดสอบ Frontend (UI)

```
1. เปิด browser → http://localhost:3000

2. Test Features:
   ✅ เห็น UI โหลดขึ้นมา
   ✅ Statistics แสดงถูกต้อง
   ✅ คลิก "Add New Book" → เพิ่มหนังสือได้
   ✅ คลิก "Borrow" → สถานะเปลี่ยน
   ✅ คลิก "Return" → สถานะกลับ
   ✅ คลิก "Edit" → แก้ไขได้
   ✅ คลิก "Delete" → ลบได้
   ✅ Filter ทำงานได้ (All/Available/Borrowed)
   ✅ Responsive: ลองเปิดในมือถือ
```

---

## 📊 สรุป

### สิ่งที่ได้รับ:

| Item | Monolithic | Layered |
|------|------------|---------|
| **UI** | ✅ 1 ไฟล์ | ✅ 4 ไฟล์ |
| **พร้อมใช้** | ✅ Yes | ✅ Yes |
| **Features** | ✅ CRUD + Borrow/Return | ✅ CRUD + Borrow/Return |
| **Responsive** | ✅ Yes | ✅ Yes |

### การใช้งาน:

1. **Monolithic:** Copy 1 ไฟล์ → รันได้เลย
2. **Layered:** Copy 4 ไฟล์ → รันได้เลย (ถ้า Backend พร้อม)

---

**จัดทำโดย:** อาจารย์ธนิต เกตุแก้ว  
**วิชา:** ENGSE207 สถาปัตยกรรมซอฟต์แวร์  
**สำหรับ:** Version 1 - Library Management Only
