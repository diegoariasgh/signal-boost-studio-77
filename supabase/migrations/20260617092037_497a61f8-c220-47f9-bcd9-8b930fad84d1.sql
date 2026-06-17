GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT ALL ON public.contact_messages TO service_role;

CREATE POLICY "Anyone can submit a contact message"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (true);