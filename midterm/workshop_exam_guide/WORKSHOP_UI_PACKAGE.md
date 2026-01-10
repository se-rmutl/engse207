# 📦 WORKSHOP UI PACKAGE - Product Management System
## Complete UI for Workshop Practice

---

## 📋 ภาพรวม

เอกสารนี้มี UI สมบูรณ์สำหรับ **Product Management System Workshop**

**สำหรับ:** Workshop ก่อนสอบ Midterm - ฝึกทำ Refactoring  
**ระบบ:** Product Management (จัดการสินค้า)  
**เวลา:** 60 นาที

---

## 🎯 วัตถุประสงค์

1. ให้นักศึกษาเห็น UI ที่สมบูรณ์
2. ฝึกใช้ UI กับ Backend ที่ refactor แล้ว
3. เข้าใจความสัมพันธ์ระหว่าง Frontend - Backend
4. เตรียมพร้อมสำหรับข้อสอบจริง

---

## 💻 PART 1: MONOLITHIC UI

### โครงสร้างโปรเจกต์

```
product-monolithic/
├── server-monolithic.js    # ให้มาพร้อม workshop
├── package.json
├── products.db             # สร้างอัตโนมัติ
└── public/
    └── index.html          # 👇 Copy code ด้านล่าง
```

---

### 📄 ไฟล์: `public/index.html`

**วิธีใช้:** Copy code ทั้งหมด → สร้างไฟล์ `public/index.html`

