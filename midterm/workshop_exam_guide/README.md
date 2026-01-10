# 📚 WORKSHOP GUIDE: Refactoring Monolithic to Layered Architecture
## Complete Step-by-Step Tutorial with Example

---

## 🎯 Workshop Overview

**ระบบตัวอย่าง:** Product Management System (ระบบจัดการสินค้า)

**จุดประสงค์:**
1. เรียนรู้วิธี Refactor Monolithic → Layered Architecture
2. เข้าใจหน้าที่ของแต่ละ Layer
3. เห็นตัวอย่างที่สมบูรณ์ รันได้จริง
4. นำไปประยุกต์ใช้กับโจทย์ข้อสอบ

**เวลา:** 60 นาที (ก่อนสอบ)

---

## 📋 เนื้อหาใน Workshop

```
Part 1: วิเคราะห์ Monolithic Code (15 นาที)
Part 2: วางแผน Refactoring (10 นาที)  
Part 3: Refactor ทีละ Layer (30 นาที)
Part 4: ทดสอบและสรุป (5 นาที)
```

---

## 🔴 PART 1: วิเคราะห์ Monolithic Code (15 นาที)

### ระบบ Product Management (Monolithic)

```javascript
// server-monolithic.js - ปัญหาเดิม
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(express.json());

// Database connection (ปนกับทุกอย่าง)
const db = new sqlite3.Database('./products.db');

// Create table
db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    stock INTEGER DEFAULT 0,
    category TEXT NOT NULL
)`);

// GET /api/products - ดึงสินค้าทั้งหมด
app.get('/api/products', (req, res) => {
    const { category } = req.query;
    
    let sql = 'SELECT * FROM products';
    let params = [];
    
    if (category) {
        sql += ' WHERE category = ?';
        params.push(category);
    }
    
    db.all(sql, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        
        // Business logic: คำนวณมูลค่ารวม (ปนกับทุกอย่าง)
        const totalValue = rows.reduce((sum, p) => sum + (p.price * p.stock), 0);
        
        res.json({ 
            products: rows, 
            totalValue: totalValue.toFixed(2) 
        });
    });
});

// POST /api/products - เพิ่มสินค้า
app.post('/api/products', (req, res) => {
    const { name, price, stock, category } = req.body;
    
    // Validation (ปนกับ HTTP handling)
    if (!name || !price || !category) {
        return res.status(400).json({ error: 'Name, price, and category are required' });
    }
    
    // Business logic: validate price (ปนกับทุกอย่าง)
    if (price <= 0) {
        return res.status(400).json({ error: 'Price must be greater than 0' });
    }
    
    // Database insert
    const sql = 'INSERT INTO products (name, price, stock, category) VALUES (?, ?, ?, ?)';
    
    db.run(sql, [name, price, stock || 0, category], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        
        db.get('SELECT * FROM products WHERE id = ?', [this.lastID], (err, row) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(201).json(row);
        });
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

### 🔍 วิเคราะห์ปัญหา:

| ปัญหา | ตัวอย่าง |
|-------|----------|
| **1. Validation ปนกับ HTTP** | `if (!name) return res.status(400)...` อยู่ใน route handler |
| **2. Business Logic ปนกับ Data** | `if (price <= 0)` และ `db.run()` อยู่ที่เดียวกัน |
| **3. Database Query ปนกับทุกอย่าง** | `db.all()`, `db.run()` อยู่ใน route handler |
| **4. Error Handling ไม่สม่ำเสมอ** | แต่ละ endpoint handle error ต่างกัน |
| **5. Code ซ้ำซ้อน** | `res.status(500).json({ error: '...' })` ซ้ำหลายที่ |

---

## 🗺️ PART 2: วางแผน Refactoring (10 นาที)

### Step 1: กำหนด Responsibilities ของแต่ละ Layer

```
┌─────────────────────────────────────────┐
│ Presentation Layer (HTTP Layer)         │
│ ความรับผิดชอบ:                            │
│ - รับ HTTP Request                       │
│ - Parse params, query, body             │
│ - เรียก Service                          │
│ - ส่ง HTTP Response                      │
│ - Handle HTTP errors                    │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│ Business Layer (Logic Layer)            │
│ ความรับผิดชอบ:                            │
│ - Validation (format, rules)            │
│ - Business Logic (calculations, rules)  │
│ - Orchestrate Repository calls          │
│ - Transform data                        │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│ Data Layer (Persistence Layer)          │
│ ความรับผิดชอบ:                            │
│ - Database queries (CRUD)               │
│ - Database connection                   │
│ - Return raw data                       │
└────────────────┬────────────────────────┘
                 │
                 ▼
            ┌──────────┐
            │  SQLite  │
            └──────────┘
```

### Step 2: แยก Code ออกเป็นหมวดหมู่

จากโค้ด Monolithic ข้างต้น เราต้องแยก:

**📁 Presentation Layer:**
```javascript
// จาก:
app.get('/api/products', (req, res) => {
    const { category } = req.query;  // ← Parse query
    // ... logic ...
    res.json({ products, totalValue }); // ← Send response
});

// เป็น:
// Controller: รับ request, เรียก service, ส่ง response
async getAllProducts(req, res, next) {
    try {
        const { category } = req.query;
        const result = await productService.getAllProducts(category);
        res.json(result);
    } catch (error) {
        next(error);
    }
}
```

**📁 Business Layer:**
```javascript
// จาก:
if (!name || !price) { ... }  // ← Validation
if (price <= 0) { ... }        // ← Business rule
const totalValue = rows.reduce(...); // ← Calculation

// เป็น:
// Service: ทำ validation, business logic, เรียก repository
async createProduct(data) {
    // Validation
    productValidator.validateProductData(data);
    productValidator.validatePrice(data.price);
    
    // Create via repository
    const product = await productRepository.create(data);
    return product;
}
```

**📁 Data Layer:**
```javascript
// จาก:
db.all(sql, params, (err, rows) => { ... });
db.run(sql, [...], function(err) { ... });

// เป็น:
// Repository: Database operations only
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
```

---

## 🛠️ PART 3: Refactor ทีละ Layer (30 นาที)

### 🎬 สร้างโครงสร้างโฟลเดอร์ก่อน

```bash
mkdir -p src/presentation/{routes,controllers,middlewares}
mkdir -p src/business/{services,validators}
mkdir -p src/data/{repositories,database}
```

---

### 📦 STEP 3.1: Data Layer (เริ่มจากล่างขึ้นบน)

#### ไฟล์: `src/data/database/connection.js`

**💭 คิดอย่างไร:**
- Layer นี้ต้องดูแล **Database connection** เท่านั้น
- ไม่มี business logic
- ไม่มี HTTP handling

```javascript
// src/data/database/connection.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../../products.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to SQLite database');
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
    )`);
}

