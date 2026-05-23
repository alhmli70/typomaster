# دليل بناء TypoMaster كتطبيق سطح مكتب (EXE / MSI)

## نظرة عامة

تم تحويل TypoMaster من تطبيق ويب (React + Express + Node.js SEA) إلى **تطبيق سطح مكتب مستقل باستخدام Tauri v2**.

### البنية الجديدة

```
TypoMaster/
├── src/                          # واجهة React (Frontend)
│   ├── database/
│   │   ├── driver.ts             # محرك قاعدة البيانات (Tauri SQL / sql.js)
│   │   ├── db.ts
│   │   └── repositories/         # طبقة الوصول للبيانات
│   ├── components/
│   ├── contexts/
│   └── ...
├── src-tauri/                    # ⬅️ Tauri Backend (Rust)
│   ├── Cargo.toml                # اعتماديات Rust
│   ├── src/
│   │   ├── main.rs               # نقطة الدخول
│   │   └── lib.rs                # تهيئة قاعدة البيانات + أوامر Tauri
│   ├── tauri.conf.json           # إعدادات التطبيق والنافذة
│   ├── capabilities/default.json # صلاحيات (SQL, FS, Shell)
│   └── icons/                    # أيقونات التطبيق
├── .gitignore
├── build-tauri.ps1               # سكربت البناء (مع إعداد MSVC)
├── package.json
└── vite.config.ts
```

---

## المتطلبات الأساسية (Prerequisites)

| الأداة | الإصدار المطلوب |
|--------|-----------------|
| Node.js | ≥ 20 |
| npm | ≥ 10 |
| Rust | ≥ 1.77 (nightly أو stable) |
| Visual Studio 2022 | Build Tools أو Community/Enterprise |
| Windows SDK | ≥ 10.0.19041 |
| WebView2 | مضمّن مع Windows 11 / Edge |

### 1. التحقق من المتطلبات

```powershell
node --version
npm --version
rustc --version
cargo --version
```

### 2. التأكد من وجود MSVC Build Tools

Tauri على Windows يحتاج إلى `link.exe` من MSVC. تأكد من وجود Visual Studio 2022 مع مكون:

- **"Desktop development with C++"**

للتحقق:

```powershell
Get-ChildItem "C:\Program Files\Microsoft Visual Studio\2022\*\VC\Tools\MSVC\*\bin\Hostx64\x64\link.exe"
```

### 3. تثبيت Tauri CLI

```powershell
npm install -D @tauri-apps/cli@^2
```

أو عبر cargo:

```powershell
cargo install tauri-cli --version "^2"
```

---

## هيكل src-tauri

### `src-tauri/Cargo.toml`

```toml
[package]
name = "typomaster"
version = "1.0.0"
edition = "2021"

[lib]
name = "typomaster_lib"
crate-type = ["lib", "cdylib", "staticlib"]

[build-dependencies]
tauri-build = { version = "2" }

[dependencies]
tauri = { version = "2" }
tauri-plugin-sql = { version = "2", features = ["sqlite"] }
tauri-plugin-fs = "2"
tauri-plugin-shell = "2"
serde = { version = "1", features = ["derive"] }
serde_json = "1"
reqwest = { version = "0.12", features = ["json"] }
tokio = { version = "1", features = ["full"] }
```

**شرح الاعتماديات:**
- `tauri-plugin-sql` → قاعدة بيانات SQLite (تخزين حقيقي على القرص)
- `tauri-plugin-fs` → الوصول لنظام الملفات
- `tauri-plugin-shell` → تشغيل أوامر النظام
- `reqwest` → استدعاءات HTTP (لـ Gemini API)
- `serde/serde_json` → تحويل البيانات بين Rust والواجهة

### `src-tauri/src/lib.rs` - النواة