```html
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Management - Monolithic</title>
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
            flex-wrap: wrap;
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
        
        .btn-secondary { background: #6b7280; color: white; }
        .btn-danger { background: #ef4444; color: white; }
        
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
        
        .product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .product-card {
            background: white;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            padding: 20px;
            transition: all 0.3s;
        }
        
        .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
            border-color: #667eea;
        }
        
        .product-card h3 {
            color: #1f2937;
            margin-bottom: 10px;
            font-size: 18px;
        }
        
        .product-info {
            margin-bottom: 15px;
        }
        
        .info-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #f3f4f6;
            font-size: 14px;
        }
        
        .info-label {
            color: #6b7280;
            font-weight: 500;
        }
        
        .info-value {
            color: #1f2937;
            font-weight: 600;
        }
        
        .category-badge {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 15px;
        }
        
        .category-electronics { background: #dbeafe; color: #1e40af; }
        .category-fashion { background: #fce7f3; color: #9f1239; }
        .category-food { background: #d1fae5; color: #065f46; }
        .category-books { background: #fef3c7; color: #92400e; }
        .category-sports { background: #fee2e2; color: #991b1b; }
        
        .actions {
            display: flex;
            gap: 8px;
            margin-top: 15px;
        }
        
        .actions button {
            flex: 1;
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
        
        .form-group input,
        .form-group select {
            width: 100%;
            padding: 12px;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            font-size: 14px;
            transition: border-color 0.3s;
        }
        
        .form-group input:focus,
        .form-group select:focus {
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
        
        .no-products {
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
            
            .product-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>📦 Product Management System</h1>
            <span class="badge">🏗️ Monolithic Architecture</span>
        </header>
        
        <div class="toolbar">
            <button class="btn btn-primary" onclick="showAddModal()">
                ➕ Add New Product
            </button>
            
            <div class="filters">
                <button class="filter-btn active" onclick="filterProducts('all')">All</button>
                <button class="filter-btn" onclick="filterProducts('Electronics')">Electronics</button>
                <button class="filter-btn" onclick="filterProducts('Fashion')">Fashion</button>
                <button class="filter-btn" onclick="filterProducts('Food')">Food</button>
                <button class="filter-btn" onclick="filterProducts('Books')">Books</button>
            </div>
        </div>
        
        <div class="statistics">
            <div class="stat-card">
                <h3 id="stat-total">0</h3>
                <p>Total Products</p>
            </div>
            <div class="stat-card">
                <h3 id="stat-value">฿0.00</h3>
                <p>Total Value</p>
            </div>
        </div>
        
        <div id="loading" class="loading" style="display: none;">
            Loading products...
        </div>
        
        <div id="product-list" class="product-grid">
            <!-- Products will be loaded here -->
        </div>
    </div>
    
    <!-- Add/Edit Product Modal -->
    <div id="product-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="modal-title">Add New Product</h2>
                <span class="close" onclick="closeModal()">&times;</span>
            </div>
            <form id="product-form" onsubmit="handleSubmit(event)">
                <input type="hidden" id="product-id">
                
                <div class="form-group">
                    <label for="name">Product Name *</label>
                    <input type="text" id="name" required placeholder="Enter product name">
                </div>
                
                <div class="form-group">
                    <label for="price">Price (฿) *</label>
                    <input type="number" id="price" required min="0.01" step="0.01" placeholder="0.00">
                </div>
                
                <div class="form-group">
                    <label for="stock">Stock *</label>
                    <input type="number" id="stock" required min="0" placeholder="0">
                </div>
                
                <div class="form-group">
                    <label for="category">Category *</label>
                    <select id="category" required>
                        <option value="">-- Select Category --</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Food">Food</option>
                        <option value="Books">Books</option>
                        <option value="Sports">Sports</option>
                    </select>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">
                        💾 Save Product
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
        
        // Load products on page load
        document.addEventListener('DOMContentLoaded', () => {
            loadProducts();
        });
        
        // Load products from API
        async function loadProducts(category = null) {
            try {
                document.getElementById('loading').style.display = 'block';
                document.getElementById('product-list').style.display = 'none';
                
                let url = '/api/products';
                if (category) {
                    url += `?category=${category}`;
                }
                
                const response = await fetch(url);
                const data = await response.json();
                
                displayProducts(data.products);
                updateStatistics(data.products, data.totalValue);
                
                document.getElementById('loading').style.display = 'none';
                document.getElementById('product-list').style.display = 'grid';
                
            } catch (error) {
                console.error('Error loading products:', error);
                alert('Failed to load products. Please try again.');
                document.getElementById('loading').style.display = 'none';
            }
        }
        
        // Display products in grid
        function displayProducts(products) {
            const container = document.getElementById('product-list');
            
            if (products.length === 0) {
                container.innerHTML = '<div class="no-products">📦 No products found</div>';
                return;
            }
            
            container.innerHTML = products.map(product => `
                <div class="product-card">
                    <h3>${escapeHtml(product.name)}</h3>
                    <span class="category-badge category-${product.category.toLowerCase()}">
                        ${escapeHtml(product.category)}
                    </span>
                    
                    <div class="product-info">
                        <div class="info-row">
                            <span class="info-label">💰 Price:</span>
                            <span class="info-value">฿${product.price.toFixed(2)}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">📦 Stock:</span>
                            <span class="info-value">${product.stock} units</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">💵 Value:</span>
                            <span class="info-value">฿${(product.price * product.stock).toFixed(2)}</span>
                        </div>
                    </div>
                    
                    <div class="actions">
                        <button class="btn btn-secondary" onclick="editProduct(${product.id})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
                    </div>
                </div>
            `).join('');
        }
        
        // Update statistics
        function updateStatistics(products, totalValue) {
            document.getElementById('stat-total').textContent = products.length;
            document.getElementById('stat-value').textContent = '฿' + parseFloat(totalValue).toFixed(2);
        }
        
        // Filter products
        function filterProducts(category) {
            currentFilter = category;
            
            // Update active button
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Load products with filter
            if (category === 'all') {
                loadProducts();
            } else {
                loadProducts(category);
            }
        }
        
        // Show add product modal
        function showAddModal() {
            document.getElementById('modal-title').textContent = 'Add New Product';
            document.getElementById('product-form').reset();
            document.getElementById('product-id').value = '';
            document.getElementById('product-modal').style.display = 'flex';
        }
        
        // Close modal
        function closeModal() {
            document.getElementById('product-modal').style.display = 'none';
        }
        
        // Handle form submit
        async function handleSubmit(event) {
            event.preventDefault();
            
            const id = document.getElementById('product-id').value;
            const productData = {
                name: document.getElementById('name').value,
                price: parseFloat(document.getElementById('price').value),
                stock: parseInt(document.getElementById('stock').value),
                category: document.getElementById('category').value
            };
            
            try {
                let response;
                if (id) {
                    // Update existing product
                    response = await fetch(`/api/products/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(productData)
                    });
                } else {
                    // Create new product
                    response = await fetch('/api/products', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(productData)
                    });
                }
                
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error);
                }
                
                alert(id ? 'Product updated successfully!' : 'Product added successfully!');
                closeModal();
                loadProducts(currentFilter === 'all' ? null : currentFilter);
                
            } catch (error) {
                alert('Error: ' + error.message);
            }
        }
        
        // Edit product
        async function editProduct(id) {
            try {
                const response = await fetch(`/api/products/${id}`);
                const product = await response.json();
                
                document.getElementById('modal-title').textContent = 'Edit Product';
                document.getElementById('product-id').value = product.id;
                document.getElementById('name').value = product.name;
                document.getElementById('price').value = product.price;
                document.getElementById('stock').value = product.stock;
                document.getElementById('category').value = product.category;
                
                document.getElementById('product-modal').style.display = 'flex';
                
            } catch (error) {
                alert('Error loading product details: ' + error.message);
            }
        }
        
        // Delete product
        async function deleteProduct(id) {
            if (!confirm('Are you sure you want to delete this product?')) return;
            
            try {
                const response = await fetch(`/api/products/${id}`, {
                    method: 'DELETE'
                });
                
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error);
                }
                
                alert('Product deleted successfully!');
                loadProducts(currentFilter === 'all' ? null : currentFilter);
                
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
            return String(text).replace(/[&<>"']/g, m => map[m]);
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
product-layered/
├── src/               # นักศึกษาต้องสร้าง (Backend)
│   ├── presentation/
│   ├── business/
│   └── data/
├── server.js
├── package.json
├── products.db
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
    <title>Product Management - Layered</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>📦 Product Management System</h1>
            <span class="badge">🏗️ Layered Architecture</span>
        </header>
        
        <div class="toolbar">
            <button class="btn btn-primary" id="add-btn">
                ➕ Add New Product
            </button>
            
            <div class="filters">
                <button class="filter-btn active" data-filter="all">All</button>
                <button class="filter-btn" data-filter="Electronics">Electronics</button>
                <button class="filter-btn" data-filter="Fashion">Fashion</button>
                <button class="filter-btn" data-filter="Food">Food</button>
                <button class="filter-btn" data-filter="Books">Books</button>
            </div>
        </div>
        
        <div class="statistics">
            <div class="stat-card">
                <h3 id="stat-total">0</h3>
                <p>Total Products</p>
            </div>
            <div class="stat-card">
                <h3 id="stat-value">฿0.00</h3>
                <p>Total Value</p>
            </div>
        </div>
        
        <div id="loading" class="loading">Loading products...</div>
        
        <div id="product-list" class="product-grid"></div>
    </div>
    
    <!-- Modal -->
    <div id="product-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="modal-title">Add New Product</h2>
                <span class="close">&times;</span>
            </div>
            <form id="product-form">
                <input type="hidden" id="product-id">
                
                <div class="form-group">
                    <label for="name">Product Name *</label>
                    <input type="text" id="name" required>
                </div>
                
                <div class="form-group">
                    <label for="price">Price (฿) *</label>
                    <input type="number" id="price" required min="0.01" step="0.01">
                </div>
                
                <div class="form-group">
                    <label for="stock">Stock *</label>
                    <input type="number" id="stock" required min="0">
                </div>
                
                <div class="form-group">
                    <label for="category">Category *</label>
                    <select id="category" required>
                        <option value="">-- Select Category --</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Food">Food</option>
                        <option value="Books">Books</option>
                        <option value="Sports">Sports</option>
                    </select>
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

**💡 Tip:** Copy ทั้งหมดจาก Monolithic UI (ส่วน `<style>`)

---

### 📄 ไฟล์ที่ 3: `public/js/api.js`

```javascript
// public/js/api.js - API Client for Product Management
class ProductAPI {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    
    async getAllProducts(category = null) {
        let url = `${this.baseURL}/products`;
        if (category) {
            url += `?category=${category}`;
        }
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return await response.json();
    }
    
    async getProductById(id) {
        const response = await fetch(`${this.baseURL}/products/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }
        return await response.json();
    }
    
    async createProduct(productData) {
        const response = await fetch(`${this.baseURL}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
        
        return await response.json();
    }
    
    async updateProduct(id, productData) {
        const response = await fetch(`${this.baseURL}/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
        
        return await response.json();
    }
    
    async deleteProduct(id) {
        const response = await fetch(`${this.baseURL}/products/${id}`, {
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
const api = new ProductAPI('/api');
```

---

### 📄 ไฟล์ที่ 4: `public/js/app.js`

```javascript
// public/js/app.js - Main Application Logic
let currentFilter = 'all';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadProducts();
});

// Setup event listeners
function setupEventListeners() {
    document.getElementById('add-btn').addEventListener('click', showAddModal);
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            filterProducts(filter);
        });
    });
    
    document.querySelector('.close').addEventListener('click', closeModal);
    document.getElementById('cancel-btn').addEventListener('click', closeModal);
    document.getElementById('product-form').addEventListener('submit', handleSubmit);
}

