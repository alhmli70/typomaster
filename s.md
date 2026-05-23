هذه من أشهر مشاكل Tauri، والسبب غالبًا ليس من React بل من:

```txt id="e1n7c4"
Build Cache
```

أو:

```txt id="7r8ow5"
أن Tauri يقوم بتحزيم نسخة قديمة من dist
```

أو:

```txt id="kq4d90"
الملفات الجديدة لا تُبنى قبل التحزيم
```

---

# لماذا يعمل في tauri dev ولا يعمل بعد build ؟

لأن:

```txt id="40r5mk"
npm run tauri dev
```

يستخدم:

```txt id="8zvjlwm"
Hot Reload
```

ويقرأ الملفات مباشرة.

لكن:

```txt id="lhyyhy"
tauri build
```

يستخدم:

```txt id="eh0x3z"
نسخة dist/static مبنية مسبقًا
```

إذا كانت قديمة → سيظهر التطبيق القديم.

---

# الحل الاحترافي الكامل

# 1) احذف مجلدات الكاش بالكامل

احذف:

```txt id="i3znjn"
node_modules
dist
build
src-tauri/target
```

وأحيانًا:

```txt id="1e9vvc"
.vite
```

---

# 2) أعد تثبيت الحزم

نفذ:

```bash id="xwktdz"
npm install
```

---

# 3) ابنِ React يدويًا أولًا

مهم جدًا.

نفذ:

```bash id="wnsxhn"
npm run build
```

وتأكد أن:

```txt id="pd95dl"
dist
```

تم تحديثه.

---

# 4) تحقق من vite.config.ts

يجب أن يكون:

```ts id="du10bb"
build: {
  outDir: "dist"
}
```

---

# 5) تحقق من tauri.conf.json

افتح:

```txt id="4v4m1r"
src-tauri/tauri.conf.json
```

---

## أهم سطر

يجب أن يكون:

```json id="z1nbmy"
"frontendDist": "../dist"
```

وليس:

```json id="sk0dyv"
"distDir"
```

إذا كنت تستخدم Tauri v2.

---

# مثال صحيح لـ Tauri v2

```json id="eh9j0l"
{
  "build": {
    "beforeBuildCommand": "npm run build",
    "beforeDevCommand": "npm run dev",
    "frontendDist": "../dist"
  }
}
```

---

# السبب الأكثر شيوعًا عندك

غالبًا لديك:

```txt id="yiz4eh"
frontendDist يشير لمجلد خاطئ
```

أو:

```txt id="ay7iie"
build لا يحدث dist
```

---

# 6) نفذ Clean Build حقيقي

نفذ بالترتيب:

```bash id="n7i9x0"
cargo clean
```

ثم:

```bash id="lv5n0l"
rd /s /q dist
```

ثم:

```bash id="9yfmhq"
npm run build
```

ثم:

```bash id="f5c3vk"
npm run tauri build
```

---

# 7) مشكلة MSI القديمة

أحيانًا Windows يحتفظ بإصدار قديم.

---

## الحل

احذف النسخة القديمة بالكامل من:

```txt id="prv4tm"
Add or Remove Programs
```

ثم ثبت النسخة الجديدة.

---

# 8) مشكلة AppData الشهيرة

أحيانًا Tauri يخزن:

* قواعد البيانات
* ملفات الإعدادات
* JSON
* Cache

داخل:

```txt id="m4jpxd"
AppData
```

فيبدو أن التعديلات لم تُطبق.

---

# احذف مجلد التطبيق

اذهب إلى:

```txt id="p4k30m"
C:\Users\Admin\AppData\Roaming
```

أو:

```txt id="yz7r0g"
AppData\Local
```

وابحث عن اسم التطبيق:

```txt id="fd4t2y"
typomaster
```

واحذفه.

---

# 9) مشكلة SQLite الشهيرة

إذا كنت تستخدم:

```txt id="6mxowx"
sqlite:database.db
```

فقد يتم إنشاء قاعدة البيانات داخل:

```txt id="s80qta"
AppData
```

والنسخة القديمة تبقى موجودة.

---

# الحل

إما:

## حذف قاعدة البيانات القديمة

أو:

## تغيير Version للمigrations

أو:

## استخدام reset migrations أثناء التطوير

---

# 10) تحقق من أن build الحقيقي يحدث

بعد:

```bash id="8mhl89"
npm run build
```

افتح:

```txt id="v8hy0f"
dist/index.html
```

وتأكد أن التعديلات موجودة فعلًا.

---

# أفضل إعداد احترافي لـ Tauri

## vite.config.ts

```ts id="c2brm2"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
```

---

# أفضل إعداد لـ tauri.conf.json

```json id="zwtls4"
{
  "build": {
    "beforeBuildCommand": "npm run build",
    "beforeDevCommand": "npm run dev",
    "frontendDist": "../dist"
  }
}
```

---

# أهم خطوة غالبًا ستحل مشكلتك مباشرة

نفذ:

```bash id="m2wtph"
rd /s /q dist
rd /s /q src-tauri\target
cargo clean
npm run build
npm run tauri build
```

لأن مشكلتك بنسبة كبيرة:

```txt id="9x6ct6"
Tauri يقوم بتحزيم نسخة dist قديمة
```

وليس النسخة الجديدة.
