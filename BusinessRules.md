# 🍽️ ServeOS Business Rules

## Overview

ServeOS هو نظام متكامل لإدارة المطاعم والكافيهات (Restaurant Operating System)، وليس مجرد POS. يهدف إلى إدارة جميع عمليات المطعم من مكان واحد، بدايةً من إنشاء الطلب وحتى التقارير والمخزون.

يدعم النظام:

- Dine-In
- Takeaway
- Delivery

---

# 1. Authentication

## Rules

- كل مستخدم يمتلك Email فريد.
- كلمات المرور يتم تشفيرها باستخدام Hash.
- لا يمكن تسجيل الدخول بحساب Disabled.
- جميع الـ APIs المحمية تحتاج Authentication.
- جميع عمليات Login وLogout يتم تسجيلها في Audit Log.

---

# 2. Restaurant

## Rules

- كل مطعم يمتلك Owner واحد.
- جميع البيانات داخل النظام مرتبطة بمطعم معين.
- لا يستطيع أي موظف رؤية بيانات مطعم آخر.
- يمكن لصاحب المطعم تعديل إعدادات المطعم.

---

# 3. Branches

## Rules

- المطعم يمكن أن يحتوي على أكثر من فرع.
- كل فرع يمتلك:
  - Tables
  - Orders
  - Inventory
  - Employees
- كل Order مرتبط بفرع واحد فقط.

---

# 4. Users

## Supported Roles

- Owner
- Manager
- Cashier
- Waiter
- Chef

## Rules

- لا يمكن حذف Owner.
- لا يمكن حذف آخر Manager.
- الموظف المعطل لا يستطيع تسجيل الدخول.
- كل موظف يمتلك Role واحد فقط.
- جميع العمليات المهمة يتم تسجيلها داخل Audit Log.

---

# 5. Tables

## Status

- Available
- Occupied
- Reserved
- Cleaning

## Rules

- لا يمكن فتح Order على ترابيزة مشغولة.
- لا يمكن حذف ترابيزة عليها Order مفتوح.
- عند إنهاء الفاتورة تصبح الترابيزة Available.
- يمكن حجز الترابيزة مسبقًا (Future Feature).

---

# 6. Menu Categories

## Rules

- اسم الـ Category يكون Unique داخل المطعم.
- لا يمكن حذف Category تحتوي على أصناف.
- يمكن تعطيل Category دون حذفها.

---

# 7. Menu Items

## Rules

- كل Item ينتمي إلى Category واحدة.
- السعر يجب أن يكون أكبر من صفر.
- يمكن تعطيل Item دون حذفه.
- لا يمكن طلب Item غير متاح.
- حذف الصنف يكون Soft Delete للحفاظ على تاريخ الطلبات.

---

# 8. Orders

## Supported Types

- Dine-In
- Takeaway
- Delivery

## Rules

- كل Order يمتلك رقم Unique.
- لا يمكن إنشاء Order بدون Items.
- كل Order مرتبط بفرع.
- يمكن إضافة أو حذف Items طالما لم يبدأ التحضير.
- لا يمكن تعديل Order بعد الدفع.
- جميع التعديلات يتم تسجيلها في Audit Log.

---

# 9. Dine-In

## Rules

- يجب اختيار Table.
- يجب تحديد Waiter.
- يمكن إضافة أكثر من Round لنفس الترابيزة.
- لا يمكن إغلاق الترابيزة قبل إنهاء الفاتورة.
- لا يمكن نقل الطلب لترابيزة أخرى بعد بدء التحضير.

---

# 10. Takeaway

## Rules

- لا يحتاج Table.
- يمكن تسجيل اسم العميل ورقم الهاتف.
- يمكن الدفع قبل أو بعد التحضير حسب إعدادات المطعم.

---

# 11. Delivery

## Rules

- يجب إدخال عنوان التوصيل.
- يجب إدخال رقم الهاتف.
- يمكن إضافة رسوم توصيل.
- لا يمكن تحويل الطلب إلى Out For Delivery قبل أن يصبح Ready.
- يمكن ربط الطلب بسائق (Future Feature).

---

# 12. Kitchen Display System (KDS)

## Status

- Pending
- Preparing
- Ready
- Served
- Cancelled

## Rules

