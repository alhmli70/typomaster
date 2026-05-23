use rusqlite::{params, Connection};
use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tauri::{Manager, State};

struct DbState(Mutex<Connection>);

#[derive(Debug, Serialize, Deserialize, Clone)]
struct Exercise {
    id: String,
    title: String,
    content: String,
    language: String,
    level: String,
    collection: String,
    order: i64,
}

#[derive(Debug, Serialize, Deserialize)]
struct Session {
    exercise_id: Option<String>,
    wpm: f64,
    accuracy: f64,
    errors: i64,
    time_seconds: f64,
    total_chars: i64,
    language: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct TypingStats {
    avg_wpm: f64,
    avg_accuracy: f64,
    best_wpm: f64,
    best_accuracy: f64,
    total_sessions: i64,
    total_time_seconds: f64,
    total_chars_typed: i64,
}

#[derive(Debug, Serialize, Deserialize)]
struct RecentSession {
    wpm: f64,
    accuracy: f64,
    errors: i64,
    time_seconds: f64,
    total_chars: i64,
    language: String,
    created_at: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct WeeklyStat {
    day: String,
    avg_wpm: f64,
    avg_accuracy: f64,
    sessions: i64,
    total_time: f64,
}

#[derive(Debug, Serialize, Deserialize)]
struct GameScore {
    game_name: String,
    score: i64,
    language: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct BestGameScore {
    game: String,
    best_score: i64,
}

#[derive(Debug, Serialize, Deserialize)]
struct BestExerciseSession {
    exercise_id: String,
    wpm: f64,
    accuracy: f64,
}

#[derive(Debug, Serialize, Deserialize)]
struct Achievement {
    title: String,
    description: String,
    unlocked_at: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct SettingRow {
    key: String,
    value: String,
}

fn init_database(conn: &Connection) {
    conn.execute_batch(
        "
        CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS exercises (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            language TEXT NOT NULL DEFAULT 'en',
            level TEXT NOT NULL DEFAULT 'medium',
            collection TEXT NOT NULL DEFAULT '',
            \"order\" INTEGER NOT NULL DEFAULT 0
        );
        CREATE TABLE IF NOT EXISTS typing_sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            exercise_id TEXT,
            wpm REAL NOT NULL DEFAULT 0,
            accuracy REAL NOT NULL DEFAULT 0,
            errors INTEGER NOT NULL DEFAULT 0,
            time_seconds REAL NOT NULL DEFAULT 0,
            total_chars INTEGER NOT NULL DEFAULT 0,
            language TEXT NOT NULL DEFAULT 'en',
            created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
        );
        CREATE TABLE IF NOT EXISTS game_scores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            game_name TEXT NOT NULL,
            score INTEGER NOT NULL DEFAULT 0,
            language TEXT NOT NULL DEFAULT 'en',
            created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
        );
        CREATE TABLE IF NOT EXISTS achievements (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            unlocked_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
        );
        CREATE TABLE IF NOT EXISTS completed_exercises (
            exercise_id TEXT PRIMARY KEY
        );
        CREATE TABLE IF NOT EXISTS completed_lessons (
            lesson_id TEXT PRIMARY KEY
        );
        ",
    )
    .expect("Failed to initialize database tables");
}

#[tauri::command]
fn get_all_exercises(state: State<DbState>) -> Result<Vec<Exercise>, String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    let mut stmt = conn
        .prepare("SELECT id, title, content, language, level, collection, \"order\" FROM exercises ORDER BY \"order\"")
        .map_err(|e| e.to_string())?;
    let rows = stmt
        .query_map([], |row| {
            Ok(Exercise {
                id: row.get(0)?,
                title: row.get(1)?,
                content: row.get(2)?,
                language: row.get(3)?,
                level: row.get(4)?,
                collection: row.get(5)?,
                order: row.get(6)?,
            })
        })
        .map_err(|e| e.to_string())?;
    let mut exercises = Vec::new();
    for row in rows {
        exercises.push(row.map_err(|e| e.to_string())?);
    }
    Ok(exercises)
}

#[tauri::command]
fn add_exercise(state: State<DbState>, exercise: Exercise) -> Result<(), String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT OR REPLACE INTO exercises (id, title, content, language, level, collection, \"order\") VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
        params![exercise.id, exercise.title, exercise.content, exercise.language, exercise.level, exercise.collection, exercise.order],
    ).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn update_exercise_cmd(
    state: State<DbState>,
    id: String,
    exercise: Exercise,
) -> Result<(), String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    conn.execute(
        "UPDATE exercises SET title=?1, content=?2, language=?3, level=?4, collection=?5, \"order\"=?6 WHERE id=?7",
        params![exercise.title, exercise.content, exercise.language, exercise.level, exercise.collection, exercise.order, id],
    ).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn delete_exercise_cmd(state: State<DbState>, id: String) -> Result<(), String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    conn.execute("DELETE FROM exercises WHERE id=?1", params![id])
        .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn seed_exercises_batch(state: State<DbState>, exercises: Vec<Exercise>) -> Result<i64, String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    let mut count = 0i64;
    for ex in &exercises {
        conn.execute(
            "INSERT OR REPLACE INTO exercises (id, title, content, language, level, collection, \"order\") VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
            params![ex.id, ex.title, ex.content, ex.language, ex.level, ex.collection, ex.order],
        ).map_err(|e| e.to_string())?;
        count += 1;
    }
    Ok(count)
}

