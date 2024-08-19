import { useState } from "react";

import Tree from "../Tree";
import TreeContext from "../../contexts/tree-contexts";

function App() {
  const [tree, setTree] = useState({});
  const [error, setError] = useState(null);

  return (
    <TreeContext.Provider value={{ tree, setTree, error, setError }}>
      <Tree />;
    </TreeContext.Provider>
  );
}
export default App;
