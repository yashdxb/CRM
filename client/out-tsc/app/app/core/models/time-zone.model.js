// Reusable flag resolver to keep the UI consistent across all selectors.
export const getTimeZoneFlagUrl = (flagCode) => {
    if (!flagCode) {
        return 'https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png';
    }
    return `https://flagcdn.com/w20/${flagCode}.png`;
};
