import React, { createContext, FC, PropsWithChildren, useState, useContext, useEffect } from "react";

type ThemeType = 'light' | 'dark';

const initialTheme: ThemeType = (localStorage.getItem('theme') as ThemeType) || 'light';

const ThemeContext = createContext<{
    theme: ThemeType;
    toggleTheme: () => void;
}>({
    theme: initialTheme,
    toggleTheme: () => {},
});


const ThemeProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [theme, setTheme] = useState<ThemeType>(initialTheme);

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const themeStyles = {
        backgroundColor: theme === 'light' ? '#ffffff' : '#333333',
        color: theme === 'light' ? '#333333' : '#ffffff',
        minHeight: '100vh',
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div style={themeStyles}>{children}</div>
        </ThemeContext.Provider>
    );
};


const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };
