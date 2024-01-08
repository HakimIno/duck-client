import { Input } from "@nextui-org/react"
import React from "react"


interface Props {
  placeHolder: string,
  inputType: string,
  max: number
  error: string
  autoFocus: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  onClear?: () => void;
}

function TextInput({
  placeHolder,
  inputType,
  max,
  error,
  onChange,
  onClear,
  value,
}: Props) {
  return (
    <div>
      <Input
        id={`input-${placeHolder}`}
        value={value}
        maxLength={max}
        autoComplete="off"
        variant="flat"
        label={placeHolder}
        onChange={onChange}
        isClearable
        onClear={onClear}
        endContent={false}
        type={inputType}
      />
      {error && (
        <span className="text-red-500 text-[14px] font-semibold">{error}</span>
      )}
    </div>
  )
}

export default TextInput