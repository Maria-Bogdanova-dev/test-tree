import { createPortal } from "react-dom";
import Dialog from "@mui/material/Dialog";
export default function Modal({ children, open, setModal }) {
  return createPortal(
    <Dialog open={open} onClose={() => setModal(false)}>
      {children}
    </Dialog>,
    document.querySelector("#modal")
  );
}
