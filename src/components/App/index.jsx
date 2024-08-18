import { useEffect, useState } from "react";
import TreeNode from "../TreeNode";
import styles from "../../commonStyles.module.css";

function App() {
  const [tree, setTree] = useState({});
  const [focusItem, setFocusItem] = useState("");

  useEffect(() => {
    (async function () {
      let res = await fetch(
        "https://test.vmarmysh.com/api.user.tree.get?treeName=GUID"
      );
      res = await res.json();
      setTree(res);
    })();
  }, []);

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
export default App;