module.exports = db;
```

**✅ สิ่งที่ทำ:**
- ✅ สร้าง database connection
- ✅ Initialize tables
- ✅ Export db object

**❌ สิ่งที่ไม่ทำ:**
- ❌ ไม่มี queries (ให้ Repository ทำ)
- ❌ ไม่มี validation
- ❌ ไม่มี business logic

---

#### ไฟล์: `src/data/repositories/productRepository.js`

**💭 คิดอย่างไร:**
- Layer นี้ต้องทำ **Database operations (CRUD)** เท่านั้น
- แต่ละ function = 1 SQL query
- Return raw data (ไม่ transform)
- ใช้ Promise เพื่อให้ async/await ได้

```javascript
// src/data/repositories/productRepository.js
const db = require('../database/connection');

class ProductRepository {
    
    // 💡 Pattern: แต่ละ function = 1 responsibility
    
    // Query: SELECT * FROM products (with optional filter)
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
    
    // Query: SELECT * FROM products WHERE id = ?
    async findById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
                if (err) reject(err);
                else resolve(row); // อาจเป็น undefined ถ้าไม่เจอ
            });
        });
    }
    
    // Query: INSERT INTO products ...
    async create(productData) {
        const { name, price, stock, category } = productData;
        
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO products (name, price, stock, category) VALUES (?, ?, ?, ?)';
            
            db.run(sql, [name, price, stock || 0, category], function(err) {
                if (err) {
                    reject(err);
                } else {
                    // Return the created product
                    db.get('SELECT * FROM products WHERE id = ?', [this.lastID], (err, row) => {
                        if (err) reject(err);
                        else resolve(row);
                    });
                }
            });
        });
    }
    
    // Query: UPDATE products SET ... WHERE id = ?
    async update(id, productData) {
        const { name, price, stock, category } = productData;
        
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE products SET name = ?, price = ?, stock = ?, category = ? WHERE id = ?';
            
            db.run(sql, [name, price, stock, category, id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    // Return updated product
                    db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
                        if (err) reject(err);
                        else resolve(row);
                    });
                }
            });
        });
    }
    
    // Query: DELETE FROM products WHERE id = ?
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

