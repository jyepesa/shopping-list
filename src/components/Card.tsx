import { Button } from "./ui/button"
import { CircleCheckBig, Undo2, Trash } from "lucide-react"

export interface CardProps {
  product: string
  amount: string
  checked: boolean
  id?: string
}

function Card({
  product,
  amount,
  checked,
  handleCheck,
  handleDelete,
}: CardProps & { handleCheck: () => void; handleDelete: () => void }) {
  return (
    <div className="my-3 flex items-center justify-between gap-3 rounded-xl border px-6 py-3">
      <div>
        <h2
          className={`font-bold ${checked ? "text-gray-500 line-through" : ""}`}
        >
          {product}
        </h2>
        <p className="text-sm text-gray-500">Quantity: {amount}</p>
      </div>
      {!checked ? (
        <Button
          className="shrink-0 border-border bg-white text-primary hover:bg-gray-200"
          onClick={handleCheck}
        >
          <CircleCheckBig /> Check off
        </Button>
      ) : (
        <div className="flex shrink-0 flex-nowrap">
          <Button
            className="bg-rose-500 hover:bg-rose-400"
            onClick={handleDelete}
          >
            <Trash />
          </Button>
          <Button onClick={handleCheck}>
            <Undo2 /> Back
          </Button>
        </div>
      )}
    </div>
  )
}

export default Card
