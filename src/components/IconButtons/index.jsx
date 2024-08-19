/* eslint-disable react/prop-types */
import deleteIcon from "../../assets/icons/remove.png";
import addIcon from "../../assets/icons/add.png";
import renameIcon from "../../assets/icons/update.png";

import { addAction, renameAction, deleteAction } from "../../constants";

import styles from "./tree.module.css";
import cStyles from "../../commonStyles.module.css";

export default function IconButton({ handleOpenModal }) {
  const icons = new Map([
    [addAction, addIcon],
    [renameAction, renameIcon],
    [deleteAction, deleteIcon],
  ]);
  const arrIcons = [...icons.entries()];

  return (
    <div className={styles.boxOpports}>
      {arrIcons.map(([action, icon]) => (
        <button
          key={action}
          className={cStyles.treeButton}
          type="button"
          onClick={() => handleOpenModal(action)}
        >
          <img className={styles.opports} src={icon} alt={action} />
        </button>
      ))}
    </div>
  );
}
