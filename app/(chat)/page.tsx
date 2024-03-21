import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { SidebarHistory } from '@/components/sidebar-history'

export const metadata = {
  title: 'Next.js AI Chatbot'
}

export default async function IndexPage() {
  const id = nanoid()
  const session = (await auth()) as Session

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <SidebarHistory />
      <Chat id={id} session={session} />
    </AI>
  )
}