#[tauri::command]
fn is_exercise_completed(state: State<DbState>, id: String) -> Result<bool, String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    let count: i64 = conn
        .query_row(
            "SELECT COUNT(*) FROM completed_exercises WHERE exercise_id=?1",
            params![id],
            |row| row.get(0),
        )
        .map_err(|e| e.to_string())?;
    Ok(count > 0)
}

#[tauri::command]
fn mark_exercise_completed(state: State<DbState>, id: String) -> Result<(), String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT OR IGNORE INTO completed_exercises (exercise_id) VALUES (?1)",
        params![id],
    )
    .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn get_all_completed_exercises(state: State<DbState>) -> Result<Vec<String>, String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    let mut stmt = conn
        .prepare("SELECT exercise_id FROM completed_exercises")
        .map_err(|e| e.to_string())?;
    let rows = stmt
        .query_map([], |row| row.get::<_, String>(0))
        .map_err(|e| e.to_string())?;
    let mut ids = Vec::new();
    for row in rows {
        ids.push(row.map_err(|e| e.to_string())?);
    }
    Ok(ids)
}

#[tauri::command]
fn is_lesson_completed(state: State<DbState>, id: String) -> Result<bool, String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    let count: i64 = conn
        .query_row(
            "SELECT COUNT(*) FROM completed_lessons WHERE lesson_id=?1",
            params![id],
            |row| row.get(0),
        )
        .map_err(|e| e.to_string())?;
    Ok(count > 0)
}

#[tauri::command]
fn mark_lesson_completed(state: State<DbState>, id: String) -> Result<(), String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT OR IGNORE INTO completed_lessons (lesson_id) VALUES (?1)",
        params![id],
    )
    .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn get_all_completed_lessons(state: State<DbState>) -> Result<Vec<String>, String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    let mut stmt = conn
        .prepare("SELECT lesson_id FROM completed_lessons")
        .map_err(|e| e.to_string())?;
    let rows = stmt
        .query_map([], |row| row.get::<_, String>(0))
        .map_err(|e| e.to_string())?;
    let mut ids = Vec::new();
    for row in rows {
        ids.push(row.map_err(|e| e.to_string())?);
    }
    Ok(ids)
}

#[tauri::command]
fn get_setting(state: State<DbState>, key: String) -> Result<Option<String>, String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    let result = conn.query_row(
        "SELECT value FROM settings WHERE key=?1",
        params![key],
        |row| row.get(0),
    );
    match result {
        Ok(val) => Ok(Some(val)),
        Err(rusqlite::Error::QueryReturnedNoRows) => Ok(None),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
fn set_setting_cmd(state: State<DbState>, key: String, value: String) -> Result<(), String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT OR REPLACE INTO settings (key, value) VALUES (?1, ?2)",
        params![key, value],
    )
    .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn clear_all_settings(state: State<DbState>) -> Result<(), String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    conn.execute("DELETE FROM settings", [])
        .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn get_all_settings(state: State<DbState>) -> Result<Vec<SettingRow>, String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    let mut stmt = conn
        .prepare("SELECT key, value FROM settings")
        .map_err(|e| e.to_string())?;
    let rows = stmt
        .query_map([], |row| {
            Ok(SettingRow {
                key: row.get(0)?,
                value: row.get(1)?,
            })
        })
        .map_err(|e| e.to_string())?;
    let mut settings = Vec::new();
    for row in rows {
        settings.push(row.map_err(|e| e.to_string())?);
    }
    Ok(settings)
}

