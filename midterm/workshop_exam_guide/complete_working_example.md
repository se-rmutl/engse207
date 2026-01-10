# 🎯 COMPLETE WORKING EXAMPLE: Product Management System
## Layered Architecture - Ready to Run!

---

## 📁 โครงสร้างโปรเจกต์

```
product-management-layered/
├── src/
│   ├── presentation/
│   │   ├── routes/
│   │   │   └── productRoutes.js
│   │   ├── controllers/
│   │   │   └── productController.js
│   │   └── middlewares/
│   │       └── errorHandler.js
│   ├── business/
│   │   ├── services/
│   │   │   └── productService.js
│   │   └── validators/
│   │       └── productValidator.js
│   └── data/
│       ├── repositories/
│       │   └── productRepository.js
│       └── database/
│           └── connection.js
├── public/
│   └── index.html
├── server.js
├── package.json
└── README.md
```

---

## 🚀 วิธีใช้งาน

### Step 1: Setup Project

```bash
# สร้างโฟลเดอร์
mkdir product-management-layered
cd product-management-layered

# สร้างโครงสร้าง
mkdir -p src/presentation/{routes,controllers,middlewares}
mkdir -p src/business/{services,validators}
mkdir -p src/data/{repositories,database}
mkdir public
```

### Step 2: สร้างไฟล์ทั้งหมด

คัดลอกไฟล์ด้านล่างนี้ไปสร้างตามโครงสร้าง

---

## 📄 ไฟล์ที่ 1: package.json

```json
{
  "name": "product-management-layered",
  "version": "1.0.0",
  "description": "Product Management System - Layered Architecture Example",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "sqlite3": "^5.1.6"
  }
}
```

---

## 📄 ไฟล์ที่ 2: src/data/database/connection.js

```javascript
// src/data/database/connection.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../../products.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Database connection error:', err);
    } else {
        console.log('✅ Connected to SQLite database');
        initializeDatabase();
    }
});

function initializeDatabase() {
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        stock INTEGER DEFAULT 0,
        category TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) {
            console.error('❌ Table creation error:', err);
        } else {
            console.log('✅ Products table ready');
        }
    });
}

module.exports = db;
```

---

## 📄 ไฟล์ที่ 3: src/data/repositories/productRepository.js

```javascript
// src/data/repositories/productRepository.js
const db = require('../database/connection');

class ProductRepository {
    
    async findAll(category = null) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM products';
            let params = [];
            
            if (category) {
                sql += ' WHERE category = ?';
                params.push(category);
            }
            
            db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }
    
    async findById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }
    
    async create(productData) {
        const { name, price, stock, category } = productData;
        
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO products (name, price, stock, category) VALUES (?, ?, ?, ?)';
            
            db.run(sql, [name, price, stock || 0, category], function(err) {
                if (err) {
                    reject(err);
                } else {
                    db.get('SELECT * FROM products WHERE id = ?', [this.lastID], (err, row) => {
                        if (err) reject(err);
                        else resolve(row);
                    });
                }
            });
        });
    }
    
    async update(id, productData) {
        const { name, price, stock, category } = productData;
        
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE products SET name = ?, price = ?, stock = ?, category = ? WHERE id = ?';
            
            db.run(sql, [name, price, stock, category, id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
                        if (err) reject(err);
                        else resolve(row);
                    });
                }
            });
        });
    }
    
    async delete(id) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
                if (err) reject(err);
                else resolve({ deleted: this.changes > 0 });
            });
        });
    }
}

module.exports = new ProductRepository();
```

---

## 📄 ไฟล์ที่ 4: src/business/validators/productValidator.js

