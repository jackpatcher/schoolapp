# Database Schema Draft

## Tables

### roles
- id: serial PK
- name: string (student, teacher, parent, admin, executive)
- label: string
- description: string

### users
- id: uuid PK
- username: string UNIQUE
- password_hash: string
- name: string
- email: string
- role_id: fk -> roles.id
- created_at: timestamp
- updated_at: timestamp

### apps
- id: serial PK
- slug: string UNIQUE
- name: string
- description: string
- category: string
- icon_name: string
- created_at: timestamp
- updated_at: timestamp

### app_modes
- id: serial PK
- app_id: fk -> apps.id
- mode: string (`student`, `teacher`, `parent`, `admin`, `executive`)
- title: string
- description: string
- enabled: boolean

### app_mode_access
- id: serial PK
- role_id: fk -> roles.id
- app_mode_id: fk -> app_modes.id
- can_access: boolean

### user_app_settings
- id: serial PK
- user_id: fk -> users.id
- app_id: fk -> apps.id
- settings: jsonb
- updated_at: timestamp

## Notes
- `roles` กำหนดเป็น enum ส่วนกลาง
- `users.role_id` สำหรับบทบาทหลักของผู้ใช้
- `app_modes` เก็บโหมดแต่ละแอปตาม role หรือ variant ของแอป
- `app_mode_access` เก็บว่าบทบาทไหนเข้าถึงโหมดไหนได้
- `user_app_settings` เก็บค่าตั้งค่าเฉพาะผู้ใช้สำหรับแอปนั้น ๆ

## Example role access
- student -> only `app_modes.mode = 'student'`
- teacher -> `student`, `teacher`
- parent -> `student`, `parent`
- admin -> all modes
- executive -> only `executive`

## Extension ideas
- `sessions` หรือ `auth_tokens` table ถ้าต้องเก็บ login state
- `app_pages` ถ้าต้องการเก็บเนื้อหา UI แบบ dynamic จาก DB
- `app_feature_flags` ถ้าจะเปิด/ปิดฟีเจอร์แต่ละ role
