# 🍹 Beverages Ordering System (Node.js + MongoDB + Redis)

A complete backend system for handling customer beverage orders with authentication, Redis caching, JWT token flow, and background comment syncing — all built with **Node.js**, **Express**, **MongoDB**, and **Redis**.

---

## 🚀 Features

- ✅ Customer authentication (JWT-based)
- ✅ Role-based access control (`admin` vs `customer`)
- ✅ Redis caching for performance & background operations
- ✅ Refresh token mechanism with theft detection
- ✅ Order creation and acknowledgment (admin-confirmed)
- ✅ Image upload via `multer` (profile pictures and product images)
- ✅ Commenting system (customer-only) for orders
- ✅ Comments synced via Redis polling (no WebSockets)

---



---

## 🔐 Auth Flow (JWT + Redis)

### Access & Refresh Tokens
- On login, the server issues:
  - `Access Token`: expires in 5 minutes
  - `Refresh Token`: expires in 24 hours and saved in MongoDB

### Refresh Logic
- When the access token expires:
  - A valid refresh token allows re-authentication and issues new tokens
  - Theft detection checks if the refresh token in the cookie matches the one in DB

### Token Security
- All tokens are set as `httpOnly`, `secure`, and `sameSite: strict`
- Versioning in refresh tokens is used for enhanced control

---

## 🧾 Order Lifecycle

1. **Customer places an order** (includes  custom comments)
2. **Order is cached in Redis** temporarily
3. **Admin confirms/prepares** orders via an "acknowledge" route
4. Confirmed orders remain visible to the customer until picked up
5. After pickup, the order is removed by admin for cleanup

---

## 💬 Comment System (Customer-Only)

- Customers can attach comments when ordering
- Comments are temporarily stored in Redis for faster updates
- A background polling function (`setInterval`) writes them to MongoDB
- Admins **shall not** post comments(in progress to prohibit admins)
- No WebSocket is used — it's polling-based comment syncing

---

## 📦 Image Uploads

- Implemented via `multer`
- Supported:
  - Profile picture uploads during registration
- Stored as `Buffer.toString("base64")` in MongoDB

---

## 🛡️ Tech Stack

| Tech        | Purpose                               |
|-------------|----------------------------------------|
| Node.js     | Backend runtime                        |
| Express.js  | Web framework                          |
| MongoDB     | Primary database                       |
| Redis       | In-memory cache for orders/comments    |
| JWT         | Auth token management                  |
| bcrypt      | Password hashing (via Mongoose hooks)  |
| Multer      | Image uploads (multipart/form-data)    |

---

## ⚠️ Known Limitations / Notes

- No WebSocket or Socket.IO — background polling is used instead
- Admins manually confirm orders,through sining in using role based sign in system, but customer side still shows them until collected
- Refresh token theft check only works if both tokens are present and correctly stored

---

## ✅ Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/yourname/beverages-backend.git
cd beverages-backend
npm install
