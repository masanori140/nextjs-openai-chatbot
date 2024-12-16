import { MessageItem } from "./MessageItem"

export const MessageList = ({
  messages,
}: {
  messages: Array<{ id: string; role: string; content: string }>
}) => {
  return (
    <div className="flex h-full flex-col gap-4 overflow-scroll p-8 pb-32">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  )
}
