-- Create database schema for SocialSync Pro

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    plan VARCHAR(50) DEFAULT 'starter',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Social media platforms table
CREATE TABLE IF NOT EXISTS platforms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    api_endpoint VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User connected accounts
CREATE TABLE IF NOT EXISTS user_accounts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    platform_id INTEGER REFERENCES platforms(id) ON DELETE CASCADE,
    account_name VARCHAR(255),
    access_token TEXT,
    refresh_token TEXT,
    followers_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    connected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, platform_id)
);

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    media_urls TEXT[],
    status VARCHAR(50) DEFAULT 'draft', -- draft, scheduled, published, failed
    scheduled_for TIMESTAMP,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Post platforms (many-to-many relationship)
CREATE TABLE IF NOT EXISTS post_platforms (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    platform_id INTEGER REFERENCES platforms(id) ON DELETE CASCADE,
    platform_post_id VARCHAR(255), -- ID from the social platform
    status VARCHAR(50) DEFAULT 'pending', -- pending, published, failed
    error_message TEXT,
    published_at TIMESTAMP,
    UNIQUE(post_id, platform_id)
);

-- Analytics table
CREATE TABLE IF NOT EXISTS analytics (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    platform_id INTEGER REFERENCES platforms(id) ON DELETE CASCADE,
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    engagement_rate DECIMAL(5,2) DEFAULT 0,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(post_id, platform_id, DATE(recorded_at))
);

-- Insert default platforms
INSERT INTO platforms (name, api_endpoint) VALUES
('Twitter/X', 'https://api.twitter.com/2/'),
('Facebook', 'https://graph.facebook.com/'),
('Instagram', 'https://graph.instagram.com/'),
('LinkedIn', 'https://api.linkedin.com/v2/'),
('TikTok', 'https://open-api.tiktok.com/'),
('YouTube', 'https://www.googleapis.com/youtube/v3/')
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_scheduled_for ON posts(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_user_accounts_user_id ON user_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_post_id ON analytics(post_id);
CREATE INDEX IF NOT EXISTS idx_analytics_recorded_at ON analytics(recorded_at);
