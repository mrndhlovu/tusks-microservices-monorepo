import { ChangeEvent, MouseEvent, useState } from "react"
import { Button, Textarea } from "@chakra-ui/react"

interface IProps {
  title: string
  close: () => void
  save: (newTitle: string) => void
}

const EditCardMenu = ({ title, close, save }: IProps) => {
  const [newTitle, setNewTitle] = useState<string>("")

  const handleChange = (ev: ChangeEvent<HTMLElement>) => {
    setNewTitle((ev.target as any).value)
  }

  const handleSave = () => {
    if (newTitle && newTitle !== title) {
      save(newTitle)
    }
  }

  const handleClose = (ev: MouseEvent) => {
    ev.preventDefault()

    close()
  }

  return (
    <div className="card-editor">
      <div className="card-editor-content">
        <Textarea onChange={handleChange} defaultValue={title} />
      </div>
      <div className="action-buttons">
        <Button size="sm" onClick={handleSave} colorScheme="blue">
          Save
        </Button>
      </div>
    </div>
  )
}

export default EditCardMenu