#[tauri::command]
fn save_settings(state: State<DbState>, settings: String) -> Result<(), String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT OR REPLACE INTO settings (key, value) VALUES ('app_settings', ?1)",
        params![settings],
    )
    .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn load_settings(state: State<DbState>) -> Result<String, String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    let result = conn.query_row(
        "SELECT value FROM settings WHERE key='app_settings'",
        [],
        |row| row.get(0),
    );
    match result {
        Ok(val) => Ok(val),
        Err(rusqlite::Error::QueryReturnedNoRows) => Ok("{}".to_string()),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
fn record_typing_session(state: State<DbState>, session: Session) -> Result<(), String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT INTO typing_sessions (exercise_id, wpm, accuracy, errors, time_seconds, total_chars, language) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
        params![session.exercise_id, session.wpm, session.accuracy, session.errors, session.time_seconds, session.total_chars, session.language],
    ).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn get_typing_stats(state: State<DbState>) -> Result<TypingStats, String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    let stats = conn
        .query_row(
            "SELECT
                COALESCE(AVG(wpm), 0),
                COALESCE(AVG(accuracy), 0),
                COALESCE(MAX(wpm), 0),
                COALESCE(MAX(accuracy), 0),
                COALESCE(COUNT(*), 0),
                COALESCE(SUM(time_seconds), 0),
                COALESCE(SUM(total_chars), 0)
            FROM typing_sessions",
            [],
            |row| {
                Ok(TypingStats {
                    avg_wpm: row.get(0)?,
                    avg_accuracy: row.get(1)?,
                    best_wpm: row.get(2)?,
                    best_accuracy: row.get(3)?,
                    total_sessions: row.get(4)?,
                    total_time_seconds: row.get(5)?,
                    total_chars_typed: row.get(6)?,
                })
            },
        )
        .map_err(|e| e.to_string())?;
    Ok(stats)
}

#[tauri::command]
fn get_recent_sessions(
    state: State<DbState>,
    limit: i64,
) -> Result<Vec<RecentSession>, String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    let mut stmt = conn
        .prepare(
            "SELECT wpm, accuracy, errors, time_seconds, total_chars, language, created_at
             FROM typing_sessions ORDER BY id DESC LIMIT ?1",
        )
        .map_err(|e| e.to_string())?;
    let rows = stmt
        .query_map(params![limit], |row| {
            Ok(RecentSession {
                wpm: row.get(0)?,
                accuracy: row.get(1)?,
                errors: row.get(2)?,
                time_seconds: row.get(3)?,
                total_chars: row.get(4)?,
                language: row.get(5)?,
                created_at: row.get(6)?,
            })
        })
        .map_err(|e| e.to_string())?;
    let mut sessions = Vec::new();
    for row in rows {
        sessions.push(row.map_err(|e| e.to_string())?);
    }
    Ok(sessions)
}

#[tauri::command]
fn get_weekly_stats_cmd(state: State<DbState>) -> Result<Vec<WeeklyStat>, String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    let mut stmt = conn
        .prepare(
            "SELECT
                strftime('%w', created_at) as day,
                COALESCE(AVG(wpm), 0),
                COALESCE(AVG(accuracy), 0),
                COUNT(*),
                COALESCE(SUM(time_seconds), 0)
             FROM typing_sessions
             WHERE created_at >= datetime('now', '-7 days', 'localtime')
             GROUP BY strftime('%w', created_at)
             ORDER BY day",
        )
        .map_err(|e| e.to_string())?;
    let rows = stmt
        .query_map([], |row| {
            Ok(WeeklyStat {
                day: row.get(0)?,
                avg_wpm: row.get(1)?,
                avg_accuracy: row.get(2)?,
                sessions: row.get(3)?,
                total_time: row.get(4)?,
            })
        })
        .map_err(|e| e.to_string())?;
    let mut stats = Vec::new();
    for row in rows {
        stats.push(row.map_err(|e| e.to_string())?);
    }
    Ok(stats)
}

