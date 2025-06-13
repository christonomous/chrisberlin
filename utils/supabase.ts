import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface ChatHistory {
  id: string
  messages: {
    id: number
    content: string
    role: 'user' | 'assistant'
    timestamp: string
  }[]
  audit_trail: {
    ip: string
    user_agent: string
    location?: {
      country?: string
      city?: string
      region?: string
    }
    created_at: string
    last_updated: string
  }
  subscriber_id?: string
  created_at: string
  updated_at: string
}

// SQL for creating the chats table:
/*
create table public.chats (
  id uuid default gen_random_uuid() primary key,
  messages jsonb not null default '[]'::jsonb,
  audit_trail jsonb not null,
  subscriber_id uuid references public.subscribers(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create index for subscriber_id foreign key
create index chats_subscriber_id_idx on public.chats(subscriber_id);

-- Create function to automatically update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create trigger to call the function
create trigger handle_updated_at
  before update on public.chats
  for each row
  execute function public.handle_updated_at();
*/
