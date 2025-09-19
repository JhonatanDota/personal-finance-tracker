import { useState } from "react";

import DesktopMenu from "./MenuDesktop";
import MobileMenu from "./MenuMobile";

export default function Menu() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <MobileMenu mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <DesktopMenu />
    </>
  );
}
