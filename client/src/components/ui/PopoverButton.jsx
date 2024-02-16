// PopoverButton.js

import { PopoverHandler, Button } from "@material-tailwind/react";

function PopoverButton({ triggers }) {
  return (
    <PopoverHandler {...triggers}>
      {/* <Button variant="text">Profile Info</Button> */}
    </PopoverHandler>
  );
}

export default PopoverButton;
