import React from "react";
import {
  TextIcon,
  ImageIcon,
  FileIcon,
  TableIcon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

export const Toolbelt = () => {
  return (
    <nav>
      <ul className="flex items-center gap-2">
        <li>
          <Button variant="ghost">
            <TextIcon className="h-4 w-4 mr-2" />
            Text
          </Button>
        </li>
        <li>
          <Button variant="ghost">
            <ImageIcon className="h-4 w-4 mr-2" />
            Images
          </Button>
        </li>
        <li>
          <Button variant="ghost">
            <FileIcon className="h-4 w-4 mr-2" />
            Documents
          </Button>
        </li>
        <li>
          <Button variant="ghost">
            <TableIcon className="h-4 w-4 mr-2" />
            Web sites
          </Button>
        </li>
      </ul>
    </nav>
  );
};
