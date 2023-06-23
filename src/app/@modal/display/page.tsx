"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
