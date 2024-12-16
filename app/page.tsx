"use client"

import { useChat } from "ai/react"
import { MessageInputForm } from "./components/MessageInputForm"
import { MessageList } from "./components/messages"

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    onResponse: (response) => {
      console.log(response)
    },
    onFinish: () => {
      console.log("finish")
    },
    body: {
      foo: "bar",
    },
  })

  return (
    <div className="h-screen">
      <div className="h-full overflow-hidden">
        <MessageList messages={messages} />
      </div>
      <MessageInputForm
        input={input}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
