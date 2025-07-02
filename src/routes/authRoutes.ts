import express from 'express';
import { getAuthUrl, getTokens, getUserInfo, findOrCreateUser } from '../services/googleAuth';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Get Google OAuth URL
router.get('/google/url', (req, res) => {
  const url = getAuthUrl();
  res.json({ url });
});

// Google OAuth callback
router.get('/google/callback', async (req, res) => {
  try {
    const { code } = req.query;
    if (!code || typeof code !== 'string') {
      throw new Error('No code provided');
    }

    // Get tokens from Google
    const tokens = await getTokens(code);

    // Get user info from Google
    const userInfo = await getUserInfo(tokens.access_token!);

    // Find or create user in our database
    const user = await findOrCreateUser(userInfo);

    // Update user's Google Calendar token
    user.googleCalendarToken = {
      accessToken: tokens.access_token!,
      refreshToken: tokens.refresh_token!,
      expiryDate: new Date(tokens.expiry_date!)
    };
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/auth/error`);
  }
});

export default router; 