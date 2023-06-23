"use client"

import { useTheme } from "next-themes";

export default function ThemePicker() {
  const { setTheme } = useTheme()

  return (
    <div className="w-full bg-gray-300 rounded-full p-3 flex justify-between" style={{ backgroundColor: "gray" }}>
    <button onClick={() => setTheme('light')} className="w-1/2 rounded-full p-3 flex justify-center">light</button>
    <button onClick={() => setTheme('dark')} className="w-1/2 rounded-full p-3 flex justify-center">dark</button>
    </div>
  )
}
