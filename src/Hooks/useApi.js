import { useState, useCallback } from "react";
import axios from "axios";
import { apiPaths } from "../constants";

const useApi = () => {
  const [tree, setTree] = useState({});
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (path) => {
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
      if (error.name === "CanceledError") {
        console.log("Request canceled");
      } else {
        console.error(
          `Fetch Data error! Status: ${error.response?.status || "Unknown"}`,
          error.message
        );
        setError(error.message);
      }

      return { data: null, cancelRequest: () => {} };
    }
  }, []);

  const getItems = useCallback(async () => {
    const { data, cancelRequest } = await fetchData(apiPaths.getItems);
    setTree(data || {});
    return cancelRequest;
  }, [fetchData]);

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
    [fetchData]
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
    [fetchData, updateNodeRecursive]
  );
  // ======================================================================
  // удаление
  const deleteNodeRecursive = useCallback((nodes, itemId) => {
    console.log(999, nodes, itemId);
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
      console.log(888, tree);

      const { cancelRequest } = await fetchData(apiPaths.deleteItem(id));
      setTree((prevTree) => ({
        ...prevTree,
        children: deleteNodeRecursive(prevTree.children, id),
      }));
      setError(null);
      return cancelRequest;
    },
    [fetchData, deleteNodeRecursive]
  );

  // -------------------------------------------------------------------------
  // возврат значений
  return {
    tree,
    getItems,
    fetchData,
    addItem,
    updateItem,
    deleteItem,
    error,
    setError,
  };
};

export default useApi;
