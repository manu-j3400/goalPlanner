import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { User } from '../models/User';

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CALLBACK_URL
);

export const getAuthUrl = () => {
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/calendar'
  ];

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent'
  });
};

export const getTokens = async (code: string) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
};

export const getUserInfo = async (accessToken: string) => {
  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: 'v2'
  });

  const { data } = await oauth2.userinfo.get();
  return data;
};

export const findOrCreateUser = async (userInfo: any) => {
  let user = await User.findOne({ email: userInfo.email });

  if (!user) {
    user = await User.create({
      email: userInfo.email,
      name: userInfo.name,
      googleId: userInfo.id,
      profilePicture: userInfo.picture
    });
  } else if (!user.googleId) {
    user.googleId = userInfo.id;
    user.profilePicture = userInfo.picture;
    await user.save();
  }

  return user;
};

export const refreshAccessToken = async (refreshToken: string) => {
  oauth2Client.setCredentials({
    refresh_token: refreshToken
  });

  const { credentials } = await oauth2Client.refreshAccessToken();
  return credentials;
}; 