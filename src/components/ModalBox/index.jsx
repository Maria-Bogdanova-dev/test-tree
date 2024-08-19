/* eslint-disable react/prop-types */
import { useEffect, useState, useMemo } from "react";
import Modal from "../Modal";

import useApi from "../../Hooks/UseApi.js";
import { addAction, renameAction, deleteAction } from "../../constants";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.js";

export default function ModalBox({
  open,
  typeOfModal,
  setModal,
  nodeName,
  nodeId,
}) {
  const { tree, addItem, updateItem, deleteItem, setError } = useApi();

  const [item, setItem] = useState(typeOfModal === addAction ? "" : nodeName);
  const [action, setAction] = useState(null);
  const functionsMap = useMemo(
    () =>
      new Map([
        [addAction, addItem],
        [renameAction, updateItem],
        [deleteAction, deleteItem],
      ]),
    [addItem, updateItem, deleteItem]
  );

  const params = useMemo(() => {
    switch (typeOfModal) {
      case addAction:
        return { parentNodeId: nodeId, nodeName: item };
      case renameAction:
        return { id: nodeId, newName: item };
      case deleteAction:
        return { id: nodeId };
      default:
        return {};
    }
  }, [typeOfModal, nodeId, item]);

  useEffect(() => {
    if (!action) return;

    async function fetchData(actionFn, params) {
      try {
        const cancelRequest = await actionFn(params);
        return cancelRequest;
      } catch (error) {
        console.error("Error during action execution:", error);
        setError(error.message || "An error occurred");
      }
    }

    const cancelRequestPromise = fetchData(functionsMap.get(action), params);

    return () => {
      if (typeof cancelRequestPromise === "function") {
        cancelRequestPromise();
      }
    };
  }, [action, functionsMap, nodeId, params]);
  console.log(222, tree);

  return (
    <ThemeProvider theme={theme}>
      <Modal open={open} setModal={setModal}>
        <DialogTitle>{typeOfModal}</DialogTitle>
        <Divider />

        <DialogContent
          sx={{ height: `${typeOfModal === deleteAction ? "50px" : "80px"}` }}
        >
          {typeOfModal === deleteAction ? (
            <Typography
              variant="body1"
              sx={{
                margin: "16px 0",
                fontFamily: "Times New Roman",
                lineHeight: "normal",
              }}
            >
              Do you want to delete {nodeName}?
            </Typography>
          ) : (
            <TextField
              InputLabelProps={
                typeOfModal === addAction ? {} : { shrink: true }
              }
              autoFocus
              margin="dense"
              id="name"
              label={typeOfModal === addAction ? "Node Name" : "New Node Name"}
              type="text"
              fullWidth
              variant="outlined"
              value={item}
              onChange={(e) => setItem(e.target.value)}
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
            color={typeOfModal === deleteAction ? "warning" : "primary"}
            variant={typeOfModal === deleteAction ? "outlined" : "contained"}
            sx={{ padding: "6px 16px !important" }}
            onClick={() => setAction(typeOfModal)}
          >
            {typeOfModal}
          </Button>
        </DialogActions>
      </Modal>
    </ThemeProvider>
  );
}