```rust
use tauri_plugin_sql::{Migration, MigrationKind};

#[tauri::command]
async fn get_ai_tip(
    lesson_title: String,
    lesson_content: String,
    language: String,
) -> Result<String, String> {
    // نصوص محلية مدمجة (بدون الحاجة لـ API خارجي)
    let tips = if language == "ar" { LOCAL_TIPS_AR } else { LOCAL_TIPS_EN };
    let index = (lesson_title.len() + lesson_content.len()) % tips.len();
    Ok(tips[index].to_string())
}

fn migrations() -> Vec<Migration> {
    vec![Migration {
        version: 1,
        description: "create initial tables",
        sql: "CREATE TABLE IF NOT EXISTS settings (...);
              CREATE TABLE IF NOT EXISTS exercises (...);
              CREATE TABLE IF NOT EXISTS typing_sessions (...);
              ...",
        kind: MigrationKind::Up,
    }]
}

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::default()
            .add_migrations("sqlite:TypoMaster.db", migrations())
            .build())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![get_ai_tip])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

**النقاط المهمة:**
- التهيئة التلقائية للجداول تحدث مرة واحدة عند أول تشغيل (Migrations)
- قاعدة البيانات تُخزّن في `%APPDATA%/com.typomaster.desktop/`
- أمر `get_ai_tip` يُستدعى من الواجهة عبر `invoke()`

### `src-tauri/tauri.conf.json`

```json
{
  "identifier": "com.typomaster.desktop",
  "build": {
    "frontendDist": "../dist",
    "devUrl": "http://localhost:1420",
    "beforeDevCommand": "npm run dev:tauri",
    "beforeBuildCommand": "npm run build"
  },
  "app": {
    "windows": [{
      "title": "TypoMaster",
      "width": 1280,
      "height": 800,
      "center": true
    }],
    "security": { "csp": null }
  },
  "bundle": {
    "active": true,
    "targets": "msi",
    "icon": ["icons/32x32.png", "icons/128x128.png", "icons/icon.ico"]
  }
}
```

### `src-tauri/capabilities/default.json`

الصلاحيات الممنوحة للتطبيق:

```json
{
  "windows": ["main"],
  "permissions": [
    "core:default",
    "sql:default",
    "sql:allow-load",
    "sql:allow-execute",
    "sql:allow-select",
    "fs:default",
    "shell:default"
  ]
}
```

> **⚠️ بدون هذه الصلاحيات، أوامر قاعدة البيانات ستتعطل في الإنتاج!**

---

## طبقة قاعدة البيانات في الواجهة (Frontend)

### `src/database/driver.ts`

المشكلة الأصلية: المشروع كان يستخدم `sql.js` (WASM) مع `localStorage` لتخزين البيانات، مما يفقد البيانات عند مسح cache المتصفح.

الحل: **نظام مزدوج** يكتشف البيئة تلقائياً:

```typescript
export async function initDatabase(): Promise<boolean> {
  if (typeof window !== 'undefined' && (window as any).__TAURI__ !== undefined) {
    // ── وضع Tauri: استخدام tauri-plugin-sql ──
    const d = new TauriDriver();
    await d.ensureDb();  // يتصل بقاعدة بيانات SQLite حقيقية
  } else {
    // ── وضع المتصفح: استخدام sql.js مع localStorage (احتياطي) ──
    const d = new SqlJsDriver();
    await d.ensureDb();
  }
}
```

**TauriDriver** يستخدم `@tauri-apps/plugin-sql` مع اتصال مباشر بـ SQLite:

```typescript
const Database = (await import('@tauri-apps/plugin-sql')).default;
this.db = await Database.load('sqlite:TypoMaster.db');
```

### `src/components/Lessons.tsx` - استدعاء AI Tips

تم تعديل استدعاء النصائح ليستخدم Tauri invoke:

```typescript
if (typeof window !== 'undefined' && (window as any).__TAURI__ !== undefined) {
  const { invoke } = await import('@tauri-apps/api/core');
  result = await invoke<string>('get_ai_tip', {
    lessonTitle: lesson.title,
    lessonContent: lesson.description,
    language: lesson.language,
  });
} else {
  // وضع المتصفح: استخدم Express API القديم
  const response = await fetch('/api/quick-tip', { ... });
}
```

---

## أمراض وحلول شائعة

### ❌ قاعدة البيانات لا تعمل في الإنتاج
**السبب:** الصلاحيات مفقودة في `capabilities/default.json`
**الحل:** أضف `"sql:allow-load"`, `"sql:allow-execute"`, `"sql:allow-select"`

### ❌ خطأ `link.exe` غير موجود
**السبب:** MSVC Build Tools غير مثبتة أو غير مضبوطة
**الحل:** شغّل السكربت `build-tauri.ps1` الذي يضبط متغيرات البيئة تلقائياً

### ❌ فشل تجميع Rust
**السبب:** نسخة Rust قديمة أو missing targets
**الحل:** 
```powershell
rustup update stable
rustup target add x86_64-pc-windows-msvc
```

### ❌ NSIS bundler فشل
**السبب:** `makensis` غير مثبت
**الحل:** استخدم `--bundles msi` أو غيّر `targets` في `tauri.conf.json` إلى `"msi"`

---

## سكربت البناء

### `build-tauri.ps1`

هذا السكربت يقوم بـ:

1. **ضبط متغيرات البيئة** لـ MSVC (Path, LIB, INCLUDE)
2. **تشغيل `npx tauri build`** الذي يقوم بـ:
   - بناء الواجهة (Vite) ← مجلد `dist/`
   - تجميع Rust backend ← `typomaster.exe`
   - إنشاء MSI Installer

```powershell
.\build-tauri.ps1
```

### الإعدادات الداخلية للسكربت

```powershell
$vcRoot = "C:\Program Files\Microsoft Visual Studio\2022\Enterprise"
$msvcVer = "14.33.31629"        # إصدار MSVC
$sdkVer = "10.0.19041.0"        # إصدار Windows SDK
```

> ⚠️ إذا كان مسار VS أو الإصدارات مختلفة على جهازك، عدّل هذه القيم.

### أوامر يدوية

```powershell
# بناء كامل (EXE + MSI)
npx tauri build --bundles msi

