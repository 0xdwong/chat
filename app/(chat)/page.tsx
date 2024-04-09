import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { Session } from '@/lib/types'
import { SidebarHistory } from '@/components/sidebar-history'

export const metadata = {
  title: 'Solaigent'
}

export default async function IndexPage() {
  const id = nanoid()

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <SidebarHistory />
      <Chat id={id} />
    </AI>
  )
}
