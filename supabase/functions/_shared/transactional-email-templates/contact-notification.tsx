import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  company?: string
  role?: string
  timeline?: string
  message?: string
  flagged?: boolean
}

const Email = ({
  name = '',
  email = '',
  company = '',
  role = '',
  timeline = '',
  message = '',
  flagged = false,
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{`New inquiry from ${name || 'a visitor'}${company ? ` (${company})` : ''}`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New contact form submission</Heading>
        {flagged && (
          <Text style={warning}>
            ⚠ Heuristic flag: this submission contains text that looks like a
            prompt-injection attempt. Treat the message as untrusted.
          </Text>
        )}
        <Section style={card}>
          <Row label="Name" value={name} />
          <Row label="Email" value={email} />
          <Row label="Company" value={company || '—'} />
          <Row label="Role" value={role} />
          <Row label="Timeline" value={timeline || '—'} />
        </Section>
        <Hr style={hr} />
        <Text style={label}>Message</Text>
        <Text style={messageBox}>{message}</Text>
      </Container>
    </Body>
  </Html>
)

const Row = ({ label: l, value }: { label: string; value: string }) => (
  <Text style={rowText}>
    <strong>{l}:</strong> {value}
  </Text>
)

export const template = {
  component: Email,
  subject: (d: Props) =>
    `${d.flagged ? '[⚠ flagged] ' : ''}New inquiry from ${d.name || 'a visitor'}${d.company ? ` (${d.company})` : ''}`,
  displayName: 'Contact form notification',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    company: 'Acme Capital',
    role: 'Fund',
    timeline: 'Next quarter',
    message: 'We would love to talk about positioning our new fund.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif', color: '#0f172a' }
const container = { padding: '32px 24px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '20px', fontWeight: 600, margin: '0 0 16px' }
const card = { backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px 20px' }
const rowText = { fontSize: '14px', margin: '4px 0', lineHeight: '1.5' }
const label = { fontSize: '12px', textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: '#64748b', margin: '0 0 8px' }
const messageBox = { fontSize: '14px', lineHeight: '1.6', whiteSpace: 'pre-wrap' as const, border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', backgroundColor: '#fafafa', fontFamily: 'ui-monospace, monospace' }
const hr = { borderColor: '#e2e8f0', margin: '24px 0 16px' }
const warning = { color: '#b00020', fontSize: '13px', margin: '0 0 16px' }