# بناء سريع (بدون Wix)
npx tauri build --bundles msi --no-bundle

# تشغيل وضع التطوير
npm run dev:tauri       # شغّل Vite على port 1420
npx tauri dev           # شغّل Tauri مع الاتصال بـ Vite
```

---

## مخرجات البناء

| المخرج | المسار |
|--------|--------|
| EXE | `src-tauri/target/release/typomaster.exe` |
| MSI | `src-tauri/target/release/bundle/msi/TypoMaster_1.0.0_x64_en-US.msi` |
| Frontend build | `dist/` |

**أحجام تقريبية:**
- EXE: ~15.8 MB
- MSI: ~5.6 MB

---

## تدفق البناء الكامل

```
npm run build (Vite)
     ↓
dist/  ←  ملفات HTML, CSS, JS ثابتة
     ↓
npx tauri build
     ↓
Rust Compiler (cargo build --release)
     ↓
typomaster.exe  ←  تطبيق سطح المكتب
     ↓
WiX Toolset (candle + light)
     ↓
TypoMaster_1.0.0_x64_en-US.msi  ←  مثبت ويندوز
```

### ما يحدث عند تشغيل التطبيق:

1. Tauri يفتح نافذة WebView
2. يحمّل `index.html` من `dist/`
3. React يتشغل ويستدعي `initDatabase()`
4. يتعرّف وجود `window.__TAURI__` ← يستخدم TauriDriver
5. `tauri-plugin-sql` يفتح `TypoMaster.db` من `AppData`
6. Rust Migrations تشغّل `CREATE TABLE IF NOT EXISTS ...`
7. التطبيق جاهز للاستخدام

---

## الملخص

تم تحويل TypoMaster من:

```
❌ Web App (React + Express + Node.js SEA)
   ├── sql.js في المتصفح (يفقد البيانات)
   ├── Express server خارجي (port 3000)
   └── مستعرض غير موثوق
```

إلى:

```
✅ Desktop App (Tauri v2 + Rust + SQLite)
   ├── قاعدة بيانات SQLite دائمة (AppData)
   ├── backend مضمّن (Rust)
   ├── WebView أصلي (高性能)
   └── مثبت Windows (MSI)
```

**المزايا:**
- قاعدة بيانات حقيقية (ليست localStorage)
- أداء أعلى (WebView أصلي)
- توزيع سهل (ملف MSI واحد)
- لا حاجة لـ Node.js على جهاز المستخدم
- واجهة عربية كاملة مع RTL
