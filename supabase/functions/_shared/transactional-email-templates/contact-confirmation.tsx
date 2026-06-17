import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
}

const Email = ({ name }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Thanks for reaching out to Signalworks</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Thanks{name ? `, ${name}` : ''} —</Heading>
        <Text style={p}>
          Your message reached Signalworks. We read every inquiry personally and
          will be in touch shortly.
        </Text>
        <Text style={p}>
          In the meantime, feel free to reply to this email with anything else
          that would help us understand what you're working on.
        </Text>
        <Text style={signoff}>— Diego, Signalworks</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'Thanks for reaching out to Signalworks',
  displayName: 'Contact form confirmation',
  previewData: { name: 'Jane' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif', color: '#0f172a' }
const container = { padding: '40px 24px', maxWidth: '520px', margin: '0 auto' }
const h1 = { fontSize: '22px', fontWeight: 600, margin: '0 0 16px' }
const p = { fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }
const signoff = { fontSize: '15px', margin: '32px 0 0', color: '#475569' }
