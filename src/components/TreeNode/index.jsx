/* eslint-disable react/prop-types */
import { useState } from "react";

import ModalBox from "../ModalBox";

import rightArrow from "./rightArrow.png";
import downArrow from "./downArrow.png";
import remove from "./remove.png";
import add from "./add.png";
import update from "./update.png";

import styles from "./TreeNode.module.css";
import cStyles from "../../commonStyles.module.css";

export default function TreeNode({
  node: { name, children, id },
  focusItem,
  setFocusItem,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [kindModal, setKindModal] = useState("");
  const notEmpty = children.length > 0;

  function handleOpenItem() {
    setIsOpen(!isOpen);
    setFocusItem(id);
  }

  function handleOpenModal(action) {
    setKindModal(action);
    setModal(true);
  }

  return (
    <li className={styles.treeLi}>
      <div className={styles.box}>
        <button
          className={`${styles.treeButton} ${styles.smallBox}`}
          type="button"
          onClick={handleOpenItem}
        >
          {!isOpen && notEmpty && (
            <img className={styles.arrow} src={downArrow} alt="стрелка" />
          )}
          {isOpen && notEmpty && (
            <img className={styles.arrow} src={rightArrow} alt="стрелка" />
          )}

          <span
            className={
              focusItem === id
                ? `${styles.nameBackground} ${styles.name}`
                : styles.name
            }
          >
            {name}
          </span>
        </button>

        {focusItem === id && (
          <div className={styles.boxOpports}>
            <button
              className={styles.treeButton}
              type="button"
              onClick={() => handleOpenModal("Add")}
            >
              <img className={styles.opports} src={add} alt="add" />
            </button>
            <button
              className={styles.treeButton}
              type="button"
              onClick={() => handleOpenModal("Rename")}
            >
              <img className={styles.opports} src={update} alt="update" />
            </button>
            <button
              className={styles.treeButton}
              type="button"
              onClick={() => handleOpenModal("Delete")}
            >
              <img className={styles.opports} src={remove} alt="remove" />
            </button>
            <ModalBox open={modal} kindModal={kindModal} setModal={setModal} />
          </div>
        )}
      </div>

      {notEmpty && isOpen && (
        <ul className={cStyles.treeList}>
          {children.map((el) => {
            return (
              <TreeNode
                node={el}
                key={el.id}
                focusItem={focusItem}
                setFocusItem={setFocusItem}
              />
            );
          })}
        </ul>
      )}
    </li>
  );
}
