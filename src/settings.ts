export const Themes = ["light", "auto", "dark"] as const;
export const Languages = ["chinese", "auto", "english"] as const;

export type Theme = typeof Themes[number];
export type Language = typeof Languages[number];

export interface Settings {
    theme: Theme;
    language: Language;
}

export type SettingsChangedCallback = (m:SettingsManager)=>void;

export class SettingsManager {
    m_settings: Settings;
    m_matchMedia: MediaQueryList;
    m_changedCallback?: SettingsChangedCallback;
    m_matchMediaChanged?: ()=>void;
    m_storageChanged?: ()=>void;

    constructor() {
        this.m_matchMedia = window.matchMedia("(prefers-color-scheme:dark)");
        this.m_settings = {
            theme: "auto",
            language: "auto",
        };
        this.load();
    }

    store() {
        localStorage.setItem("settings", JSON.stringify(this.m_settings));
    }

    load() {
        const settings = localStorage.getItem("settings");
        if (settings) {
            this.m_settings = JSON.parse(settings);
        }

        this.setDefault();
    }

    setDefault() {
        if (!Themes.includes(this.m_settings.theme)) {
            this.m_settings.theme = "auto";
        }

        if (!Languages.includes(this.m_settings.language)) {
            this.m_settings.language = "auto";
        }
    }

    setChangedCallback(callback?:SettingsChangedCallback) {
        if (this.m_matchMediaChanged) {
            this.m_matchMedia.removeEventListener("change", this.m_matchMediaChanged);
        }

        if (this.m_storageChanged) {
            window.removeEventListener("storage", this.m_storageChanged);
        }

        if (callback) {
            this.m_changedCallback = callback;
            this.m_matchMediaChanged = () => {
                this.m_changedCallback?.(this);
            }
            this.m_storageChanged = () => {
                this.load();
                this.m_changedCallback?.(this);
            }
            this.m_matchMedia.addEventListener("change", this.m_matchMediaChanged);
            window.addEventListener("storage", this.m_storageChanged);
        }
    }

    settings(): Settings {
        return this.m_settings;
    }

    finalTheme(): string {
        switch (this.m_settings.theme) {
            case "light": return "light";
            case "dark": return "dark";
            case "auto": return this.m_matchMedia.matches ? "dark" : "light";
        }
    }

    theme(): Theme {
        return this.m_settings.theme;
    }

    setTheme(theme:Theme) {
        this.m_settings.theme = theme;
        this.m_changedCallback?.(this);
        this.store();
    }

    toggleTheme(theme?:Theme) {
        if (theme) {
            this.setTheme(theme)
        } else {
            const from = Themes.indexOf(this.m_settings.theme);
            const to = (from + 1) % Themes.length;
            this.setTheme(Themes[to]);
        }
    }

    finalLanguage(): string {
        switch (this.m_settings.language) {
            case "chinese": return "chinese";
            case "english": return "english";
            case "auto": return navigator.language === 'zh-CN' ? 'chinese' : 'english';
        }
    }

    language(): Language {
        return this.m_settings.language;
    }

    setLanguage(language:Language) {
        this.m_settings.language = language;
        this.m_changedCallback?.(this);
        this.store();
    }

    toggleLanguage(language?:Language) {
        if (language) {
            this.setLanguage(language)
        } else {
            const from = Languages.indexOf(this.m_settings.language);
            const to = (from + 1) % Languages.length;
            this.setLanguage(Languages[to]);
        }
    }
}

const GlobalSettings: SettingsManager = new SettingsManager();

export default GlobalSettings;