import React, { useEffect, useState } from "react";
import ReactDom from "react-dom/client";
import { setting, settingState } from "../../types/data.types";
import "../../index.css";

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Settings />
  </React.StrictMode>,
);

function Settings() {
  const [settings, setSettings] = useState<settingState>({});

  async function getSettings() {
    const result: setting[] = await window.settings.getSettings();

    const settingState: settingState = Object.fromEntries(
      result.map((setting) => [setting.name, setting.value]),
    );
    setSettings(settingState);
  }

  async function handleSleepHoursChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const currentValue = settings.sleep_hours;
    const newValue = String(e.target.checked);

    setSettings((prev) => ({ ...prev, sleep_hours: newValue }));

    try {
      await window.settings.updateSetting("sleep_hours", newValue);
    } catch (error) {
      setSettings((prev) => ({ ...prev, sleep_hours: currentValue }));
    }
  }

  async function handleSleepTimeFromChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const currentValue = settings.sleep_time_from;
    const newValue = e.target.value;

    setSettings((prev) => ({ ...prev, sleep_time_from: newValue }));

    try {
      await window.settings.updateSetting("sleep_time_from", newValue);
    } catch (error) {
      setSettings((prev) => ({ ...prev, sleep_time_from: currentValue }));
    }
  }

  async function handleSleepTimeToChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const currentValue = settings.sleep_time_to;
    const newValue = e.target.value;

    setSettings((prev) => ({ ...prev, sleep_time_to: newValue }));

    try {
      await window.settings.updateSetting("sleep_time_to", newValue);
    } catch (error) {
      setSettings((prev) => ({ ...prev, sleep_time_to: currentValue }));
    }
  }

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <div className="settings">
      <h2>Settings</h2>
      <div className="setting__list">
        <div className="setting__line">
          <span>Sleep Hours:</span>
          <span>
            <input
              type="checkbox"
              checked={settings.sleep_hours === "true"}
              onChange={handleSleepHoursChange}
            />
          </span>
        </div>
        <div
          className={`setting__line ${settings.sleep_hours === "true" ? "setting__show" : "setting__hide"}`}
        >
          <span>Sleep Time:</span>
          <span>
            <input
              type="time"
              value={settings.sleep_time_from || ""}
              onChange={handleSleepTimeFromChange}
            />{" "}
            until{" "}
            <input
              type="time"
              value={settings.sleep_time_to || ""}
              onChange={handleSleepTimeToChange}
            />
          </span>
        </div>
      </div>
    </div>
  );
}
