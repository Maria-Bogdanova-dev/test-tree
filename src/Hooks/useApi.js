import { useCallback, useContext } from "react";
import axios from "axios";
import TreeContext from "../contexts/tree-contexts";
import { apiPaths } from "../constants";

const useApi = () => {
  const { setTree, setError } = useContext(TreeContext);

  const fetchData = useCallback(
    async (path) => {
      const controller = new AbortController();
      const signal = controller.signal;
      const config = {
        method: "POST",
        url: path,
        signal,
      };

      try {
        const response = await axios(config);

        return {
          data: response.data !== undefined ? response.data : null,
          cancelRequest: () => controller.abort(),
        };
      } catch (error) {
        console.error(`Fetch Data error: ${error.message}`);
        setError(error.message);
      }

      return { data: null, cancelRequest: () => {} };
    },
    [setError]
  );

  const getItems = useCallback(async () => {
    const { data, cancelRequest } = await fetchData(apiPaths.getItems);
    setTree(data || {});
    return cancelRequest;
  }, [fetchData, setError, setTree]);

  // ---------------------------------------------------------
  // добавить

  const addItem = useCallback(
    async (params) => {
      const { parentNodeId, nodeName } = params;
      await fetchData(apiPaths.addItem(parentNodeId, nodeName));
      const { data, cancelRequest } = await fetchData(apiPaths.getItems);

      setTree(data);
      setError(null);
      return cancelRequest;
    },
    [fetchData, setError, setTree]
  );

  // ======================================================
  // апдейт

  const updateNodeRecursive = useCallback((nodes, updatedNode) => {
    return nodes.map((node) => {
      if (node.id === updatedNode.id) {
        return {
          ...node,
          name: updatedNode.name,
        };
      }
      if (node.children) {
        return {
          ...node,
          children: updateNodeRecursive(node.children, updatedNode),
        };
      }
      return node;
    });
  }, []);

  const updateItem = useCallback(
    async (params) => {
      const { id, newNodeName } = params;
      const { cancelRequest } = await fetchData(
        apiPaths.updateItem(id, newNodeName)
      );
      setTree((prevTree) => ({
        ...prevTree,
        children: updateNodeRecursive(prevTree.children, {
          id,
          name: newNodeName,
        }),
      }));
      setError(null);
      return cancelRequest;
    },
    [fetchData, updateNodeRecursive, setError, setTree]
  );
  // ======================================================================
  // удаление
  const deleteNodeRecursive = useCallback((nodes, itemId) => {
    return nodes
      .map((node) => {
        if (node.children) {
          return {
            ...node,
            children: deleteNodeRecursive(node.children, itemId),
          };
        }
        return node;
      })
      .filter((node) => node.id !== itemId);
  }, []);

  const deleteItem = useCallback(
    async (params) => {
      const { id } = params;

      const { cancelRequest } = await fetchData(apiPaths.deleteItem(id));
      setTree((prevTree) => ({
        ...prevTree,
        children: deleteNodeRecursive(prevTree.children, id),
      }));
      setError(null);
      return cancelRequest;
    },
    [fetchData, deleteNodeRecursive, setError, setTree]
  );

  // -------------------------------------------------------------------------
  // возврат значений
  return {
    getItems,
    fetchData,
    addItem,
    updateItem,
    deleteItem,
  };
};

export default useApi;