**✅ สิ่งที่ทำ:**
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ แต่ละ function มี 1 responsibility
- ✅ Return raw data
- ✅ ใช้ Promise pattern

**❌ สิ่งที่ไม่ทำ:**
- ❌ ไม่มี validation (ให้ Business Layer ทำ)
- ❌ ไม่มี calculations (ให้ Service ทำ)
- ❌ ไม่ throw custom errors (แค่ forward database errors)

---

### 🧠 STEP 3.2: Business Layer

#### ไฟล์: `src/business/validators/productValidator.js`

**💭 คิดอย่างไร:**
- Layer นี้ต้องทำ **Validation** เท่านั้น
- แยก function ตาม type ของ validation
- Throw Error ถ้า validation ไม่ผ่าน

```javascript
// src/business/validators/productValidator.js
class ProductValidator {
    
    // Validate required fields
    validateProductData(data) {
        const { name, price, category } = data;
        
        if (!name || !price || !category) {
            throw new Error('Name, price, and category are required');
        }
        
        return true;
    }
    
    // Validate price (business rule)
    validatePrice(price) {
        if (price <= 0) {
            throw new Error('Price must be greater than 0');
        }
        
        if (price > 1000000) {
            throw new Error('Price cannot exceed 1,000,000');
        }
        
        return true;
    }
    
    // Validate stock
    validateStock(stock) {
        if (stock < 0) {
            throw new Error('Stock cannot be negative');
        }
        
        return true;
    }
    
    // Validate category
    validateCategory(category) {
        const validCategories = ['Electronics', 'Clothing', 'Food', 'Books', 'Toys'];
        
        if (!validCategories.includes(category)) {
            throw new Error(`Invalid category. Must be one of: ${validCategories.join(', ')}`);
        }
        
        return true;
    }
    
    // Validate ID
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

**✅ Pattern ที่ดี:**
- แยก function ตาม validation type
- Throw Error ถ้าไม่ผ่าน
- Return true ถ้าผ่าน (หรือ return ค่าที่ cleaned/parsed)

---

#### ไฟล์: `src/business/services/productService.js`

**💭 คิดอย่างไร:**
- Layer นี้เป็น **"สมอง"** ของระบบ
- ประสานงานระหว่าง Validator และ Repository
- ทำ business logic (calculations, transformations)
- Return data ในรูปแบบที่ Controller ต้องการ

```javascript
// src/business/services/productService.js
const productRepository = require('../../data/repositories/productRepository');
const productValidator = require('../validators/productValidator');

class ProductService {
    
    // 💡 Pattern: Validate → Repository → Transform → Return
    
    async getAllProducts(category = null) {
        // 1. Validate (ถ้ามี filter)
        if (category) {
            productValidator.validateCategory(category);
        }
        
        // 2. Get data from repository
        const products = await productRepository.findAll(category);
        
        // 3. Business logic: คำนวณมูลค่ารวม
        const totalValue = products.reduce((sum, p) => {
            return sum + (p.price * p.stock);
        }, 0);
        
        // 4. Return in format controller needs
        return {
            products: products,
            statistics: {
                count: products.length,
                totalValue: parseFloat(totalValue.toFixed(2))
            }
        };
    }
    
    async getProductById(id) {
        // 1. Validate ID
        const validId = productValidator.validateId(id);
        
        // 2. Get from repository
        const product = await productRepository.findById(validId);
        
        // 3. Check if found
        if (!product) {
            throw new Error('Product not found');
        }
        
        // 4. Return
        return product;
    }
    
    async createProduct(productData) {
        // 1. Validate all fields
        productValidator.validateProductData(productData);
        productValidator.validatePrice(productData.price);
        productValidator.validateCategory(productData.category);
        
        if (productData.stock !== undefined) {
            productValidator.validateStock(productData.stock);
        }
        
        // 2. Create via repository
        const product = await productRepository.create(productData);
        
        // 3. Return created product
        return product;
    }
    
    async updateProduct(id, productData) {
        // 1. Validate ID
        const validId = productValidator.validateId(id);
        
        // 2. Check if product exists
        const existingProduct = await productRepository.findById(validId);
        if (!existingProduct) {
            throw new Error('Product not found');
        }
        
        // 3. Validate new data
        productValidator.validateProductData(productData);
        productValidator.validatePrice(productData.price);
        productValidator.validateCategory(productData.category);
        productValidator.validateStock(productData.stock);
        
        // 4. Update via repository
        const updatedProduct = await productRepository.update(validId, productData);
        
        // 5. Return
        return updatedProduct;
    }
    