// Load products
async function loadProducts(category = null) {
    try {
        showLoading();
        
        const data = await api.getAllProducts(category);
        
        displayProducts(data.products);
        updateStatistics(data.products, data.totalValue);
        
        hideLoading();
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to load products: ' + error.message);
        hideLoading();
    }
}

// Display products
function displayProducts(products) {
    const container = document.getElementById('product-list');
    
    if (products.length === 0) {
        container.innerHTML = '<div class="no-products">📦 No products found</div>';
        return;
    }
    
    container.innerHTML = products.map(product => createProductCard(product)).join('');
}

// Create product card HTML
function createProductCard(product) {
    return `
        <div class="product-card">
            <h3>${escapeHtml(product.name)}</h3>
            <span class="category-badge category-${product.category.toLowerCase()}">
                ${escapeHtml(product.category)}
            </span>
            
            <div class="product-info">
                <div class="info-row">
                    <span class="info-label">💰 Price:</span>
                    <span class="info-value">฿${product.price.toFixed(2)}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">📦 Stock:</span>
                    <span class="info-value">${product.stock} units</span>
                </div>
                <div class="info-row">
                    <span class="info-label">💵 Value:</span>
                    <span class="info-value">฿${(product.price * product.stock).toFixed(2)}</span>
                </div>
            </div>
            
            <div class="actions">
                <button class="btn btn-secondary" onclick="editProduct(${product.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
            </div>
        </div>
    `;
}

