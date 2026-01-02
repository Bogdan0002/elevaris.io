-- Create client_previews table for preview system
CREATE TABLE IF NOT EXISTS client_previews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  niche TEXT NOT NULL DEFAULT 'cleaning',
  status TEXT NOT NULL DEFAULT 'preview',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  config JSONB NOT NULL
);

-- Create index on slug for fast lookups
CREATE INDEX IF NOT EXISTS idx_client_previews_slug ON client_previews(slug);

-- Create index on niche for filtering
CREATE INDEX IF NOT EXISTS idx_client_previews_niche ON client_previews(niche);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_client_previews_status ON client_previews(status);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_client_previews_updated_at
  BEFORE UPDATE ON client_previews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

