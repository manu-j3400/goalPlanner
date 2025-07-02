import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGoogleOAuthUrl } from "../services/googleOAuth";

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const { url } = await getGoogleOAuthUrl();
      window.location.href = url;
    } catch {
      setError("Failed to initiate Google OAuth");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-glass-bg">
      <section
        className="motion-hero"
        style={{
          background: "none",
          boxShadow: "none",
          borderRadius: 0,
          overflow: "visible",
        }}
      >
        <div
          className="motion-hero-content"
          style={{
            background: "none",
            boxShadow: "none",
            borderRadius: 0,
            padding: 0,
            textAlign: "center",
          }}
        >
          <h1 className="motion-hero-title">
            Tired of doing things the old fashioned way? That's why we built
            <br />
            <span className="motion-gradient-highlight-text">Goal Planner</span>
          </h1>
          <div className="motion-hero-subtitle">
            <span className="motion-hero-bold">
              Your Trusty Goal Making Assistant.
            </span>{" "}
            AI Tasks, AI Calendar, smart scheduling, time management, and more.
          </div>
          <div className="motion-hero-btn-group">
            <Link to="/goals" className="motion-hero-cta">
              Try Goal Planner for free
            </Link>
            {!isLoggedIn && (
              <button
                className="motion-hero-cta google-oauth-btn"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                <svg
                  style={{ verticalAlign: "middle", marginRight: 8 }}
                  width="22"
                  height="22"
                  viewBox="0 0 48 48"
                >
                  <g>
                    <path
                      fill="#4285F4"
                      d="M43.6 20.5h-1.9V20H24v8h11.3c-1.1 3-4.1 5.5-7.3 5.5-4.4 0-8-3.6-8-8s3.6-8 8-8c2 0 3.8.7 5.2 1.9l6.1-6.1C36.9 10.1 30.8 8 24 8 13.5 8 5 16.5 5 27s8.5 19 19 19c9.5 0 17.5-6.8 18.7-15.5.2-1.3.3-2.6.3-4 0-1.3-.1-2.7-.3-4z"
                    />
                    <path
                      fill="#34A853"
                      d="M6.3 14.7l7 5.1C15.1 16.1 19.2 13 24 13c2.7 0 5.2.9 7.2 2.4l6.4-6.4C33.5 5.1 28.1 3 22 3c-7.2 0-13.2 4.1-16.2 10.1z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M24 43c5.8 0 10.7-1.9 14.3-5.1l-6.6-5.4C29.7 34.5 27 35.5 24 35.5c-6.1 0-11.2-4.1-13-9.6l-7 5.4C6.8 39.1 14.7 43 24 43z"
                    />
                    <path
                      fill="#EA4335"
                      d="M43.5 24.5c0-1.3-.1-2.7-.3-4H24v8.5h11.7c-.5 2.6-2.1 4.8-4.4 6.3l6.6 5.4C41.9 37.1 43.5 31.3 43.5 24.5z"
                    />
                  </g>
                </svg>
                {loading ? "Redirecting..." : "Sign in with Google"}
              </button>
            )}
          </div>
        </div>
      </section>
      <div className="home-features-row">
        <div className="home-feature-card">
          <div className="home-feature-icon">🎯</div>
          <div className="home-feature-title">Set Your Goals</div>
          <div className="home-feature-desc">
            Break down big dreams into actionable steps. Stay focused and
            motivated with clear targets.
          </div>
        </div>
        <div className="home-feature-card">
          <div className="home-feature-icon">🗓️</div>
          <div className="home-feature-title">Customize Your Schedule</div>
          <div className="home-feature-desc">
            Plan your day around your life. Smart scheduling adapts to your
            preferences and routines.
          </div>
        </div>
        <div className="home-feature-card">
          <div className="home-feature-icon">📈</div>
          <div className="home-feature-title">Track Your Progress</div>
          <div className="home-feature-desc">
            Visualize your journey. Celebrate wins and keep your momentum going!
          </div>
        </div>
      </div>

      {/* AI-Powered Features Section */}
      <section className="ai-features-section">
        <h2 className="ai-features-title">
          AI-Powered Features to Supercharge Your Productivity
        </h2>
        <div className="ai-features-rows">
          <div className="ai-features-row">
            {/* AI Task Planner Card */}
            <FeatureCard
              icon="🤖"
              title="AI Task Planner"
              desc="Automatically prioritize and schedule your most important tasks."
              exampleVisual={
                <div className="ai-demo-task-chip-v2">
                  <div className="ai-demo-task-title-v2">
                    Finish project report
                  </div>
                  <div className="ai-demo-task-row-bottom">
                    <span className="ai-demo-task-priority-v2 high">High</span>
                    <span className="ai-demo-task-time-v2">Tomorrow, 10am</span>
                  </div>
                </div>
              }
              expandedDemo={
                <div className="ai-demo-task-list-v2">
                  <div className="ai-demo-task-row-v2">
                    <div className="ai-demo-task-title-v2">
                      Finish project report
                    </div>
                    <div className="ai-demo-task-row-bottom">
                      <span className="ai-demo-task-priority-v2 high">
                        High
                      </span>
                      <span className="ai-demo-task-time-v2">
                        Tomorrow, 10am
                      </span>
                    </div>
                  </div>
                  <div className="ai-demo-task-row-v2">
                    <div className="ai-demo-task-title-v2">
                      Team sync meeting
                    </div>
                    <div className="ai-demo-task-row-bottom">
                      <span className="ai-demo-task-priority-v2 medium">
                        Medium
                      </span>
                      <span className="ai-demo-task-time-v2">
                        Tomorrow, 2pm
                      </span>
                    </div>
                  </div>
                  <div className="ai-demo-task-row-v2">
                    <div className="ai-demo-task-title-v2">Review goals</div>
                    <div className="ai-demo-task-row-bottom">
                      <span className="ai-demo-task-priority-v2 low">Low</span>
                      <span className="ai-demo-task-time-v2">Friday, 4pm</span>
                    </div>
                  </div>
                </div>
              }
            />
            {/* Smart Calendar Integration Card */}
            <FeatureCard
              icon="📅"
              title="Smart Calendar Integration"
              desc="Syncs with your calendar and finds the best time for every goal."
              exampleVisual={
                <div className="ai-demo-calendar-mini">
                  <div className="ai-demo-calendar-day">Mon</div>
                  <div className="ai-demo-calendar-day ai-demo-calendar-highlight">
                    Tue
                  </div>
                  <div className="ai-demo-calendar-day">Wed</div>
                  <div className="ai-demo-calendar-day">Thu</div>
                  <div className="ai-demo-calendar-day">Fri</div>
                </div>
              }
              expandedDemo={
                <div className="ai-demo-calendar-expanded-v2">
                  <div className="ai-demo-calendar-grid-v2">
                    <div>9am</div>
                    <div></div>
                    <div>10am</div>
                    <div></div>
                    <div>11am</div>
                    <div></div>
                    <div>12pm</div>
                    <div></div>
                    <div>1pm</div>
                    <div></div>
                    <div>2pm</div>
                    <div className="ai-demo-calendar-block-v2">
                      <div className="ai-demo-calendar-event-title-v2">
                        Goal: Write blog post
                      </div>
                      <div className="ai-demo-calendar-event-time-v2">
                        2:00pm - 3:00pm
                      </div>
                    </div>
                    <div>3pm</div>
                    <div></div>
                  </div>
                </div>
              }
            />
          </div>
          <div className="ai-features-row">
            {/* Progress Insights Card */}
            <FeatureCard
              icon={<span style={{ fontSize: "2.2rem" }}>📊</span>}
              title="Progress Insights"
              desc="Visualize your achievements and get AI-powered suggestions."
              exampleVisual={
                <div className="ai-demo-progress-bar-v2">
                  <div className="ai-demo-progress-label-v2">70% Complete</div>
                  <div className="ai-demo-progress-fill-bg-v2">
                    <div
                      className="ai-demo-progress-fill-v2"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                </div>
              }
              expandedDemo={
                <div className="ai-demo-progress-expanded-v2">
                  <div className="ai-demo-progress-bar-v2">
                    <div className="ai-demo-progress-label-v2">
                      90% Complete
                    </div>
                    <div className="ai-demo-progress-fill-bg-v2">
                      <div
                        className="ai-demo-progress-fill-v2"
                        style={{ width: "90%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="ai-demo-progress-streak-v2">
                    🔥 <b>5-day streak!</b>
                  </div>
                  <div className="ai-demo-progress-tip-v2">
                    AI Tip: Keep up the momentum by scheduling a review session.
                  </div>
                </div>
              }
            />
            {/* Seamless Integrations Card */}
            <FeatureCard
              icon={<span style={{ fontSize: "2.2rem" }}>🔗</span>}
              title="Seamless Integrations"
              desc="Connect with Google, Outlook, Slack, and more."
              exampleVisual={
                <div className="ai-demo-integrations-v2">
                  <span className="ai-demo-integration-badge-v2 google">G</span>
                  <span className="ai-demo-integration-badge-v2 outlook">
                    O
                  </span>
                  <span className="ai-demo-integration-badge-v2 slack">S</span>
                </div>
              }
              expandedDemo={
                <div className="ai-demo-integrations-expanded-v2">
                  <div className="ai-demo-integration-row-v2">
                    <span className="ai-demo-integration-badge-v2 google">
                      Google Connected
                    </span>
                  </div>
                  <div className="ai-demo-integration-row-v2">
                    <span className="ai-demo-integration-badge-v2 outlook">
                      Outlook Connected
                    </span>
                  </div>
                  <div className="ai-demo-integration-row-v2">
                    <span className="ai-demo-integration-badge-v2 slack">
                      Slack Connected
                    </span>
                  </div>
                  <div className="ai-demo-integration-status-v2">
                    All integrations are active!
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </section>
      <div className="home-cta-glass">
        <h2 className="home-cta-title">Ready to Start Your Journey?</h2>
        <p className="home-cta-desc">
          Set your preferences and create your first goal today.
        </p>
        <div className="home-cta-buttons">
          <Link to="/preferences" className="cta-button home-cta-btn">
            <span role="img" aria-label="settings">
              ⚙️
            </span>{" "}
            Set Preferences
          </Link>
          <Link to="/goals" className="cta-button home-cta-btn">
            <span role="img" aria-label="target">
              🎯
            </span>{" "}
            Create Goals
          </Link>
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Montserrat:wght@900&display=swap');
        body, .home-glass-bg, .app {
          background: #f7fafd !important;
        }
        .motion-hero {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          margin: 3rem auto 2.5rem auto;
          max-width: 1100px;
          position: relative;
        }
        .motion-hero-content {
          flex: 1;
          z-index: 2;
          text-align: center;
        }
        .motion-hero-title {
          font-family: 'Montserrat', 'Inter', Arial, sans-serif;
          font-size: 3.2rem;
          font-weight: 900;
          color: #181c25;
          margin-bottom: 0.5rem;
          line-height: 1.08;
        }
        .motion-gradient-highlight-text {
          background: linear-gradient(90deg, #1de9b6 0%, #2979ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          display: inline;
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
        }
        .motion-hero-subtitle {
          font-family: 'Inter', Arial, sans-serif;
          font-size: 1.15rem;
          color: #3a506b;
          margin-bottom: 2.2rem;
        }
        .motion-hero-bold {
          font-weight: 700;
          color: #181c25;
        }
        .motion-hero-cta {
          display: inline-block;
          background: linear-gradient(90deg, #1de9b6 0%, #2979ff 100%);
          color: #fff;
          font-weight: 700;
          font-size: 1.15rem;
          padding: 1rem 2.5rem;
          border-radius: 999px;
          box-shadow: 0 4px 16px rgba(31,38,135,0.10);
          text-decoration: none;
          transition: background 0.2s, color 0.2s, box-shadow 0.2s;
          font-family: 'Inter', Arial, sans-serif;
        }
        .motion-hero-cta:hover {
          background: linear-gradient(90deg, #2979ff 0%, #1de9b6 100%);
          color: #fff;
          box-shadow: 0 8px 32px rgba(31,38,135,0.18);
        }
        .motion-trust-badges {
          margin-top: 2.5rem;
          display: flex;
          gap: 2rem;
          align-items: center;
        }
        .motion-trust-badges img {
          height: 32px;
          opacity: 0.7;
        }
        .motion-hero-bg-graphic {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 50%;
          z-index: 1;
        }
        .home-features-row {
          display: flex;
          gap: 2rem;
          justify-content: center;
          margin: 3rem auto 2rem auto;
          max-width: 1100px;
        }
        .home-feature-card {
          background: rgba(255,255,255,0.13);
          border-radius: 18px;
          box-shadow: 0 4px 16px rgba(31,38,135,0.10);
          padding: 2rem 1.5rem;
          flex: 1 1 260px;
          min-width: 220px;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .home-feature-card:hover {
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 8px 32px rgba(31,38,135,0.18);
        }
        .home-feature-icon {
          font-size: 2.2rem;
          margin-bottom: 0.7rem;
        }
        .home-feature-title {
          color: #181c25;
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .home-feature-desc {
          color: #3a506b;
          font-size: 1rem;
          text-align: center;
          font-weight: 400;
          background: none !important;
        }
        .home-cta-glass {
          background: rgba(255,255,255,0.13);
          border-radius: 18px;
          box-shadow: 0 4px 16px rgba(31,38,135,0.10);
          padding: 2.5rem 1.5rem;
          max-width: 700px;
          margin: 3rem auto 0 auto;
          text-align: center;
        }
        .home-cta-title {
          color: #181c25;
          font-size: 2rem;
          font-family: var(--heading-font);
          margin-bottom: 1rem;
          font-weight: 900;
        }
        .home-cta-desc {
          color: #3a506b;
          font-size: 1.1rem;
          margin-bottom: 2rem;
          font-weight: 400;
          background: none !important;
        }
        .home-cta-buttons {
          display: flex;
          gap: 1.2rem;
          justify-content: center;
        }
        .cta-button {
          background-color: var(--white);
          color: var(--dark-gray);
          text-decoration: none;
          padding: 1rem 2rem;
          border-radius: 4px;
          font-weight: 600;
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
        }
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
        }
        @media (max-width: 900px) {
          .motion-hero-title {
            font-size: 2.1rem;
          }
        }
        .motion-hero-btn-group {
          display: flex;
          gap: 1.2rem;
          justify-content: center;
          margin-top: 2.2rem;
          flex-wrap: wrap;
        }
        .motion-hero-cta, .google-oauth-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--primary-gradient);
          color: #fff;
          font-weight: 700;
          font-size: 1.15rem;
          padding: 1rem 2.5rem;
          border-radius: 999px;
          box-shadow: 0 4px 16px rgba(41,121,255,0.10);
          text-decoration: none;
          transition: background 0.2s, color 0.2s, box-shadow 0.2s;
          font-family: 'Inter', Arial, sans-serif;
          border: none;
          cursor: pointer;
        }
        .motion-hero-cta:hover, .google-oauth-btn:hover {
          background: linear-gradient(90deg, #2979ff 0%, #1de9b6 100%);
          color: #fff;
          box-shadow: 0 8px 32px rgba(41,121,255,0.18);
        }
        .ai-features-section {
          margin: 4rem auto 2rem auto;
          max-width: 1100px;
          text-align: center;
        }
        .ai-features-title {
          font-size: 2rem;
          font-family: var(--heading-font);
          font-weight: 900;
          color: #181c25;
          margin-bottom: 2.5rem;
        }
        .ai-features-rows {
          display: flex;
          flex-direction: column;
          gap: 2.2rem;
          align-items: center;
        }
        .ai-features-row {
          display: flex;
          flex-direction: row;
          gap: 2.2rem;
          justify-content: center;
          align-items: flex-start;
        }
        .ai-feature-card {
          background: var(--accent-bg);
          border-radius: 32px;
          box-shadow: 0 4px 24px rgba(41,121,255,0.08);
          padding: 2.4rem 1.6rem 2.1rem 1.6rem;
          flex: 1 1 320px;
          max-width: 420px;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          height: auto;
          min-height: unset;
          transition: box-shadow 0.2s;
          box-sizing: border-box;
        }
        .ai-feature-card.expanded {
          box-shadow: 0 8px 32px rgba(41,121,255,0.10);
        }
        .ai-feature-icon {
          font-size: 2.2rem;
          margin-bottom: 0.7rem;
        }
        .ai-feature-title {
          color: #181c25;
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .ai-feature-desc {
          color: #3a506b;
          font-size: 1rem;
          text-align: center;
          font-weight: 400;
          background: none !important;
        }
        .ai-feature-mini-demo {
          margin: 1.2rem 0 0.7rem 0;
          max-width: 100%;
        }
        /* Task Planner v2 */
        .ai-demo-task-chip-v2 {
          background: #e0f7fa;
          border-radius: 18px;
          padding: 1.1rem 1.5rem 1.1rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.7rem;
          font-size: 1.13rem;
          font-weight: 500;
          margin-bottom: 0.4rem;
          width: 100%;
        }
        .ai-demo-task-list-v2 {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          width: 100%;
        }
        .ai-demo-task-row-v2 {
          background: #f6fbff;
          border-radius: 16px;
          padding: 1.1rem 1.5rem 1.1rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.7rem;
          font-size: 1.13rem;
          font-weight: 500;
          width: 100%;
        }
        .ai-demo-task-title-v2 {
          color: #181c25;
          font-weight: 700;
          font-size: 1.15rem;
          margin-bottom: 0.2rem;
        }
        .ai-demo-task-row-bottom {
          display: flex;
          align-items: center;
          gap: 1.1rem;
        }
        .ai-demo-task-priority-v2 {
          color: #fff;
          border-radius: 8px;
          padding: 0.18rem 1.1rem;
          font-size: 1.05em;
          font-weight: 700;
        }
        .ai-demo-task-priority-v2.high { background: linear-gradient(90deg, #00c6fb 0%, #005bea 100%); }
        .ai-demo-task-priority-v2.medium { background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%); }
        .ai-demo-task-priority-v2.low { background: linear-gradient(90deg, #fa8bff 0%, #2bd2ff 100%); }
        .ai-demo-task-time-v2 {
          color: #3a506b;
          font-size: 1.05em;
          font-weight: 600;
        }
        /* Smart Calendar v2 */
        .ai-demo-calendar-expanded-v2 {
          margin-top: 0.7rem;
          background: #f6fbff;
          border-radius: 16px;
          padding: 1.3rem 1.1rem 1.5rem 1.1rem;
          min-width: 260px;
          min-height: 140px;
          box-shadow: 0 1px 4px rgba(41,121,255,0.06);
        }
        .ai-demo-calendar-grid-v2 {
          display: grid;
          grid-template-columns: 60px 1fr;
          gap: 0.5rem 1.1rem;
          font-size: 1.13rem;
        }
        .ai-demo-calendar-block-v2 {
          background: var(--primary-gradient);
          color: #fff;
          min-height: 60px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 1rem 1.3rem;
          font-size: 1.13rem;
          font-weight: 600;
          box-shadow: 0 4px 16px rgba(41,121,255,0.13);
          opacity: 1;
          line-height: 1.5;
          word-break: break-word;
        }
        .ai-demo-calendar-event-title-v2 {
          font-weight: 700;
          font-size: 1.13rem;
          margin-bottom: 0.2rem;
        }
        .ai-demo-calendar-event-time-v2 {
          font-weight: 600;
          font-size: 1.08rem;
        }
        /* Progress Insights v2 */
        .ai-demo-progress-bar-v2 {
          width: 100%;
          max-width: 320px;
          margin: 0 auto 0.7rem auto;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;
        }
        .ai-demo-progress-label-v2 {
          color: #181c25;
          font-size: 1.13rem;
          font-weight: 700;
          margin-bottom: 0.1rem;
        }
        .ai-demo-progress-fill-bg-v2 {
          background: #e0f7fa;
          border-radius: 12px;
          height: 34px;
          width: 100%;
          position: relative;
        }
        .ai-demo-progress-fill-v2 {
          background: var(--primary-gradient);
          height: 100%;
          border-radius: 12px;
        }
        .ai-demo-progress-expanded-v2 {
          margin-top: 1.1rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1.3rem;
        }
        .ai-demo-progress-streak-v2 {
          color: #2979ff;
          font-weight: 700;
          font-size: 1.13em;
          margin-bottom: 0.2rem;
        }
        .ai-demo-progress-tip-v2 {
          color: #3a506b;
          font-size: 1.09em;
          line-height: 1.6;
        }
        /* Seamless Integrations v2 */
        .ai-demo-integrations-v2 {
          display: flex;
          gap: 0.7rem;
          margin-top: 0.7rem;
          justify-content: center;
        }
        .ai-demo-integration-badge-v2 {
          display: inline-block;
          border-radius: 999px;
          padding: 0.45rem 1.2rem;
          font-size: 1.13rem;
          font-weight: 700;
          background: #fff;
          box-shadow: 0 2px 8px rgba(41,121,255,0.08);
          letter-spacing: 0.04em;
          min-width: 2.2rem;
          text-align: center;
        }
        .ai-demo-integration-badge-v2.google {
          color: #4285F4;
        }
        .ai-demo-integration-badge-v2.outlook {
          color: #0078D4;
        }
        .ai-demo-integration-badge-v2.slack {
          color: #4A154B;
        }
        .ai-demo-integrations-expanded-v2 {
          margin-top: 1.1rem;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(41,121,255,0.08);
          padding: 1.2rem 1.1rem 1.3rem 1.1rem;
          color: #181c25;
          font-size: 1.05rem;
          min-width: 180px;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          align-items: center;
        }
        .ai-demo-integration-row-v2 {
          margin-bottom: 0.2rem;
        }
        .ai-demo-integration-status-v2 {
          color: #1de9b6;
          font-weight: 700;
          margin-top: 0.7rem;
          font-size: 1.09em;
        }
        @media (max-width: 900px) {
          .ai-features-row {
            flex-direction: column;
            gap: 2.2rem;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  exampleVisual: React.ReactNode;
  expandedDemo: React.ReactNode;
}

function FeatureCard({
  icon,
  title,
  desc,
  exampleVisual,
  expandedDemo,
}: FeatureCardProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={`ai-feature-card${expanded ? " expanded" : ""}`}
      style={{
        transition: "min-height 0.3s cubic-bezier(.4,2,.6,1), box-shadow 0.2s",
        minHeight: expanded ? 340 : 260,
        boxShadow: expanded
          ? "0 8px 32px rgba(41,121,255,0.10)"
          : "0 2px 8px rgba(41,121,255,0.08)",
        overflow: "visible",
      }}
    >
      <div className="ai-feature-icon">{icon}</div>
      <div className="ai-feature-title">{title}</div>
      <div className="ai-feature-desc">{desc}</div>
      <div className="ai-feature-mini-demo">{exampleVisual}</div>
      <button
        className="ai-feature-see-example"
        onClick={() => setExpanded((e) => !e)}
      >
        {expanded ? "Hide Example" : "See Example"}
      </button>
      <div
        className="ai-feature-expanded-demo-wrapper"
        style={{
          maxHeight: expanded ? 500 : 0,
          opacity: expanded ? 1 : 0,
          transition: "max-height 0.4s cubic-bezier(.4,2,.6,1), opacity 0.2s",
          overflow: "hidden",
        }}
      >
        {expanded && (
          <div className="ai-feature-expanded-demo">{expandedDemo}</div>
        )}
      </div>
    </div>
  );
}

export default Home;