#[tauri::command]
fn get_streak(state: State<DbState>) -> Result<i64, String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    let mut stmt = conn
        .prepare(
            "SELECT DISTINCT DATE(created_at) as day
             FROM typing_sessions
             ORDER BY day DESC",
        )
        .map_err(|e| e.to_string())?;
    let rows = stmt
        .query_map([], |row| row.get::<_, String>(0))
        .map_err(|e| e.to_string())?;
    let mut days: Vec<String> = Vec::new();
    for row in rows {
        days.push(row.map_err(|e| e.to_string())?);
    }
    if days.is_empty() {
        return Ok(0);
    }
    let today = chrono::Local::now().format("%Y-%m-%d").to_string();
    let yesterday = (chrono::Local::now() - chrono::Duration::days(1))
        .format("%Y-%m-%d")
        .to_string();
    if days[0] != today && days[0] != yesterday {
        return Ok(0);
    }
    let mut streak = 1i64;
    for i in 0..days.len() - 1 {
        let current = chrono::NaiveDate::parse_from_str(&days[i], "%Y-%m-%d").unwrap();
        let next = chrono::NaiveDate::parse_from_str(&days[i + 1], "%Y-%m-%d").unwrap();
        if (current - next).num_days() == 1 {
            streak += 1;
        } else {
            break;
        }
    }
    Ok(streak)
}

#[tauri::command]
fn save_game_score_cmd(state: State<DbState>, score: GameScore) -> Result<(), String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT INTO game_scores (game_name, score, language) VALUES (?1, ?2, ?3)",
        params![score.game_name, score.score, score.language],
    )
    .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn get_best_game_scores(state: State<DbState>) -> Result<Vec<BestGameScore>, String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    let mut stmt = conn
        .prepare(
            "SELECT game_name, MAX(score) as best_score
             FROM game_scores
             GROUP BY game_name
             ORDER BY game_name",
        )
        .map_err(|e| e.to_string())?;
    let rows = stmt
        .query_map([], |row| {
            Ok(BestGameScore {
                game: row.get(0)?,
                best_score: row.get(1)?,
            })
        })
        .map_err(|e| e.to_string())?;
    let mut scores = Vec::new();
    for row in rows {
        scores.push(row.map_err(|e| e.to_string())?);
    }
    Ok(scores)
}

#[tauri::command]
fn get_best_exercise_sessions(state: State<DbState>) -> Result<Vec<BestExerciseSession>, String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    let mut stmt = conn
        .prepare(
            "SELECT exercise_id, MAX(wpm) as best_wpm, accuracy
             FROM typing_sessions
             WHERE exercise_id IS NOT NULL
             GROUP BY exercise_id
             ORDER BY exercise_id",
        )
        .map_err(|e| e.to_string())?;
    let rows = stmt
        .query_map([], |row| {
            Ok(BestExerciseSession {
                exercise_id: row.get(0)?,
                wpm: row.get(1)?,
                accuracy: row.get(2)?,
            })
        })
        .map_err(|e| e.to_string())?;
    let mut sessions = Vec::new();
    for row in rows {
        sessions.push(row.map_err(|e| e.to_string())?);
    }
    Ok(sessions)
}

#[tauri::command]
fn get_total_xp_cmd(state: State<DbState>) -> Result<i64, String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    let total_xp: f64 = conn
        .query_row(
            "SELECT COALESCE(SUM(
                CAST(wpm * accuracy / 100 AS REAL) + (time_seconds / 10.0)
            ), 0) FROM typing_sessions",
            [],
            |row| row.get(0),
        )
        .map_err(|e| e.to_string())?;
    Ok(total_xp as i64)
}

#[tauri::command]
fn add_achievement_cmd(
    state: State<DbState>,
    title: String,
    description: String,
) -> Result<(), String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT INTO achievements (title, description) VALUES (?1, ?2)",
        params![title, description],
    )
    .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn get_achievements_cmd(state: State<DbState>) -> Result<Vec<Achievement>, String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    let mut stmt = conn
        .prepare(
            "SELECT title, description, unlocked_at
             FROM achievements
             ORDER BY id DESC",
        )
        .map_err(|e| e.to_string())?;
    let rows = stmt
        .query_map([], |row| {
            Ok(Achievement {
                title: row.get(0)?,
                description: row.get(1)?,
                unlocked_at: row.get(2)?,
            })
        })
        .map_err(|e| e.to_string())?;
    let mut achievements = Vec::new();
    for row in rows {
        achievements.push(row.map_err(|e| e.to_string())?);
    }
    Ok(achievements)
}

