import { WidthIcon } from "@radix-ui/react-icons";

import { Button } from "./ui/button";
import { Combobox } from "./ui/combobox";
import {
  DEFAULT_FROM_LANGUAGE,
  DEFAULT_TO_LANGUAGE,
  languages,
} from "@/lib/constants";

export const LanguagePicker = () => {
  return (
    <div className="flex items-center gap-2">
      <Combobox options={languages} defaultValue={DEFAULT_FROM_LANGUAGE} />

      <Button variant="ghost" size="sm">
        <WidthIcon />
      </Button>

      <Combobox options={languages} defaultValue={DEFAULT_TO_LANGUAGE} />
    </div>
  );
};
