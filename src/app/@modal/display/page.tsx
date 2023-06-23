"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTheme } from "next-themes";

type colorPickerButtonProps = {
  color: string;
}

function colorPickerButton({ color }: colorPickerButtonProps) {
  const { setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(color)}
      className="w-1/2 rounded-full p-3 flex justify-center">
      {color}
    </button>
  )
}

export default function SettingsPage() {
  return (
    <Dialog defaultOpen={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Customize your view</DialogTitle>
          <DialogDescription>
            These settings affect all the Twitter accounts on this browser.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full bg-gray-300 rounded-full p-3 flex justify-between" style={{ backgroundColor: "gray" }}>
        </div>
        <DialogFooter className="justify-center">
          <Button type="submit" variant="default">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
