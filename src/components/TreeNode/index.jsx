/* eslint-disable react/prop-types */
import { useState, useContext } from "react";

import ModalBox from "../ModalBox";

import rightArrow from "../../assets/icons/rightArrow.png";
import downArrow from "../../assets/icons/downArrow.png";

import styles from "./TreeNode.module.css";
import cStyles from "../../commonStyles.module.css";
import IconButton from "../IconButtons";
import TreeContext from "../../contexts/tree-contexts";

export default function TreeNode({
  node: { name, children, id },
  focusItem,
  setFocusItem,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [typeOfModal, setTypeOfModal] = useState("");
  const notEmpty = children.length > 0;
  const { modal, setModal } = useContext(TreeContext);
  function handleOpenItem() {
    setIsOpen(!isOpen);
    setFocusItem(id);
  }

  function handleOpenModal(action) {
    setTypeOfModal(action);
    setModal(true);
  }

  return (
    <li className={styles.treeLi}>
      <div className={styles.box}>
        <button
          className={`${cStyles.treeButton} ${styles.smallBox}`}
          type="button"
          onClick={handleOpenItem}
        >
          {!isOpen && notEmpty && (
            <img className={styles.arrow} src={downArrow} alt="closeList" />
          )}
          {isOpen && notEmpty && (
            <img className={styles.arrow} src={rightArrow} alt="openList" />
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
          <>
            <IconButton handleOpenModal={handleOpenModal} />
            {modal && (
              <ModalBox
                open={modal}
                setModal={setModal}
                typeOfModal={typeOfModal}
                nodeName={name}
                nodeId={id}
                setTypeOfModal={setTypeOfModal}
              />
            )}
          </>
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
