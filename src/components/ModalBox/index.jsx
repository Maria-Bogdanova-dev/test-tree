/* eslint-disable react/prop-types */
import Modal from "../Modal";

import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.js";

export default function ModalBox({ open, kindModal, setModal }) {
  return (
    <ThemeProvider theme={theme}>
      <Modal open={open} setModal={setModal}>
        <DialogTitle>{kindModal}</DialogTitle>
        <Divider />

        <DialogContent
          sx={{ height: `${kindModal === "Delete" ? "50px" : "80px"}` }}
        >
          {kindModal === "Delete" ? (
            <Typography
              variant="body1"
              sx={{
                margin: "16px 0",
                fontFamily: "Times New Roman",
                lineHeight: "normal",
              }}
            >
              Do you want to delete 00000?
            </Typography>
          ) : (
            <TextField
              InputLabelProps={kindModal === "Add" ? {} : { shrink: true }}
              autoFocus
              margin="dense"
              id="name"
              label={kindModal === "Add" ? "Node Name" : "New Node Name"}
              type="text"
              fullWidth
              variant="outlined"
            />
          )}
        </DialogContent>
        <Divider />

        <DialogActions>
          <Button
            size="large"
            color="primary"
            variant="outlined"
            onClick={() => setModal(!open)}
            sx={{ padding: "5px 15px !important" }}
          >
            canсel
          </Button>

          <Button
            size="large"
            color={kindModal === "Delete" ? "warning" : "primary"}
            variant={kindModal === "Delete" ? "outlined" : "contained"}
            sx={{ padding: "6px 16px !important" }}
          >
            {kindModal}
          </Button>
        </DialogActions>
      </Modal>
    </ThemeProvider>
  );
}
