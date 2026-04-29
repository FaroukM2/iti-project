# 🛒 ملخص مشروع GreenMart (ITI Project)

## 📌 الفكرة العامة للمشروع (Project Overview)
مشروع **GreenMart** هو تطبيق ويب للتجارة الإلكترونية (E-commerce Web App) تم تطويره كجزء من تدريب ITI. 
يهدف التطبيق إلى تقديم تجربة مستخدم سلسة وعصرية لتصفح المنتجات، إضافتها إلى سلة التسوق، ومحاكاة عملية الشراء.
المشروع بيعتمد بشكل أساسي على جلب البيانات الحقيقية (المنتجات، الأقسام، التقييمات) من [FakeStore API](https://fakestoreapi.com/) ليكون أقرب ما يمكن لتطبيق حقيقي.

## 🚀 التقنيات المستخدمة (Tech Stack)
* **إطار العمل (Framework):** Vue.js 3 (باستخدام Composition API).
* **أداة البناء (Build Tool):** Vite (لضمان سرعة بناء وتشغيل المشروع).
* **إدارة الحالة (State Management):** Pinia (لإدارة بيانات سلة التسوق بشكل Reactive على مستوى التطبيق كله).
* **التوجيه (Routing):** Vue Router (للتنقل بين الصفحات بدون إعادة تحميل الصفحة SPA).
* **التصميم (Styling):** Vanilla CSS مع استخدام Bootstrap لتقسيم الـ Grid.
* **جلب البيانات (Data Fetching):** Fetch API / Promises.

## ✨ أهم المميزات (Key Features)
1. **تصميم عصري (Premium UI):** واجهة مستخدم جذابة ومتجاوبة (Responsive) بتصميم Glassmorphism.
2. **سلة تسوق تفاعلية (Reactive Cart):** أي تعديل في السلة (إضافة/حذف/تغيير كمية) بيسمّع فوراً في إجمالي السعر وفي الـ Badge اللي في الـ Header بفضل الـ Pinia.
3. **فلترة المنتجات (Product Filtering):** إمكانية فلترة المنتجات حسب القسم (Category) أو حسب السعر باستخدام Range Sliders.
4. **صفحات متكاملة:** 
   * `Home`: صفحة رئيسية جذابة بتعرض أهم الأقسام والمنتجات المميزة.
   * `Products`: لعرض كل المنتجات مع الفلاتر.
   * `Cart`: للتحكم في المنتجات المضافة.
   * `Contact` & `Sign In`: صفحات تفاعلية بتصميمات ممتازة ونماذج إدخال (Forms).

## 📁 هيكلية المشروع (Project Structure)
```text
iti-project/
│
├── public/                 # الملفات الثابتة (الصور الأساسية)
│   └── images/             # صور الـ Hero Section
│
├── src/                    # الكود الأساسي للمشروع
│   ├── components/         # المكونات الأساسية
│   │   └── maincomponent/  # الصفحات (Home, Product, Cart, Contact, Login, Header, Footer)
│   ├── piniastore/         # إدارة الـ State
│   │   └── cartstore.js    # مخزن سلة التسوق
│   ├── routers/            # ملفات التوجيه (Routes)
│   │   └── indexx.js       # إعدادات الـ Vue Router
│   ├── Landingcomponent.vue # المكون الرئيسي اللي بيجمع الـ Header والـ Router-View والـ Footer
│   └── main.js             # نقطة الدخول (Entry Point) للتطبيق
│
├── package.json            # إعدادات المشروع والمكتبات
└── README.md               # توثيق المشروع (English)
```

## ⚙️ طريقة التشغيل (How to Run)

لتشغيل المشروع على جهازك، اتبع الخطوات دي في الـ Terminal/Command Prompt:

**1. تنصيب الحزم والمكتبات:**
```bash
npm install
```

**2. تشغيل سيرفر التطوير (Development Server):**
```bash
npm run dev
```

**3. فتح التطبيق:**
بعد تشغيل الأمر السابق، هتشوف رابط زي `http://localhost:3000` أو `http://localhost:5173`. افتحه في المتصفح وهتلاقي المشروع شغال معاك.

---
*تم إعداد هذا المشروع ليكون جاهزاً للعرض في الـ Portfolio كدليل عملي على استخدام أحدث تقنيات Vue 3 و Pinia.*
