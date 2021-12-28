module.exports = {
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        fontFamily: {
            body: [
                "-apple-system,BlinkMacSystemFont",
                "Segoe UI",
                "Roboto",
                "Oxygen-Sans",
                "Ubuntu",
                "Cantarell",
                "Helvetica Neue",
                "sans-serif",
            ],
        },
        extend: {
            boxShadow: {
                card: '0px 10px 32px -4px rgba(35, 40, 45, 0.1), 0px 6px 14px -6px rgba(35, 40, 45, 0.12)',
                input: '0 1px 2px rgba(34, 113, 177, 0.1)',
                'input-focused': '0 1px 2px rgba(34, 113, 177, 0.22)',

            },
            colors: {
                black: {
                    DEFAULT: "#23282D",
                    400: '#5A5F63',
                    600: "#6F7F86",
                    800: "#D9DDDF",
                    900: "#F0F1F2",
                },
                primary: {
                    300: '#226297',
                    DEFAULT: "#2271B1",
                },
            },
            fontSize: {
                xs: [
                    "0.75rem",
                    {
                        lineHeight: 1.1,
                    },
                ],
                sm: [
                    "0.8125rem",
                    {
                        lineHeight: 1.1,
                    },
                ],
                md: [
                    "0.875rem",
                    {
                        lineHeight: 1.1,
                    },
                ],
                base: [
                    "0.9375rem",
                    {
                        lineHeight: 1.35,
                    },
                ],
                lg: [
                    "1.125rem",
                    {
                        lineHeight: 1.35,
                    },
                ],
            },
        },
    },
}
