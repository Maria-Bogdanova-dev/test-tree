import { useEffect, useState, useContext } from "react";
import TreeNode from "../TreeNode";
import useApi from "../../Hooks/UseApi";
import styles from "../../commonStyles.module.css";
import TreeContext from "../../contexts/tree-contexts";

function Tree() {
  const [focusItem, setFocusItem] = useState("");
  const { getItems } = useApi();
  const { tree, setError } = useContext(TreeContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cancelRequest = await getItems();
        return cancelRequest;
      } catch (error) {
        if (typeof setError === "function") {
          setError(error.message);
        }
      }
    };

    const cancelRequestPromise = fetchData();

    return () => {
      if (typeof cancelRequestPromise === "function") {
        cancelRequestPromise();
      }
    };
  }, [getItems, setError]);

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
