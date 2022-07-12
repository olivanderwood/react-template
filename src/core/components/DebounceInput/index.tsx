import { useRef, useState } from "react";

const DebounceInput = ({
  onSubmit,
  ...props
}: {
  onSubmit?: (value: string) => void;
}) => {
  const [inputValue, setInputValue] = useState("");
  const typingTimeoutRef = useRef<any>(null);
  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setInputValue(value);

    if (!onSubmit) return;

    clearInterval(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout((): void => {
      onSubmit(value);
    }, 300);
  };
  return (
    <input
      className="block rounded-lg placeholder:italic duration-300 shadow p-4 pl-10 w-full text-base text-gray-900 bg-gray-50 active:outline-0 focus:outline-none"
      onChange={handleSubmit}
      placeholder="Type to search..."
      value={inputValue}
    />
  );
};

export default DebounceInput;
