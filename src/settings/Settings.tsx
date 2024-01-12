import { Controller } from "../controllers/Controller";
import { RegularBoggle } from "../controllers/RegularBoggle";
import { BigBoggle } from "../controllers/BigBoggle";
import { AllEs } from "../controllers/AllEs";

export type BoggleSettings = {
  variant: BoggleVariant
}

export type BoggleVariant = "4x4" | "5x5" | "Es";

export function getController(variant: BoggleVariant): Controller {
  switch (variant) {
    case "4x4":
      return RegularBoggle.getInstance();
    case "5x5":
      return BigBoggle.getInstance();
    case "Es":
      return AllEs.getInstance();
  }
}
