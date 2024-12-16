import { AssistantIcon, UserIcon } from "../icons"

export const MessageItem = ({
  message,
}: { message: { role: string; content: string } }) => {
  const isUser = message.role === "user"
  return (
    <div
      className={`flex items-start gap-2 p-4 ${isUser ? "bg-white" : "bg-gray-50"}`}
    >
      {message.role === "assistant" && (
        <span className="inline-flex items-center justify-center w-8 h-8 bg-yellow-500 rounded-md flex-shrink-0">
          <AssistantIcon className="w-6 h-6 text-black" />
        </span>
      )}
      {isUser && (
        <span className="inline-flex items-center justify-center w-8 h-8 bg-red-500 rounded-md flex-shrink-0">
          <UserIcon className="w-6 h-6 text-white" />
        </span>
      )}
      <span className="break-words">{message.content}</span>
    </div>
  )
}
