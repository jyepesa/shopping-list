import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Card from "./components/Card"
import { useState, useEffect } from "react"
import { type CardProps } from "./components/Card"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

export function App() {
  const [list, setList] = useState<CardProps[]>(() => {
    const stored = localStorage.getItem("shopping-list")
    return stored ? JSON.parse(stored) : []
  })
  const [input, setInput] = useState("")
  const [amount, setAmount] = useState("1")

  useEffect(() => {
    localStorage.setItem("shopping-list", JSON.stringify(list))
  }, [list])

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value)
  }
  function handleAmount(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(e.target.value)
  }

  function addEntry() {
    const trimmedInput = input.trim().toLowerCase()
    const alreadyExists = list.some(
      (item) => item.product.toLowerCase() === trimmedInput
    )
    if (alreadyExists) {
      toast.error("Wrong entry!", {
        description: "This item already exists in your list",
      })
      return
    }
    const randomId = crypto.randomUUID()
    setList((prev) => [
      ...prev,
      { product: input, amount: amount, checked: false, id: randomId },
    ])
    setInput("")
    setAmount("1")
  }

  function checkItem(id: string | undefined) {
    if (!id) {
      return
    }
    setList((prev) => {
      const checkedProduct = prev.find((item) => item.id === id)
      if (!checkedProduct) {
        return prev
      }
      const reducedList = prev.filter((item) => item.id !== id)
      const updatedProduct = {
        ...checkedProduct,
        checked: !checkedProduct.checked,
      }
      return updatedProduct.checked
        ? [...reducedList, updatedProduct]
        : [updatedProduct, ...reducedList]
    })
  }

  function eraseItem(id: string | undefined) {
    setList(list.filter((item) => item.id !== id))
  }

  return (
    <div className="mx-auto min-h-svh max-w-2xl p-6">
      <Toaster richColors />
      <h1 className="m-8 text-center text-5xl font-bold">Shopping List</h1>
      <div className="flex w-full gap-3">
        <Input
          value={input}
          className="flex-8"
          placeholder="Enter a product..."
          onChange={handleInput}
        ></Input>
        <Input
          value={amount}
          type="number"
          className="flex-1"
          onChange={handleAmount}
          min={1}
        ></Input>
      </div>
      <Button className="mt-2 w-full" disabled={!input} onClick={addEntry}>
        Add Entry
      </Button>
      <div className="mt-6">
        {list.map((item) => (
          <Card
            product={item.product}
            amount={item.amount}
            checked={item.checked}
            key={item.id}
            handleCheck={() => checkItem(item.id)}
            handleDelete={() => eraseItem(item.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default App
