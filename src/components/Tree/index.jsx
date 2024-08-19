import { useEffect, useState, useContext } from "react";
import TreeNode from "../TreeNode";
import useApi from "../../Hooks/UseApi";
import styles from "../../commonStyles.module.css";
import TreeContext from "../../contexts/tree-contexts";
import { fetchData } from "../../utils/apiUtils";

function Tree() {
  const [focusItem, setFocusItem] = useState("");
  const { getItems } = useApi();
  const { tree, setError, setModal } = useContext(TreeContext);

  useEffect(() => {
    const cancelRequestPromise = fetchData(setModal, setError, getItems);
    return () => {
      if (typeof cancelRequestPromise === "function") {
        cancelRequestPromise();
      }
    };
  }, [getItems, setError, setModal]);

  return (
    <div>
      {tree.name && (
        <ul className={styles.treeList}>
          <TreeNode
            node={tree}
            focusItem={focusItem}
            setFocusItem={setFocusItem}
          />
        </ul>
      )}
    </div>
  );
}

export default Tree;
