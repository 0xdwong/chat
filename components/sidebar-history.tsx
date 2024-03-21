'use client'

import { AI } from '@/lib/chat/actions'
import { useUIState } from 'ai/rsc'
import { useEffect, useState } from 'react'
import { BotMessage, UserMessage } from './stocks/message'
import { History } from '@/lib/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { nanoid } from 'nanoid'

export function SidebarHistory() {
  const router = useRouter()
  const [messages, setMessages] = useUIState<typeof AI>()
  let [chatIndex, setChatIndex] = useState(0);
  let [history, setHistory] = useState([{list: []}])

    //   清除message => 初始化对应chat数据
  function toggleChat(index: number) {
    localStorage.setItem("chat-index", JSON.stringify(index));
    router.push('/new')
  }

  function deleteChat(event: MouseEvent, index: number) {
    event.stopPropagation();
    const local = JSON.parse(localStorage.getItem('chat-history') as string);
    if (local.length === 1) {
        localStorage.setItem("chat-history", JSON.stringify([{id: nanoid(), list: []}]));
        localStorage.setItem("chat-index", "0");
        router.push('/new')
        return
    }
    local.splice(index, 1);
    localStorage.setItem("chat-history", JSON.stringify(local));
    localStorage.setItem("chat-index", `${chatIndex - 1 < 0 ? 0 : chatIndex - 1}`);
    router.push('/new')
}

  function init(local: any) {
    const index = Number(localStorage.getItem('chat-index'))
    chatIndex = index;
    setChatIndex(chatIndex);
    local[index]?.list.map((e: History) => {
      const obj =
        e.provider === 'bot'
          ? {
              id: e.id,
              display: <BotMessage content={e.message} />
            }
          : {
              id: e.id,
              display: <UserMessage>{e.message}</UserMessage>
            }
      setMessages((currentMessages: any) => [...currentMessages, obj])
    })
    history = local
    setHistory([...history])
  }

  function initLocal() {
    localStorage.setItem('chat-history', JSON.stringify([{id: nanoid(), list: []}]))
    localStorage.setItem('chat-index', '0')
  }

  useEffect(() => {
    const local = localStorage.getItem('chat-history')
    local ? init(JSON.parse(local)) : initLocal()
  }, [])

  return (
    <div className="fixed h-screen w-[250px] bg-black z-[999]">
      {history.map((e: any, index: number) => (
        <div
          key={index}
          onClick={() => toggleChat(index)}
          className={`px-5 py-3 flex justify-between items-center ${chatIndex === index ? "bg-cyan-600" : ""} gap-10 border-1 border-slate-300 cursor-pointer hover:bg-cyan-600`}
        >
          <p className="text-white truncate ...">
            {e.list[0]?.message || 'New Chat'}
          </p>
          <Image
            className="cursor-pointer"
            src="/icon-delete.png"
            alt="delete"
            width={15}
            height={15}
            onClick={(event: any) => deleteChat(event, index)}
          />
        </div>
      ))}
    </div>
  )
}
