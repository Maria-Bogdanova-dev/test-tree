import { useEffect, useState } from "react";
import TreeNode from "../TreeNode";
import useApi from "../../Hooks/UseApi";
import styles from "../../commonStyles.module.css";

function Tree() {
  const [focusItem, setFocusItem] = useState("");
  const { tree, getItems } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      const cancelRequest = await getItems();
      return cancelRequest;
    };

    const cancelRequestPromise = fetchData();

    return () => {
      if (typeof cancelRequestPromise === "function") {
        cancelRequestPromise();
      }
    };
  }, [getItems]);
  console.log(111, tree);

  return (
    <>
      {tree.name && (
        <ul className={styles.treeList}>
          <TreeNode
            node={tree}
            focusItem={focusItem}
            setFocusItem={setFocusItem}
          />
        </ul>
      )}
    </>
  );
}

export default Tree;
