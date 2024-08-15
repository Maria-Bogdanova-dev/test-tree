import { useEffect, useState } from "react";
import TreeNode from "../TreeNode";
import "./App.css";

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
      console.log(111, res);
    })();
  }, []);
  // console.log(222, focusItem);

  return (
    <>
      {tree.name && (
        <ul>
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
