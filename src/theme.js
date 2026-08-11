import { createTheme, alpha } from '@mui/material/styles'

const shared = {
  typography: {
    fontFamily: "'Outfit', system-ui, -apple-system, 'Segoe UI', sans-serif",
    h1: { fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05 },
    h2: { fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15 },
    h3: { fontWeight: 700, letterSpacing: '-0.02em' },
    h4: { fontWeight: 700, letterSpacing: '-0.01em' },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none', letterSpacing: 0 },
    body1: { lineHeight: 1.7 },
    body2: { lineHeight: 1.7 },
    overline: { fontWeight: 600, letterSpacing: '0.16em' },
  },
  shape: { borderRadius: 14 },
}

export const getTheme = (mode) => {
  const isDark = mode === 'dark'

  const palette = isDark
    ? {
        mode: 'dark',
        primary: { main: '#7c9cff', light: '#a8bcff', dark: '#4f6fe0' },
        secondary: { main: '#f472b6' },
        info: { main: '#38bdf8' },
        success: { main: '#34d399' },
        warning: { main: '#fbbf24' },
        background: { default: '#080b14', paper: '#0e1424' },
        text: { primary: '#e8ecf6', secondary: '#9aa6c2' },
        divider: 'rgba(148,163,184,0.16)',
      }
    : {
        mode: 'light',
        primary: { main: '#3b5bdb', light: '#5c7cfa', dark: '#2b4acb' },
        secondary: { main: '#d6336c' },
        info: { main: '#0ea5e9' },
        success: { main: '#0f9d76' },
        warning: { main: '#d97706' },
        background: { default: '#f6f8fd', paper: '#ffffff' },
        text: { primary: '#0f172a', secondary: '#5a6785' },
        divider: 'rgba(15,23,42,0.10)',
      }

  const theme = createTheme({ ...shared, palette })

  return createTheme(theme, {
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '*': { scrollBehavior: 'smooth' },
          body: {
            backgroundImage: isDark
              ? 'radial-gradient(1000px 600px at 12% -8%, rgba(124,156,255,0.16), transparent 60%), radial-gradient(900px 520px at 92% 4%, rgba(244,114,182,0.12), transparent 60%)'
              : 'radial-gradient(1000px 600px at 12% -8%, rgba(59,91,219,0.12), transparent 60%), radial-gradient(900px 520px at 92% 4%, rgba(214,51,108,0.08), transparent 60%)',
            backgroundAttachment: 'fixed',
          },
          '::selection': {
            background: alpha(theme.palette.primary.main, 0.28),
          },
          '::-webkit-scrollbar': { width: 10, height: 10 },
          '::-webkit-scrollbar-track': { background: 'transparent' },
          '::-webkit-scrollbar-thumb': {
            background: alpha(theme.palette.text.secondary, 0.28),
            borderRadius: 10,
            border: '2px solid transparent',
            backgroundClip: 'content-box',
          },
          '::-webkit-scrollbar-thumb:hover': {
            background: alpha(theme.palette.text.secondary, 0.45),
            backgroundClip: 'content-box',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 999, paddingInline: 22, paddingBlock: 10 },
          containedPrimary: {
            boxShadow: `0 10px 28px ${alpha(theme.palette.primary.main, isDark ? 0.35 : 0.28)}`,
            '&:hover': {
              boxShadow: `0 14px 34px ${alpha(theme.palette.primary.main, isDark ? 0.45 : 0.34)}`,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 500, borderRadius: 8 },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
        },
      },
      MuiLink: {
        defaultProps: { underline: 'none' },
      },
    },
  })
}

/**
 * Shared page gutter. Wide container with generous side padding so content
 * uses the full screen on large monitors instead of a narrow 1200px column.
 */
export const PAGE_MAX_WIDTH = 'xl'
export const PAGE_PX = { xs: 2.5, sm: 4, md: 6, lg: 9 }

export const glassCard = (theme) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 4,
  backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.6 : 0.8),
  backdropFilter: 'blur(12px)',
  transition: 'transform .35s cubic-bezier(.2,.8,.2,1), box-shadow .35s, border-color .35s',
  '&:hover': {
    transform: 'translateY(-6px)',
    borderColor: alpha(theme.palette.primary.main, 0.5),
    boxShadow: `0 18px 46px ${alpha(
      theme.palette.mode === 'dark' ? '#000000' : theme.palette.primary.main,
      theme.palette.mode === 'dark' ? 0.55 : 0.14
    )}`,
  },
})