    async deleteProduct(id) {
        // 1. Validate ID
        const validId = productValidator.validateId(id);
        
        // 2. Check if product exists
        const product = await productRepository.findById(validId);
        if (!product) {
            throw new Error('Product not found');
        }
        
        // 3. Business rule: cannot delete if stock > 0
        if (product.stock > 0) {
            throw new Error('Cannot delete product with stock > 0');
        }
        
        // 4. Delete via repository
        await productRepository.delete(validId);
        
        // 5. Return success message
        return { message: 'Product deleted successfully' };
    }
}

module.exports = new ProductService();
```

**✅ Pattern ที่เห็น:**
1. **Validate first** - ตรวจสอบ input ก่อนเสมอ
2. **Check existence** - ตรวจสอบว่า resource มีอยู่จริงก่อน update/delete
3. **Apply business rules** - เช่น "ห้ามลบถ้า stock > 0"
4. **Call repository** - เรียก database operations
5. **Return formatted data** - ส่งกลับในรูปแบบที่ controller ต้องการ

---

### 🎨 STEP 3.3: Presentation Layer

#### ไฟล์: `src/presentation/controllers/productController.js`

**💭 คิดอย่างไร:**
- Layer นี้ต้องทำ **HTTP handling** เท่านั้น
- Parse request (params, query, body)
- เรียก Service
- ส่ง HTTP response
- Forward errors ไปที่ error handler

```javascript
// src/presentation/controllers/productController.js
const productService = require('../../business/services/productService');

class ProductController {
    
    // 💡 Pattern: Parse → Service → Response
    
    async getAllProducts(req, res, next) {
        try {
            // 1. Parse query parameters
            const { category } = req.query;
            
            // 2. Call service
            const result = await productService.getAllProducts(category);
            
            // 3. Send HTTP response
            res.json(result);
            
        } catch (error) {
            // 4. Forward error to middleware
            next(error);
        }
    }
    
    async getProductById(req, res, next) {
        try {
            // 1. Parse params
            const { id } = req.params;
            
            // 2. Call service
            const product = await productService.getProductById(id);
            
            // 3. Send response
            res.json(product);
            
        } catch (error) {
            next(error);
        }
    }
    
    async createProduct(req, res, next) {
        try {
            // 1. Parse body
            const productData = req.body;
            
            // 2. Call service
            const product = await productService.createProduct(productData);
            
            // 3. Send 201 Created
            res.status(201).json(product);
            
        } catch (error) {
            next(error);
        }
    }
    
    async updateProduct(req, res, next) {
        try {
            // 1. Parse params + body
            const { id } = req.params;
            const productData = req.body;
            
            // 2. Call service
            const product = await productService.updateProduct(id, productData);
            
            // 3. Send response
            res.json(product);
            
        } catch (error) {
            next(error);
        }
    }
    
