1- المستخدم ضغط Register
        │
        ▼
2- Express شغل registerOwnerController
        │
        ▼
3- الكنترولر أخد البيانات من req.body
        │
        ▼
4- بعتها للسيرفايس:
   registerOwner(req.body)
        │
        ▼
5- السيرفايس اشتغل
   - فحص البيانات
   - عمل Hash
   - خزّن في Database
   - أنشأ Token
        │
        ▼
6- رجع:
   {
      user,
      token
   }
        │
        ▼
7- الكنترولر خد الـ token
        │
        ▼
8- خزنه في Cookie
        │
        ▼
9- رجع Response للمستخدم