```javascript
// src/business/validators/productValidator.js
class ProductValidator {
    
    validateProductData(data) {
        const { name, price, category } = data;
        
        if (!name || !price || !category) {
            throw new Error('Name, price, and category are required');
        }
        
        return true;
    }
    
    validatePrice(price) {
        if (price <= 0) {
            throw new Error('Price must be greater than 0');
        }
        
        if (price > 1000000) {
            throw new Error('Price cannot exceed 1,000,000');
        }
        
        return true;
    }
    
    validateStock(stock) {
        if (stock < 0) {
            throw new Error('Stock cannot be negative');
        }
        
        return true;
    }
    
    validateCategory(category) {
        const validCategories = ['Electronics', 'Clothing', 'Food', 'Books', 'Toys'];
        
        if (!validCategories.includes(category)) {
            throw new Error(`Invalid category. Must be one of: ${validCategories.join(', ')}`);
        }
        
        return true;
    }
    
    validateId(id) {
        const numId = parseInt(id);
        
        if (isNaN(numId) || numId <= 0) {
            throw new Error('Invalid product ID');
        }
        
        return numId;
    }
}

module.exports = new ProductValidator();
```

---

## 📄 ไฟล์ที่ 5: src/business/services/productService.js

```javascript
// src/business/services/productService.js
const productRepository = require('../../data/repositories/productRepository');
const productValidator = require('../validators/productValidator');

class ProductService {
    
    async getAllProducts(category = null) {
        // Validate filter
        if (category) {
            productValidator.validateCategory(category);
        }
        
        // Get data
        const products = await productRepository.findAll(category);
        
        // Business logic: calculate total value
        const totalValue = products.reduce((sum, p) => {
            return sum + (p.price * p.stock);
        }, 0);
        
        // Return formatted data
        return {
            products: products,
            statistics: {
                count: products.length,
                totalValue: parseFloat(totalValue.toFixed(2))
            }
        };
    }
    
    async getProductById(id) {
        const validId = productValidator.validateId(id);
        const product = await productRepository.findById(validId);
        
        if (!product) {
            throw new Error('Product not found');
        }
        
        return product;
    }
    
    async createProduct(productData) {
        // Validate
        productValidator.validateProductData(productData);
        productValidator.validatePrice(productData.price);
        productValidator.validateCategory(productData.category);
        
        if (productData.stock !== undefined) {
            productValidator.validateStock(productData.stock);
        }
        
        // Create
        const product = await productRepository.create(productData);
        return product;
    }
    
    async updateProduct(id, productData) {
        const validId = productValidator.validateId(id);
        
        // Check exists
        const existingProduct = await productRepository.findById(validId);
        if (!existingProduct) {
            throw new Error('Product not found');
        }
        
        // Validate
        productValidator.validateProductData(productData);
        productValidator.validatePrice(productData.price);
        productValidator.validateCategory(productData.category);
        productValidator.validateStock(productData.stock);
        
        // Update
        const updatedProduct = await productRepository.update(validId, productData);
        return updatedProduct;
    }
    
    async deleteProduct(id) {
        const validId = productValidator.validateId(id);
        
        // Check exists
        const product = await productRepository.findById(validId);
        if (!product) {
            throw new Error('Product not found');
        }
        
        // Business rule: cannot delete if stock > 0
        if (product.stock > 0) {
            throw new Error('Cannot delete product with stock > 0. Please reduce stock first.');
        }
        
        // Delete
        await productRepository.delete(validId);
        return { message: 'Product deleted successfully' };
    }
}

module.exports = new ProductService();
```

---

## 📄 ไฟล์ที่ 6: src/presentation/controllers/productController.js

```javascript
// src/presentation/controllers/productController.js
const productService = require('../../business/services/productService');

class ProductController {
    
    async getAllProducts(req, res, next) {
        try {
            const { category } = req.query;
            const result = await productService.getAllProducts(category);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
    
    async getProductById(req, res, next) {
        try {
            const { id } = req.params;
            const product = await productService.getProductById(id);
            res.json(product);
        } catch (error) {
            next(error);
        }
    }
    
    async createProduct(req, res, next) {
        try {
            const productData = req.body;
            const product = await productService.createProduct(productData);
            res.status(201).json(product);
        } catch (error) {
            next(error);
        }
    }
    
    async updateProduct(req, res, next) {
        try {
            const { id } = req.params;
            const productData = req.body;
            const product = await productService.updateProduct(id, productData);
            res.json(product);
        } catch (error) {
            next(error);
        }
    }
    
    async deleteProduct(req, res, next) {
        try {
            const { id } = req.params;
            const result = await productService.deleteProduct(id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ProductController();
```

