const API_BASE_URL = "https://test.vmarmysh.com/api.user.tree.";

export const apiPaths = {
  getItems: `${API_BASE_URL}get?treeName=GUID`,

  addItem: (parentNodeId, nodeName) =>
    `${API_BASE_URL}node.create?treeName=GUID&parentNodeId=${parentNodeId}&nodeName=${nodeName}`,

  updateItem: (id, newNodeName) =>
    `${API_BASE_URL}node.rename?treeName=GUID&nodeId=${id}&newNodeName=${newNodeName}`,

  deleteItem: (id) => `${API_BASE_URL}node.delete?treeName=GUID&nodeId=${id}`,
};

export const addAction = "Add";
export const renameAction = "Rename";
export const deleteAction = "Delete";
