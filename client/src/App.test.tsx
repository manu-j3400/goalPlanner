import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

// Mock fetch globally
beforeAll(() => {
  global.fetch = jest.fn((url, options) => {
    if (url === "/api/users/register" || url === "/api/users/login") {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            user: { name: "Test User", email: "test@example.com" },
            token: "fake-token",
          }),
      });
    }
    if (url === "/api/users/profile") {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({ name: "Test User", email: "test@example.com" }),
      });
    }
    if (url === "/api/goals") {
      if (options && options.method === "POST") {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ _id: "1", title: "Test Goal" }),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ _id: "1", title: "Test Goal" }]),
      });
    }
    if (url === "/api/goals/1" && options && options.method === "DELETE") {
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    }
    if (url === "/api/users/preferences") {
      if (options && options.method === "POST") {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
      }
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            workTimePerDay: 8,
            sleepTime: 8,
            bedTime: "22:00",
            wakeUpTime: "06:00",
            mealTimes: ["08:00", "13:00", "19:00"],
            numberOfMeals: 3,
            preferredTimeOfDay: "both",
          }),
      });
    }
    if (url === "/api/calendar/events") {
      if (options && options.method === "POST") {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              id: "1",
              summary: "Test Event",
              start: { dateTime: new Date().toISOString() },
              end: { dateTime: new Date().toISOString() },
            }),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              id: "1",
              summary: "Test Event",
              start: { dateTime: new Date().toISOString() },
              end: { dateTime: new Date().toISOString() },
            },
          ]),
      });
    }
    if (
      url === "/api/calendar/events/1" &&
      options &&
      options.method === "DELETE"
    ) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    }
    if (url === "/api/auth/google/url") {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({ url: "https://accounts.google.com/o/oauth2/auth" }),
      });
    }
    return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
  }) as jest.Mock;
});

afterAll(() => {
  jest.resetAllMocks();
});

test("renders authentication modal and allows login", async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/login \/ register/i));
  expect(screen.getByText(/login/i)).toBeInTheDocument();
  fireEvent.change(screen.getByPlaceholderText(/email/i), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: "password" },
  });
  fireEvent.click(screen.getByText(/^login$/i));
  await waitFor(() =>
    expect(screen.queryByText(/login \/ register/i)).not.toBeInTheDocument()
  );
});

test("renders Google OAuth button", () => {
  render(<App />);
  expect(screen.getByText(/sign in with google/i)).toBeInTheDocument();
});

test("goal CRUD: add and delete goal", async () => {
  window.localStorage.setItem("token", "fake-token");
  render(<App />);
  fireEvent.click(screen.getByText(/goal maker/i));
  await waitFor(() =>
    expect(
      screen.getByPlaceholderText(/type your goal here/i)
    ).toBeInTheDocument()
  );
  fireEvent.change(screen.getByPlaceholderText(/type your goal here/i), {
    target: { value: "Test Goal" },
  });
  fireEvent.click(screen.getByText(/add goal/i));
  await waitFor(() =>
    expect(screen.getByText("Test Goal")).toBeInTheDocument()
  );
  fireEvent.click(screen.getByText("×"));
  await waitFor(() =>
    expect(screen.queryByText("Test Goal")).not.toBeInTheDocument()
  );
});

test("preferences: save and load", async () => {
  window.localStorage.setItem("token", "fake-token");
  render(<App />);
  fireEvent.click(screen.getByText(/set preferences/i));
  await waitFor(() =>
    expect(screen.getByText(/save preferences/i)).toBeInTheDocument()
  );
  fireEvent.click(screen.getByText(/save preferences/i));
  await waitFor(() =>
    expect(screen.getByText(/preferences saved/i)).toBeInTheDocument()
  );
});

test("calendar: add and delete event", async () => {
  window.localStorage.setItem("token", "fake-token");
  render(<App />);
  fireEvent.click(screen.getByText(/calendar/i));
  await waitFor(() =>
    expect(screen.getByPlaceholderText(/event title/i)).toBeInTheDocument()
  );
  fireEvent.change(screen.getByPlaceholderText(/event title/i), {
    target: { value: "Test Event" },
  });
  fireEvent.change(screen.getAllByPlaceholderText(/event title/i)[1], {
    target: { value: new Date().toISOString().slice(0, 16) },
  });
  fireEvent.change(screen.getAllByPlaceholderText(/event title/i)[2], {
    target: { value: new Date().toISOString().slice(0, 16) },
  });
  fireEvent.click(screen.getByText(/add event/i));
  await waitFor(() =>
    expect(screen.getByText("Test Event")).toBeInTheDocument()
  );
  fireEvent.click(screen.getByText("×"));
  await waitFor(() =>
    expect(screen.queryByText("Test Event")).not.toBeInTheDocument()
  );
});
