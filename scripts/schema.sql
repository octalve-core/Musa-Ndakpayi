-- Dedicated Musa Ndakpayi campaign Neon project. Execute only on its own database.
CREATE TABLE IF NOT EXISTS campaign_members (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  reference UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  full_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  phone_hash CHAR(64) NOT NULL,
  ward_code CHAR(2) NOT NULL,
  ward_name TEXT NOT NULL,
  pu_code VARCHAR(12) NOT NULL,
  pu_name TEXT NOT NULL,
  registration_method VARCHAR(12) NOT NULL CHECK(registration_method IN ('Self','Assisted')),
  assisted_by VARCHAR(100),
  membership_status VARCHAR(12) NOT NULL DEFAULT 'MEMBER' CHECK(membership_status='MEMBER'),
  communication_consent BOOLEAN NOT NULL DEFAULT FALSE,
  consent_version VARCHAR(32) NOT NULL,
  consent_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  fingerprint CHAR(64) NOT NULL,
  possible_duplicate BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS campaign_members_created_idx ON campaign_members(created_at DESC);
CREATE INDEX IF NOT EXISTS campaign_members_location_idx ON campaign_members(ward_code,pu_code);
CREATE INDEX IF NOT EXISTS campaign_members_fingerprint_idx ON campaign_members(fingerprint,created_at DESC);

CREATE TABLE IF NOT EXISTS campaign_rate_limits (
  kind VARCHAR(15) NOT NULL,
  visitor_hash CHAR(64) NOT NULL,
  window_start TIMESTAMPTZ NOT NULL,
  attempts INTEGER NOT NULL CHECK(attempts>0),
  PRIMARY KEY(kind,visitor_hash,window_start)
);
CREATE INDEX IF NOT EXISTS campaign_rate_limits_expiry_idx ON campaign_rate_limits(window_start);
CREATE TABLE IF NOT EXISTS campaign_admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(40) NOT NULL UNIQUE CHECK(username=lower(username)),
  password_hash TEXT NOT NULL,
  must_change_password BOOLEAN NOT NULL DEFAULT TRUE,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_login_at TIMESTAMPTZ
);
CREATE TABLE IF NOT EXISTS campaign_sessions (
  token_hash CHAR(64) PRIMARY KEY,
  admin_id UUID NOT NULL REFERENCES campaign_admins(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX IF NOT EXISTS campaign_sessions_expiry_idx ON campaign_sessions(expires_at);
CREATE TABLE IF NOT EXISTS campaign_admin_audit (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  actor_username VARCHAR(40) NOT NULL,
  action VARCHAR(64) NOT NULL,
  member_reference UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS campaign_admin_audit_created_idx ON campaign_admin_audit(created_at DESC);
