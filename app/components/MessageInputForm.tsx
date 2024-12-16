import { PlaneIcon } from "./icons"

export const MessageInputForm = ({
  input,
  onInputChange,
  onSubmit,
}: {
  input: string
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="absolute bottom-0 left-6 right-6 z-10 bg-transparent"
    >
      <div className="relative flex items-center justify-center bg-transparent p-4">
        <input
          value={input}
          onChange={onInputChange}
          className="w-full rounded-xl border p-4 pr-20 shadow-md focus:outline-none focus:shadow-lg"
          placeholder="メッセージを送信"
        />
        <button
          type="submit"
          className="absolute right-8 rounded-md bg-white px-2 py-1.5 text-sm text-black"
        >
          <PlaneIcon className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </form>
  )
}