// Update statistics
function updateStatistics(products, totalValue) {
    document.getElementById('stat-total').textContent = products.length;
    document.getElementById('stat-value').textContent = '฿' + parseFloat(totalValue).toFixed(2);
}

// Filter products
function filterProducts(category) {
    currentFilter = category;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });
    
    loadProducts(category === 'all' ? null : category);
}

// Show/hide loading
function showLoading() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('product-list').style.display = 'none';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('product-list').style.display = 'grid';
}

// Modal functions
function showAddModal() {
    document.getElementById('modal-title').textContent = 'Add New Product';
    document.getElementById('product-form').reset();
    document.getElementById('product-id').value = '';
    document.getElementById('product-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}

// Form submit
async function handleSubmit(event) {
    event.preventDefault();
    
    const id = document.getElementById('product-id').value;
    const productData = {
        name: document.getElementById('name').value,
        price: parseFloat(document.getElementById('price').value),
        stock: parseInt(document.getElementById('stock').value),
        category: document.getElementById('category').value
    };
    
    try {
        if (id) {
            await api.updateProduct(id, productData);
            alert('Product updated successfully!');
        } else {
            await api.createProduct(productData);
            alert('Product added successfully!');
        }
        
        closeModal();
        loadProducts(currentFilter === 'all' ? null : currentFilter);
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Edit product
async function editProduct(id) {
    try {
        const product = await api.getProductById(id);
        
        document.getElementById('modal-title').textContent = 'Edit Product';
        document.getElementById('product-id').value = product.id;
        document.getElementById('name').value = product.name;
        document.getElementById('price').value = product.price;
        document.getElementById('stock').value = product.stock;
        document.getElementById('category').value = product.category;
        
        document.getElementById('product-modal').style.display = 'flex';
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Delete product
async function deleteProduct(id) {
    if (!confirm('Are you sure?')) return;
    
    try {
        await api.deleteProduct(id);
        alert('Product deleted successfully!');
        loadProducts(currentFilter === 'all' ? null : currentFilter);
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
    return String(text).replace(/[&<>"']/g, m => map[m]);
}
```

---

## 🧪 PART 3: วิธีทดสอบ

### ทดสอบ Backend (API)

```bash
# Terminal 1: Start server
npm start

# Terminal 2: Test APIs
# 1. Get all products
curl http://localhost:3000/api/products

# 2. Create product
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","price":25000,"stock":10,"category":"Electronics"}'

# 3. Delete product
curl -X DELETE http://localhost:3000/api/products/1
```

### ทดสอบ Frontend (UI)

```
1. เปิด browser → http://localhost:3000

2. Test Features:
   ✅ เห็น UI โหลดขึ้นมา
   ✅ Statistics แสดงถูกต้อง
   ✅ คลิก "Add New Product" → เพิ่มสินค้าได้
   ✅ Filter ทำงานได้
   ✅ Edit, Delete ทำงานได้
   ✅ คำนวณ Total Value ถูกต้อง
```

---

## 📊 สรุป


### การใช้งาน:

1. **Monolithic:** Copy 1 ไฟล์ → รันได้เลย
2. **Layered:** Copy 4 ไฟล์ → รันได้เลย (ถ้า Backend พร้อม)

---

**จัดทำโดย:** อาจารย์ธนิต เกตุแก้ว  
**วิชา:** ENGSE207 สถาปัตยกรรมซอฟต์แวร์  
**สำหรับ:** Workshop - Product Management System
