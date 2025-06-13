import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { User } from '../models/User';
import { refreshAccessToken } from './googleAuth';

const calendar = google.calendar('v3');

export const createCalendarEvent = async (userId: string, eventDetails: any) => {
  const user = await User.findById(userId);
  if (!user?.googleCalendarToken?.accessToken) {
    throw new Error('No Google Calendar access token found');
  }

  const oauth2Client = new OAuth2Client();
  oauth2Client.setCredentials({
    access_token: user.googleCalendarToken.accessToken,
    refresh_token: user.googleCalendarToken.refreshToken
  });

  try {
    const response = await calendar.events.insert({
      auth: oauth2Client,
      calendarId: 'primary',
      requestBody: eventDetails
    });

    return response.data;
  } catch (error: any) {
    if (error?.code === 401) {
      // Token expired, refresh and retry
      const newTokens = await refreshAccessToken(user.googleCalendarToken.refreshToken);
      user.googleCalendarToken = {
        accessToken: newTokens.access_token!,
        refreshToken: newTokens.refresh_token!,
        expiryDate: new Date(newTokens.expiry_date!)
      };
      await user.save();

      // Retry with new token
      oauth2Client.setCredentials({
        access_token: newTokens.access_token,
        refresh_token: newTokens.refresh_token
      });

      const response = await calendar.events.insert({
        auth: oauth2Client,
        calendarId: 'primary',
        requestBody: eventDetails
      });

      return response.data;
    }
    throw error;
  }
};

export const getCalendarEvents = async (userId: string, timeMin: Date, timeMax: Date) => {
  const user = await User.findById(userId);
  if (!user?.googleCalendarToken?.accessToken) {
    throw new Error('No Google Calendar access token found');
  }

  const oauth2Client = new OAuth2Client();
  oauth2Client.setCredentials({
    access_token: user.googleCalendarToken.accessToken,
    refresh_token: user.googleCalendarToken.refreshToken
  });

  try {
    const response = await calendar.events.list({
      auth: oauth2Client,
      calendarId: 'primary',
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
      orderBy: 'startTime'
    });

    return response.data.items;
  } catch (error: any) {
    if (error?.code === 401) {
      // Token expired, refresh and retry
      const newTokens = await refreshAccessToken(user.googleCalendarToken.refreshToken);
      user.googleCalendarToken = {
        accessToken: newTokens.access_token!,
        refreshToken: newTokens.refresh_token!,
        expiryDate: new Date(newTokens.expiry_date!)
      };
      await user.save();

      // Retry with new token
      oauth2Client.setCredentials({
        access_token: newTokens.access_token,
        refresh_token: newTokens.refresh_token
      });

      const response = await calendar.events.list({
        auth: oauth2Client,
        calendarId: 'primary',
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        singleEvents: true,
        orderBy: 'startTime'
      });

      return response.data.items;
    }
    throw error;
  }
};

export const updateCalendarEvent = async (userId: string, eventId: string, eventDetails: any) => {
  const user = await User.findById(userId);
  if (!user?.googleCalendarToken?.accessToken) {
    throw new Error('No Google Calendar access token found');
  }

  const oauth2Client = new OAuth2Client();
  oauth2Client.setCredentials({
    access_token: user.googleCalendarToken.accessToken,
    refresh_token: user.googleCalendarToken.refreshToken
  });

  try {
    const response = await calendar.events.update({
      auth: oauth2Client,
      calendarId: 'primary',
      eventId,
      requestBody: eventDetails
    });

    return response.data;
  } catch (error: any) {
    if (error?.code === 401) {
      // Token expired, refresh and retry
      const newTokens = await refreshAccessToken(user.googleCalendarToken.refreshToken);
      user.googleCalendarToken = {
        accessToken: newTokens.access_token!,
        refreshToken: newTokens.refresh_token!,
        expiryDate: new Date(newTokens.expiry_date!)
      };
      await user.save();

      // Retry with new token
      oauth2Client.setCredentials({
        access_token: newTokens.access_token,
        refresh_token: newTokens.refresh_token
      });

      const response = await calendar.events.update({
        auth: oauth2Client,
        calendarId: 'primary',
        eventId,
        requestBody: eventDetails
      });

      return response.data;
    }
    throw error;
  }
};

export const deleteCalendarEvent = async (userId: string, eventId: string) => {
  const user = await User.findById(userId);
  if (!user?.googleCalendarToken?.accessToken) {
    throw new Error('No Google Calendar access token found');
  }

  const oauth2Client = new OAuth2Client();
  oauth2Client.setCredentials({
    access_token: user.googleCalendarToken.accessToken,
    refresh_token: user.googleCalendarToken.refreshToken
  });

  try {
    await calendar.events.delete({
      auth: oauth2Client,
      calendarId: 'primary',
      eventId
    });
  } catch (error: any) {
    if (error?.code === 401) {
      // Token expired, refresh and retry
      const newTokens = await refreshAccessToken(user.googleCalendarToken.refreshToken);
      user.googleCalendarToken = {
        accessToken: newTokens.access_token!,
        refreshToken: newTokens.refresh_token!,
        expiryDate: new Date(newTokens.expiry_date!)
      };
      await user.save();

      // Retry with new token
      oauth2Client.setCredentials({
        access_token: newTokens.access_token,
        refresh_token: newTokens.refresh_token
      });

      await calendar.events.delete({
        auth: oauth2Client,
        calendarId: 'primary',
        eventId
      });
    } else {
      throw error;
    }
  }
}; 