#[tauri::command]
fn reset_all_data_cmd(state: State<DbState>) -> Result<(), String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    conn.execute_batch(
        "
        DELETE FROM typing_sessions;
        DELETE FROM game_scores;
        DELETE FROM achievements;
        DELETE FROM completed_exercises;
        DELETE FROM completed_lessons;
        DELETE FROM settings;
        DELETE FROM exercises;
        ",
    )
    .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn get_ai_tip(
    _state: State<DbState>,
    lesson_title: String,
    lesson_content: String,
    _language: String,
) -> Result<String, String> {
    let content_lower = lesson_content.to_lowercase();
    let title_lower = lesson_title.to_lowercase();

    let tip = if content_lower.contains("home row")
        || content_lower.contains("asdf")
        || content_lower.contains("jkl;")
        || title_lower.contains("home")
    {
        "Keep your fingers on the home row keys (A S D F J K L ;). Your index fingers should rest on F and J — they have small bumps to help you find them without looking."
    } else if content_lower.contains("shift")
        || content_lower.contains("capital")
        || title_lower.contains("shift")
    {
        "Use the pinky finger of your opposite hand to hold Shift. For example, for 'A', use your right pinky on Shift and left pinky on A."
    } else if content_lower.contains("speed")
        || content_lower.contains("wpm")
        || title_lower.contains("speed")
    {
        "Focus on accuracy first, speed will follow naturally. Try to maintain 95%+ accuracy before pushing your speed higher."
    } else if content_lower.contains("number")
        || content_lower.contains("digit")
        || content_lower.contains("123")
    {
        "For number row keys, move your hand up from the home row. Each finger covers specific number keys — practice the motion until it becomes muscle memory."
    } else if content_lower.contains("symbol")
        || content_lower.contains("punctuation")
        || content_lower.contains(".,")
    {
        "Punctuation marks require stretching your fingers slightly further than letter keys. Practice slowly at first — accuracy is more important than speed."
    } else if content_lower.contains("touch")
        || content_lower.contains("type")
        || title_lower.contains("touch")
    {
        "Touch typing means using all fingers without looking at the keyboard. Trust your muscle memory — it develops faster than you think!"
    } else if content_lower.contains("arabic")
        || content_lower.contains("عربي")
        || content_lower.contains("arab")
    {
        "لتحسين سرعتك في الطباعة العربية، ركز على وضعية الأصابع على المفاتيح الرئيسية (منفح). استخدم إصبع السبابة للبحث عن الحروف دون النظر إلى لوحة المفاتيح."
    } else if content_lower.contains("finger")
        || content_lower.contains("hand")
        || content_lower.contains("position")
    {
        "Each finger has a designated column of keys. Your index fingers handle 2 columns each (F+G, H+J), while other fingers handle 1 column each."
    } else {
        "Practice regularly — even 10 minutes a day can significantly improve your typing speed and accuracy over time. Consistency is key!"
    };

    Ok(tip.to_string())
}

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            let app_dir = app
                .path()
                .app_data_dir()
                .expect("Failed to get app data directory");
            std::fs::create_dir_all(&app_dir).expect("Failed to create app data directory");
            let db_path = app_dir.join("TypoMaster.db");
            let conn =
                Connection::open(&db_path).expect("Failed to open database at app data directory");
            conn.execute_batch("PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON;")
                .expect("Failed to set pragmas");
            init_database(&conn);
            app.manage(DbState(Mutex::new(conn)));
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_all_exercises,
            add_exercise,
            update_exercise_cmd,
            delete_exercise_cmd,
            seed_exercises_batch,
            is_exercise_completed,
            mark_exercise_completed,
            get_all_completed_exercises,
            is_lesson_completed,
            mark_lesson_completed,
            get_all_completed_lessons,
            get_setting,
            set_setting_cmd,
            clear_all_settings,
            get_all_settings,
            save_settings,
            load_settings,
            record_typing_session,
            get_typing_stats,
            get_recent_sessions,
            get_weekly_stats_cmd,
            get_streak,
            save_game_score_cmd,
            get_best_game_scores,
            get_best_exercise_sessions,
            get_total_xp_cmd,
            add_achievement_cmd,
            get_achievements_cmd,
            reset_all_data_cmd,
            get_ai_tip,
        ])
        .run(tauri::generate_context!())
        .expect("Error while running TypoMaster");
}