    async deleteProduct(req, res, next) {
        try {
            // 1. Parse params
            const { id } = req.params;
            
            // 2. Call service
            const result = await productService.deleteProduct(id);
            
            // 3. Send response
            res.json(result);
            
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ProductController();
```

**✅ Pattern ที่เห็น:**
- ทุก function มี `try-catch`
- Parse → Service → Response → Error
- ไม่มี business logic
- ไม่มี validation (ให้ Service ทำ)

---

#### ไฟล์: `src/presentation/routes/productRoutes.js`

```javascript
// src/presentation/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Define routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
```

---

#### ไฟล์: `src/presentation/middlewares/errorHandler.js`

**💭 คิดอย่างไร:**
- Middleware นี้รับ errors จาก controllers
- แปลง errors เป็น HTTP status codes
- ส่ง consistent error response

```javascript
// src/presentation/middlewares/errorHandler.js
function errorHandler(err, req, res, next) {
    console.error('Error:', err.message);
    
    // Determine status code based on error message
    let statusCode = 500;
    
    // Validation errors → 400
    if (err.message.includes('required') || 
        err.message.includes('Invalid') ||
        err.message.includes('must be') ||
        err.message.includes('cannot')) {
        statusCode = 400;
    }
    
    // Not found errors → 404
    if (err.message.includes('not found')) {
        statusCode = 404;
    }
    
    // Send consistent error response
    res.status(statusCode).json({
        error: err.message || 'Internal server error'
    });
}

module.exports = errorHandler;
```

---

### 🎬 STEP 3.4: Entry Point (server.js)

```javascript
// server.js
const express = require('express');
const productRoutes = require('./src/presentation/routes/productRoutes');
const errorHandler = require('./src/presentation/middlewares/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/products', productRoutes);

// Error handling (must be last)
app.use(errorHandler);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Product Management System running on http://localhost:${PORT}`);
});
```

---

## ✅ PART 4: ทดสอบและสรุป (5 นาที)

### ทดสอบระบบ

```bash
# 1. Install dependencies
npm install express sqlite3

# 2. Run server
node server.js

# 3. Test APIs
```

**Test GET all products:**
```bash
curl http://localhost:3000/api/products
```

**Test CREATE product:**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","price":25000,"stock":10,"category":"Electronics"}'
```

**Test GET by ID:**
```bash
curl http://localhost:3000/api/products/1
```

---

## 📊 สรุปความแตกต่าง Monolithic vs Layered

| Aspect | Monolithic (เดิม) | Layered (ใหม่) |
|--------|-------------------|----------------|
| **File Structure** | 1 file (server.js) | 9 files in 3 layers |
| **Separation** | ❌ ปนกันหมด | ✅ แยกชัดเจน |
| **Validation** | ❌ ซ้ำซ้อนในทุก endpoint | ✅ รวมอยู่ใน Validator |
| **Error Handling** | ❌ แต่ละ endpoint ทำเอง | ✅ มี error handler กลาง |
| **Testing** | ❌ ยาก ต้อง test ทั้งระบบ | ✅ Test แยก layer ได้ |
| **Maintenance** | ❌ แก้ที่ไหนต้องระวัง | ✅ แก้ layer ไหนก็ได้ |
| **Team Work** | ❌ แก้ file เดียวกัน conflict | ✅ แต่ละคนทำ layer ของตัวเอง |

---

## 🎯 สิ่งที่นักศึกษาต้องจำ

### 1. **Data Layer = "พูดกับ Database"**
```javascript
// ✅ ทำ:
async findAll() { return db.all(...) }

// ❌ ไม่ทำ:
if (!name) throw error  // ← นี่คือ validation ไม่ใช่ data layer
```

### 2. **Business Layer = "สมองของระบบ"**
```javascript
// ✅ ทำ:
validator.check(data)
const result = await repository.find()
return transformed(result)

// ❌ ไม่ทำ:
res.json(result)  // ← นี่คือ HTTP handling ไม่ใช่ business layer
```

### 3. **Presentation Layer = "คุยกับ User"**
```javascript
// ✅ ทำ:
const data = req.body
const result = await service.do(data)
res.json(result)

// ❌ ไม่ทำ:
if (price < 0) ...  // ← นี่คือ validation ไม่ใช่ presentation layer
```

---

## 📝 Checklist สำหรับการ Refactor

เมื่อนักศึกษาทำโจทย์ข้อสอบ ให้ตรวจสอบ:

### Data Layer
- [ ] มี connection.js แยกออกมา
- [ ] Repository มี CRUD functions ครบ
- [ ] แต่ละ function return Promise
- [ ] ไม่มี validation หรือ business logic

### Business Layer
- [ ] Validator มีทุก validation rules
- [ ] Service เรียก validator ก่อนเสมอ
- [ ] Service เรียก repository
- [ ] มี business logic (calculations, rules)

### Presentation Layer
- [ ] Controller parse request
- [ ] Controller เรียก service
- [ ] Controller ส่ง response
- [ ] มี error handler middleware

### Overall
- [ ] แต่ละ layer มีหน้าที่ชัดเจน
- [ ] ไม่มี code ซ้ำซ้อน
- [ ] Server รันได้
- [ ] API ทำงานได้ทุกตัว

---

## 🎓 Workshop สรุป

**สิ่งที่เรียนรู้:**
1. ✅ วิธีวิเคราะห์ Monolithic code
2. ✅ วิธีแบ่ง responsibilities ของแต่ละ layer
3. ✅ วิธี refactor ทีละ layer (bottom-up)
4. ✅ Pattern ที่ดีสำหรับแต่ละ layer

**ขั้นตอนที่ต้องทำ:**
1. เริ่มจาก **Data Layer** (connection + repository)
2. ต่อด้วย **Business Layer** (validator + service)
3. จบที่ **Presentation Layer** (controller + routes)
4. เพิ่ม **Error Handler** middleware
5. Update **server.js**

**ตอนนี้นักศึกษาพร้อมทำข้อสอบแล้ว!** 🚀

---

**จัดทำโดย:** อาจารย์ธนิต เกตุแก้ว  
**วิชา:** ENGSE207 สถาปัตยกรรมซอฟต์แวร์
