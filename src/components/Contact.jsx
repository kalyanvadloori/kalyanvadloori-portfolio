import { useState } from 'react'
import {
  Box,
  Container,
  Paper,
  Typography,
  Stack,
  Button,
  Grid,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import MailIcon from '@mui/icons-material/MailOutline'
import SendIcon from '@mui/icons-material/SendOutlined'
import NorthEastIcon from '@mui/icons-material/NorthEast'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import Reveal from './Reveal'
import { profile, opportunityTypes } from '../data/resume'
import { PAGE_MAX_WIDTH, PAGE_PX } from '../theme'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const EMPTY = { name: '', email: '', type: opportunityTypes[0], message: '' }

/**
 * Web3Forms access key, read from `.env` (see .env.example).
 * With a key set, messages POST straight to your inbox. Without one, the form
 * falls back to opening the visitor's mail client — which silently fails on
 * machines with no mail app configured, so set the key before sharing the site.
 */
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

/** Small bordered fact row used down the left column. */
function FactRow({ label, value }) {
  return (
    <Paper
      elevation={0}
      sx={(t) => ({
        px: 2.25,
        py: 1.6,
        borderRadius: 2.5,
        border: `1px solid ${t.palette.divider}`,
        backgroundColor: alpha(t.palette.text.primary, t.palette.mode === 'dark' ? 0.04 : 0.03),
      })}
    >
      <Typography variant="body2" color="text.secondary">
        {label}{' '}
        <Box component="span" sx={{ color: 'text.primary', fontWeight: 700 }}>
          {value}
        </Box>
      </Typography>
    </Paper>
  )
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [toast, setToast] = useState(null) // { severity, message } | null

  const setField = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    setErrors((err) => ({ ...err, [key]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!values.name.trim()) next.name = 'Please tell me your name'
    if (!values.email.trim()) next.email = 'An email address is required'
    else if (!EMAIL_RE.test(values.email.trim())) next.email = 'That does not look like a valid email'
    if (!values.message.trim()) next.message = 'Add a short message'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  /** Last-resort path when no Web3Forms key is configured, or the POST fails. */
  const openMailClient = () => {
    const subject = `[${values.type}] Portfolio enquiry from ${values.name.trim()}`
    const body = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      `Opportunity type: ${values.type}`,
      '',
      values.message.trim(),
    ].join('\n')

    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate() || sending) return

    // No key configured yet — hand off to the visitor's mail client and say so
    // honestly, rather than claiming the message was sent.
    if (!ACCESS_KEY) {
      openMailClient()
      setToast({
        severity: 'info',
        message: `Opening your email app — if nothing happens, write to ${profile.email}`,
      })
      return
    }

    setSending(true)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `[${values.type}] Portfolio enquiry from ${values.name.trim()}`,
          from_name: 'Portfolio Contact Form',
          name: values.name.trim(),
          email: values.email.trim(),
          opportunity_type: values.type,
          message: values.message.trim(),
          botcheck: '', // Web3Forms honeypot
        }),
      })
      const data = await res.json()

      if (data.success) {
        setToast({
          severity: 'success',
          message: 'Message sent — thank you. I usually reply within a day.',
        })
        setValues(EMPTY)
      } else {
        throw new Error(data.message || 'Submission rejected')
      }
    } catch {
      openMailClient()
      setToast({
        severity: 'warning',
        message: `Couldn't send that automatically — opening your email app instead. Or write to ${profile.email}`,
      })
    } finally {
      setSending(false)
    }
  }

  const fieldSx = (t) => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: 2.5,
      backgroundColor: alpha(t.palette.text.primary, t.palette.mode === 'dark' ? 0.04 : 0.02),
      '& fieldset': { borderColor: t.palette.divider },
      '&:hover fieldset': { borderColor: alpha(t.palette.primary.main, 0.5) },
    },
  })

  return (
    <Box id="contact" component="section" sx={{ py: { xs: 9, md: 14 }, scrollMarginTop: '90px' }}>
      <Container maxWidth={PAGE_MAX_WIDTH} sx={{ px: PAGE_PX }}>
        <Reveal>
          <Grid container spacing={{ xs: 3, md: 4 }} alignItems="stretch">
            {/* ---------------- left: the pitch ---------------- */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={(t) => ({
                  height: '100%',
                  p: { xs: 3, md: 5 },
                  borderRadius: 5,
                  border: `1px solid ${t.palette.divider}`,
                  background: `linear-gradient(160deg, ${alpha(
                    t.palette.primary.main,
                    0.1
                  )}, ${alpha(t.palette.secondary.main, 0.07)} 60%, transparent)`,
                  backdropFilter: 'blur(14px)',
                })}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 11.5, md: 13 },
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'secondary.main',
                    mb: 2,
                  }}
                >
                  Contact
                </Typography>

                <Typography
                  variant="h3"
                  sx={{ fontSize: { xs: '2.3rem', md: '3.2rem', lg: '3.6rem' }, mb: 2.5 }}
                >
                  Start a conversation
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontSize: { xs: '1.05rem', md: '1.15rem' }, mb: 4, maxWidth: 460 }}
                >
                  If there&apos;s a role, a product idea, or a problem you want a second opinion on,
                  I&apos;d like to hear it. I read everything and reply within a day.
                </Typography>

                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  component="a"
                  href={`mailto:${profile.email}`}
                  sx={{
                    mb: 3.5,
                    textDecoration: 'none',
                    color: 'text.primary',
                    '&:hover .contact-email': { color: 'primary.main' },
                  }}
                >
                  <MailIcon sx={{ color: 'secondary.main' }} />
                  <Typography
                    className="contact-email"
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: '1rem', md: '1.15rem' },
                      wordBreak: 'break-all',
                      transition: 'color .25s',
                    }}
                  >
                    {profile.email}
                  </Typography>
                </Stack>

                <Stack spacing={1.5} sx={{ mb: 3.5 }}>
                  <FactRow label="Typical response time:" value={profile.responseTime} />
                  <FactRow label={`${profile.location} ·`} value={profile.timezone} />
                </Stack>

                <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
                  <Button
                    variant="outlined"
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener"
                    startIcon={<LinkedInIcon />}
                    endIcon={<NorthEastIcon sx={{ fontSize: '0.9rem !important' }} />}
                    sx={{ color: 'text.primary', borderColor: 'divider' }}
                  >
                    LinkedIn
                  </Button>
                  {profile.github && (
                    <Button
                      variant="outlined"
                      href={profile.github}
                      target="_blank"
                      rel="noopener"
                      startIcon={<GitHubIcon />}
                      endIcon={<NorthEastIcon sx={{ fontSize: '0.9rem !important' }} />}
                      sx={{ color: 'text.primary', borderColor: 'divider' }}
                    >
                      GitHub
                    </Button>
                  )}
                </Stack>
              </Paper>
            </Grid>

            {/* ---------------- right: the form ---------------- */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={(t) => ({
                  height: '100%',
                  p: { xs: 3, md: 5 },
                  borderRadius: 5,
                  border: `1px solid ${t.palette.divider}`,
                  backgroundColor: alpha(
                    t.palette.background.paper,
                    t.palette.mode === 'dark' ? 0.55 : 0.88
                  ),
                  backdropFilter: 'blur(14px)',
                })}
              >
                <Typography variant="h5" sx={{ mb: 3, fontSize: { xs: '1.4rem', md: '1.7rem' } }}>
                  Send a message
                </Typography>

                <Stack spacing={2.5}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: 0.75, fontWeight: 600 }}>
                      Name
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Your name"
                      value={values.name}
                      onChange={setField('name')}
                      error={Boolean(errors.name)}
                      helperText={errors.name}
                      sx={fieldSx}
                    />
                  </Box>

                  <Box>
                    <Typography variant="body2" sx={{ mb: 0.75, fontWeight: 600 }}>
                      Email
                    </Typography>
                    <TextField
                      fullWidth
                      type="email"
                      placeholder="you@company.com"
                      value={values.email}
                      onChange={setField('email')}
                      error={Boolean(errors.email)}
                      helperText={errors.email}
                      sx={fieldSx}
                    />
                  </Box>

                  <Box>
                    <Typography variant="body2" sx={{ mb: 0.75, fontWeight: 600 }}>
                      Opportunity type
                    </Typography>
                    <TextField
                      select
                      fullWidth
                      value={values.type}
                      onChange={setField('type')}
                      sx={fieldSx}
                    >
                      {opportunityTypes.map((opt) => (
                        <MenuItem key={opt} value={opt}>
                          {opt}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>

                  <Box>
                    <Typography variant="body2" sx={{ mb: 0.75, fontWeight: 600 }}>
                      Message
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="What are you working on?"
                      value={values.message}
                      onChange={setField('message')}
                      error={Boolean(errors.message)}
                      helperText={errors.message}
                      sx={fieldSx}
                    />
                  </Box>

                  {/* Honeypot — hidden from people, irresistible to spam bots. */}
                  <Box
                    component="input"
                    type="checkbox"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    sx={{ display: 'none' }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={sending}
                    endIcon={
                      sending ? <CircularProgress size={18} color="inherit" /> : <SendIcon />
                    }
                    sx={{ py: 1.4, fontSize: '1rem' }}
                  >
                    {sending ? 'Sending…' : 'Send Message'}
                  </Button>

                  <Typography variant="caption" color="text.secondary" textAlign="center">
                    {ACCESS_KEY
                      ? 'Goes straight to my inbox — I reply within a day.'
                      : 'Opens in your email app with the details filled in.'}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Reveal>
      </Container>

      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={6000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={toast?.severity || 'info'}
          variant="filled"
          onClose={() => setToast(null)}
          sx={{ maxWidth: 460 }}
        >
          {toast?.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