---

## 📄 ไฟล์ที่ 7: src/presentation/routes/productRoutes.js

```javascript
// src/presentation/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
```

---

## 📄 ไฟล์ที่ 8: src/presentation/middlewares/errorHandler.js

```javascript
// src/presentation/middlewares/errorHandler.js
function errorHandler(err, req, res, next) {
    console.error('❌ Error:', err.message);
    
    let statusCode = 500;
    
    // Validation errors → 400
    if (err.message.includes('required') || 
        err.message.includes('Invalid') ||
        err.message.includes('must be') ||
        err.message.includes('cannot') ||
        err.message.includes('Cannot')) {
        statusCode = 400;
    }
    
    // Not found errors → 404
    if (err.message.includes('not found')) {
        statusCode = 404;
    }
    
    res.status(statusCode).json({
        error: err.message || 'Internal server error'
    });
}

module.exports = errorHandler;
```

---

## 📄 ไฟล์ที่ 9: server.js

```javascript
// server.js
const express = require('express');
const productRoutes = require('./src/presentation/routes/productRoutes');
const errorHandler = require('./src/presentation/middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.use('/api/products', productRoutes);
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════╗
║  Product Management System (Layered)         ║
║  Server running on http://localhost:${PORT}  ║
║  API: http://localhost:${PORT}/api/products  ║
╚══════════════════════════════════════════════╝
    `);
});
```

---

## 📄 ไฟล์ที่ 10: public/index.html

```html
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Management System</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f5f5; padding: 20px; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #2563eb; margin-bottom: 30px; }
        .api-endpoints { background: #f9fafb; padding: 20px; border-radius: 8px; }
        .endpoint { margin: 15px 0; padding: 15px; background: white; border-left: 4px solid #2563eb; }
        .method { display: inline-block; padding: 5px 10px; border-radius: 4px; font-weight: bold; color: white; margin-right: 10px; }
        .get { background: #10b981; }
        .post { background: #f59e0b; }
        .put { background: #8b5cf6; }
        .delete { background: #ef4444; }
        code { background: #f3f4f6; padding: 2px 8px; border-radius: 4px; font-family: monospace; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎯 Product Management System API</h1>
        <p style="margin-bottom: 20px;">Layered Architecture Example - ENGSE207</p>
        
        <div class="api-endpoints">
            <h2 style="margin-bottom: 15px;">📡 API Endpoints:</h2>
            
            <div class="endpoint">
                <span class="method get">GET</span>
                <code>/api/products</code>
                <p>ดึงสินค้าทั้งหมด (สามารถ filter ด้วย ?category=Electronics)</p>
            </div>
            
            <div class="endpoint">
                <span class="method get">GET</span>
                <code>/api/products/:id</code>
                <p>ดึงสินค้าตาม ID</p>
            </div>
            
            <div class="endpoint">
                <span class="method post">POST</span>
                <code>/api/products</code>
                <p>เพิ่มสินค้าใหม่</p>
                <pre style="margin-top: 10px; background: #f9fafb; padding: 10px; border-radius: 4px;">
{
  "name": "Laptop",
  "price": 25000,
  "stock": 10,
  "category": "Electronics"
}</pre>
            </div>
            
            <div class="endpoint">
                <span class="method put">PUT</span>
                <code>/api/products/:id</code>
                <p>อัพเดทสินค้า</p>
            </div>
            
            <div class="endpoint">
                <span class="method delete">DELETE</span>
                <code>/api/products/:id</code>
                <p>ลบสินค้า (ต้อง stock = 0 ก่อน)</p>
            </div>
        </div>
        
        <div style="margin-top: 30px; padding: 20px; background: #fef3c7; border-radius: 8px;">
            <h3>💡 Tips:</h3>
            <ul style="margin-left: 20px; margin-top: 10px;">
                <li>ใช้ Thunder Client, Postman หรือ curl ทดสอบ API</li>
                <li>Categories ที่ valid: Electronics, Clothing, Food, Books, Toys</li>
                <li>ไม่สามารถลบสินค้าที่มี stock > 0</li>
            </ul>
        </div>
    </div>
</body>
</html>
```

---

## 🚀 การรันโปรแกรม

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Run Server

```bash
npm start
```

คุณจะเห็น:
```
✅ Connected to SQLite database
✅ Products table ready
╔══════════════════════════════════════════════╗
║  Product Management System (Layered)         ║
║  Server running on http://localhost:3000     ║
║  API: http://localhost:3000/api/products     ║
╚══════════════════════════════════════════════╝
```

---

## 🧪 ทดสอบ API

### Test 1: ดึงสินค้าทั้งหมด

```bash
curl http://localhost:3000/api/products
```

### Test 2: เพิ่มสินค้า

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop Dell XPS 15",
    "price": 45000,
    "stock": 5,
    "category": "Electronics"
  }'
```

### Test 3: ดึงสินค้าตาม ID

```bash
curl http://localhost:3000/api/products/1
```

### Test 4: Filter ตาม Category

```bash
curl http://localhost:3000/api/products?category=Electronics
```

### Test 5: อัพเดทสินค้า

```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop Dell XPS 15 (Updated)",
    "price": 42000,
    "stock": 3,
    "category": "Electronics"
  }'
```

### Test 6: ลบสินค้า (ต้องลด stock เป็น 0 ก่อน)

```bash
# Update stock เป็น 0 ก่อน
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop Dell XPS 15",
    "price": 42000,
    "stock": 0,
    "category": "Electronics"
  }'

# จากนั้นค่อยลบ
curl -X DELETE http://localhost:3000/api/products/1
```

---

## ✅ สิ่งที่ควรสังเกต

### 1. แต่ละ Layer มีหน้าที่ชัดเจน

```javascript
// ❌ Monolithic: ทุกอย่างปนกัน
app.post('/api/products', (req, res) => {
    if (!req.body.name) { ... }  // validation
    if (price <= 0) { ... }       // business logic
    db.run('INSERT...', ...)      // database
});

// ✅ Layered: แยกชัดเจน
Controller → Service → Validator + Repository
```

### 2. Error Handling เป็นระบบ

```javascript
// ทุก Controller
try {
    // logic
} catch (error) {
    next(error); // ส่งไปให้ errorHandler จัดการ
}
```

### 3. Validation ไม่ซ้ำซ้อน

```javascript
// แทนที่จะเขียนซ้ำในทุก endpoint
// เราเขียนแค่ครั้งเดียวใน Validator
```

### 4. Business Logic แยกออกมา

```javascript
// Service Layer
const totalValue = products.reduce(...)
if (product.stock > 0) throw error
```

---

## 🎯 สรุป

ระบบนี้แสดงให้เห็น:

✅ **Layered Architecture ที่สมบูรณ์**
- Presentation Layer (HTTP Handling)
- Business Layer (Logic & Validation)
- Data Layer (Database Operations)

✅ **Best Practices**
- Single Responsibility Principle
- Error Handling Middleware
- Promise-based Repository
- Validation Layer

✅ **พร้อมใช้งานจริง**
- รันได้ทันที
- มี API ครบ
- มี Error Handling

---

**นักศึกษาสามารถใช้ตัวอย่างนี้เป็น Template สำหรับข้อสอบได้!** 🚀

---

**จัดทำโดย:** อาจารย์ธนิต เกตุแก้ว  
**วิชา:** ENGSE207 สถาปัตยกรรมซอฟต์แวร์
