import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    FormControlLabel,
    Checkbox,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    NativeSelect,
} from "@mui/material";

// Import translations from the JSON file
import translations from "./translations.json";

// Define the type for the translations object keys
type LanguageKey = keyof typeof translations;

// Define the type for cookie categories
type CookieCategory = "necessary" | "analytics" | "marketing";

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [cookieSettings, setCookieSettings] = useState<{
        necessary: boolean;
        analytics: boolean;
        marketing: boolean;
    }>({
        necessary: true, // Always enabled
        analytics: false,
        marketing: false,
    });
    const [language, setLanguage] = useState<LanguageKey>("en"); // Default language

    useEffect(() => {
        const savedSettings = localStorage.getItem("cookieSettings");
        const savedLanguage = localStorage.getItem("language");

        if (savedLanguage && savedLanguage in translations) {
            setLanguage(savedLanguage as LanguageKey);
        }

        if (!savedSettings) {
            setIsVisible(true);
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem("cookieSettings", JSON.stringify(cookieSettings));
        localStorage.setItem("language", language);
        setIsVisible(false);
    };

    const handleToggle = (category: CookieCategory) => {
        setCookieSettings((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = event.target.value;
        if (selectedLanguage in translations) {
            setLanguage(selectedLanguage as LanguageKey);
        }
    };

    // Fetch translations based on selected language
    const t = translations[language];

    if (!isVisible) return null;

    return (
        <Dialog
            open={isVisible}
            sx={{
                "& .MuiDialog-paper": {
                    borderRadius: "10px", // Setting border-radius
                    maxWidth: "50vh", // Set maximum width
                    width: "100%", // Ensure dialog takes full width within max width
                },
            }}
        >
            <DialogTitle className="cookie-banner-title">{t.title}</DialogTitle>
            <DialogContent className="cookie-banner-content">
                <Box mb={2} textAlign={"center"}>
                    <FormControl>
                        <InputLabel variant="standard" htmlFor="language-select">
                            Language
                        </InputLabel>
                        <NativeSelect
                            value={language}
                            onChange={handleLanguageChange}
                            inputProps={{
                                name: "language",
                                id: "language-select",
                            }}
                        >
                            {/* Dynamically populate language options from the translations JSON */}
                            {Object.keys(translations).map((langKey) => (
                                <option key={langKey} value={langKey}>
                                    {langKey.toUpperCase()} {/* Displaying language code in uppercase */}
                                </option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                </Box>
                <Typography variant="body2" sx={{ textAlign: "center" }} className="cookie-banner-text">
                    {t.description}
                </Typography>
                <Box className="cookie-banner-checkboxes">
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={cookieSettings.necessary}
                                disabled
                                className="cookie-banner-checkbox"
                            />
                        }
                        label={t.necessary}
                        className="cookie-banner-label"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={cookieSettings.analytics}
                                onChange={() => handleToggle("analytics")}
                                className="cookie-banner-checkbox"
                            />
                        }
                        label={t.analytics}
                        className="cookie-banner-label"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={cookieSettings.marketing}
                                onChange={() => handleToggle("marketing")}
                                className="cookie-banner-checkbox"
                            />
                        }
                        label={t.marketing}
                        className="cookie-banner-label"
                    />
                </Box>
            </DialogContent>
            <DialogActions className="cookie-banner-actions">
                <Button onClick={handleSave} variant="contained" color="primary" sx={{ color: "white" }} className="cookie-banner-button">
                    {t.save}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CookieBanner;
