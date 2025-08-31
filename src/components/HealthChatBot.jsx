import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'

export default function HealthChatbot() {
  const [open, setOpen] = useState(false)
  const [history, setHistory] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef()

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history, open])

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMsg = { role: 'user', content: input }
    setHistory(h => [...h, userMsg])
    setInput('')
    setLoading(true)
    try {
      const { data } = await axios.post('http://localhost:5000/api/chatbot', {
        history, message: input
      })
      setHistory(h => [...h, { role: 'assistant', content: data.reply }])
    } catch {
      setHistory(h => [...h, { role: 'assistant', content: '😔 Sorry, something went wrong.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating “?” button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="
          fixed bottom-6 right-6 p-4 bg-violet-600 text-white rounded-full shadow-lg
          hover:bg-violet-700 transition z-50
        "
        aria-label="Chat with healthbot"
      >
        <QuestionMarkCircleIcon className="w-6 h-6" />
      </button>

      {/* Chat window */}
      {open && (
        <div className="
          fixed bottom-20 right-6 w-80 h-96 bg-white rounded-xl shadow-lg
          flex flex-col overflow-hidden z-40
        ">
          {/* Header */}
          <div className="bg-violet-600 text-white px-4 py-2">
            Health Assistant
          </div>

          {/* Message list */}
          <div
            ref={scrollRef}
            className="flex-1 p-2 overflow-auto space-y-2 bg-gray-50"
          >
            {history.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role==='user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`
                  max-w-[70%] px-3 py-2 rounded-lg shadow
                  ${m.role==='user' ? 'bg-violet-100 text-violet-900' : 'bg-white text-gray-800'}
                `}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && <div className="text-center text-sm text-gray-500">Typing…</div>}
          </div>

          {/* Input */}
          <div className="px-2 py-2 border-t flex items-center">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if(e.key==='Enter') sendMessage() }}
              className="flex-1 border rounded-full px-3 py-1 focus:outline-none"
              placeholder="Ask a health question…"
            />
            <button
              onClick={sendMessage}
              className="ml-2 p-2 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition"
            >
              → 
            </button>
          </div>
        </div>
      )}
    </>
  )
}
