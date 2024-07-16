"use client";

import { FC, useState, ChangeEvent, FormEvent, useContext } from "react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { useLocalStorage } from "@/hooks";
import { setupContext } from "@/providers";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const SetupDialog = () => {
  const { setupIsOpen, handleCloseSetupDialog, apiKey, setApiKey } =
    useContext(setupContext);

  const [showApiKey, setShowApiKey] = useState(false);
  const [value, setValue] = useState(apiKey ?? "");

  // Save apiKey to localStorage
  const handleSaveApiKey = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setApiKey(value);

    handleCloseSetupDialog();
  };

  // Save apiKey value to state
  const handleChangeApiKey = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;

    setValue(value);
  };

  const handleChangeShowApiKey = () => setShowApiKey((prev) => !prev);

  return (
    <Dialog open={setupIsOpen} onOpenChange={handleCloseSetupDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <form className="flex flex-col gap-4" onSubmit={handleSaveApiKey}>
          <DialogHeader>
            <DialogTitle>Setup Api Key</DialogTitle>
            <DialogDescription>
              Enter your{" "}
              <Link
                className="underline font-bold"
                target="_blank"
                rel="noreferrer"
                href="https://platform.openai.com/account/api-keys"
              >
                API key
              </Link>{" "}
              to start using the app. Your key is not stored. You can verify
              this in the{" "}
              <Link
                className="underline font-bold"
                target="_blank"
                rel="noreferrer"
                href="https://github.com/developaul/translate-app"
              >
                open-source code
              </Link>
              .
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Label htmlFor="apiKey">Api Key</Label>
            <div className="flex gap-1">
              <Input
                value={value}
                onChange={handleChangeApiKey}
                id="apiKey"
                type={showApiKey ? "text" : "password"}
              />
              <Button
                onClick={handleChangeShowApiKey}
                variant="ghost"
                size="icon"
                type="button"
              >
                {showApiKey && <EyeOpenIcon className="h-4 w-4" />}

                {!showApiKey && <EyeClosedIcon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <DialogFooter className="w-full">
            <Button className="w-full" type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
