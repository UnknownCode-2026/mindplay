# MindPlay V1.9

Admin Control Center

## V1.9
- Supabase-backed Website Settings
- Feature Flags
- Announcement Manager
- Game enable/disable, maintenance, ordering and descriptions
- Admin Dashboard using V1.8 analytics
- Audit Log for admin changes
- /admin responsive on mobile/tablet/desktop
- Admin authentication uses Supabase Auth token + app_metadata.role=admin
- Public site config is fetched from the existing mindplay-api Edge Function
- package version 1.9.0

## Security
- no service role or secret in browser
- admin writes validated again inside Edge Function
- RLS remains enabled on all exposed tables
- admin-only actions verify Supabase Auth token and require app_metadata.role=admin
