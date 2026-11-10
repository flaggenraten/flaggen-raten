/**
 * Supabase-Zugangsdaten für Flaggen-Raten.de
 *
 * Wo finde ich die? Supabase-Dashboard -> dein Projekt -> Project Settings -> API
 *  - url:     "Project URL", z. B. https://abcdefgh.supabase.co
 *  - anonKey: der "anon public" Key (bzw. "Publishable key", beginnt mit sb_publishable_)
 *
 * Dieser Key darf öffentlich auf der Website stehen. Er ist durch die
 * Sicherheitsregeln aus supabase-setup.sql geschützt.
 * NIEMALS den "service_role" bzw. "Secret key" hier eintragen!
 */
window.SUPABASE_CONFIG = {
    url: 'https://jvxmhtieovbkhpbtnltk.supabase.co',
    anonKey: 'sb_publishable_R1aHHnmjgse0Prdn_1C9gQ_aNffZ-0i'
};
