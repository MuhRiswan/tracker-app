# 🚚 Transport Shipment Tracker

Aplikasi frontend untuk melacak dan mengelola data pengiriman barang menggunakan **Vue 3**, **Pinia**, dan **Tailwind CSS**. Fitur utama meliputi tampilan daftar pengiriman, detail pengiriman, dan penugasan transporter.

---

## ▶️ Cara Menjalankan Secara Lokal

1. **Clone repositori:**

   ```bash
   git clone https://github.com/username/shipment-tracker.git
   cd shipment-tracker
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Jalankan aplikasi:**

   ```bash
   npm run dev
   ```

4. **Jalankan unit test (opsional):**

   ```bash
   npm run test
   ```

---

## 📌 Catatan dan Asumsi

- Data shipment dan transporter menggunakan **data statis lokal** (`shipments.json`) dan disimpan di **Pinia Store**.
- Perubahan status pengiriman hanya terjadi saat transporter di-assign (bukan real-time socket).
- Validasi form menggunakan **VeeValidate + Zod**, dan notifikasi menggunakan **vue-sonner**.
- Efek Skelton dibuat menggunakan **ShadCN Vue** agar ada efek loading sebelum data dimuat.
- UI dibangun menggunakan **Tailwind CSS** dan komponen dari **ShadCN Vue**.

---

## 📦 Library yang Digunakan

- Vue 3
- Vue Router
- Vitest
- Pinia
- Tailwind CSS
- VeeValidate
- Zod
- Vue Sonner
- ShadCN Vue UI
- Skelton loading
- Class-variance-authority, clsx, tailwind-merge