- الشيف يستطيع فقط تحديث حالة الطلب.
- الشيف لا يستطيع تعديل الأسعار.
- الشيف لا يستطيع حذف الطلب.
- لا يمكن الرجوع من Ready إلى Pending.
- عند انتهاء التحضير يصل إشعار للويتر أو الكاشير.

---

# 13. Payments

## Supported Methods

- Cash
- Card
- Wallet

## Rules

- لا يمكن دفع نفس الطلب مرتين.
- كل عملية دفع تمتلك Transaction خاصة بها.
- لا يمكن تعديل الطلب بعد الدفع.
- يدعم Refund (Future Feature).

---

# 14. Inventory

## Rules

- كل مادة خام تمتلك كمية حالية.
- لكل مادة حد أدنى.
- عند الوصول للحد الأدنى يصدر Alert.
- لا يمكن أن تصبح الكمية بالسالب.
- يتم خصم المكونات تلقائيًا عند بيع الأصناف المرتبطة بها إذا كانت Inventory Management مفعلة.

---

# 15. Suppliers

## Rules

- لكل Supplier بيانات اتصال.
- يمكن ربط المورد بعدة مواد خام.
- لا يمكن حذف المورد إذا كان مرتبطًا بعمليات شراء سابقة.
- يفضل تعطيله بدلاً من حذفه.

---

# 16. Reports

## يوفر النظام

- Daily Sales
- Weekly Sales
- Monthly Sales
- Yearly Sales
- Most Sold Items
- Least Sold Items
- Revenue
- Orders Count
- Employees Performance
- Branch Performance

## Rules

- تعتمد التقارير على البيانات الفعلية.
- لا يمكن تعديلها يدويًا.
- يمكن فلترتها حسب التاريخ أو الفرع.

---

# 17. Notifications

## يتم إرسال إشعارات عند

- إنشاء Order جديد.
- انتهاء التحضير.
- نقص المخزون.
- نجاح أو فشل الدفع.
- إضافة موظف جديد.
- تسجيل دخول جديد.

---

# 18. Audit Logs

## يتم تسجيل

- Login
- Logout
- Create
- Update
- Delete
- Cancel Order
- Refund
- Price Changes
- Permission Changes

## Rules

- لا يمكن تعديل Audit Logs.
- يستطيع Owner وManager فقط الاطلاع عليها.

---

# 19. Roles & Permissions

| Permission | Owner | Manager | Cashier | Waiter | Chef |
|------------|:-----:|:-------:|:--------:|:------:|:----:|
| Manage Employees | ✅ | ✅ | ❌ | ❌ | ❌ |
| Manage Menu | ✅ | ✅ | ❌ | ❌ | ❌ |
| Manage Categories | ✅ | ✅ | ❌ | ❌ | ❌ |
| Create Orders | ✅ | ✅ | ✅ | ✅ | ❌ |
| Edit Orders | ✅ | ✅ | ✅ | ✅* | ❌ |
| Cancel Orders | ✅ | ✅ | ✅ | ❌ | ❌ |
| Kitchen Status | ❌ | ❌ | ❌ | ❌ | ✅ |
| Payments | ✅ | ✅ | ✅ | ❌ | ❌ |
| Reports | ✅ | ✅ | حسب الصلاحيات | ❌ | ❌ |
| Settings | ✅ | ❌ | ❌ | ❌ | ❌ |

> *الويتر يمكنه تعديل الطلب فقط قبل بدء التحضير.*

---

# 20. General Business Rules

- جميع البيانات مرتبطة بمطعم وفرع.
- جميع العمليات تحتاج صلاحيات مناسبة.
- لا يمكن تنفيذ أي عملية خارج صلاحيات المستخدم.
- جميع العمليات المهمة يتم تسجيلها داخل Audit Log.
- جميع العمليات التي تحتاج تحديثًا لحظيًا تعتمد على Socket.IO.
- النظام مصمم ليكون قابلًا للتوسع وإضافة فروع ومطاعم جديدة مستقبلًا.

---

# 🚀 Future Roadmap

- QR Menu
- Online Ordering
- Customer Accounts
- Loyalty System
- Coupons & Discounts
- Kitchen Priority Queue
- Table Reservation
- Driver Management
- AI Sales Analytics
- AI Demand Forecasting
- Multi Language
- Multi Currency
- Mobile App
- Receipt Printer Integration
- Barcode Scanner Integration
- Offline Mode
- Live Dashboard Statistics