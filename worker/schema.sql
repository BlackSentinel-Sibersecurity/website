CREATE TABLE IF NOT EXISTS contact_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  product TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  role TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'contacted', 'closed', 'spam')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_product ON contact_submissions(product);

CREATE TRIGGER IF NOT EXISTS update_contact_timestamp
  AFTER UPDATE ON contact_submissions
  FOR EACH ROW
  BEGIN
    UPDATE contact_submissions SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
  END;
