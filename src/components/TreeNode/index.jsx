/* eslint-disable react/prop-types */
import { useState } from "react";
import rightArrow from "./rightArrow.png";
import downArrow from "./downArrow.png";
import remove from "./remove.png";
import add from "./add.png";
import update from "./update.png";

import style from "./TreeNode.module.css";

export default function TreeNode({
  node: { name, children, id },
  focusItem,
  setFocusItem,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const notEmpty = children.length > 0;

  function handleClick() {
    setIsOpen(!isOpen);
    setFocusItem(id);
  }

  return (
    <li>
      <div className={style.box}>
        <button className={style.smallBox} type="button" onClick={handleClick}>
          {!isOpen && notEmpty && (
            <img className={style.arrow} src={downArrow} alt="стрелка" />
          )}
          {isOpen && notEmpty && (
            <img className={style.arrow} src={rightArrow} alt="стрелка" />
          )}

          <span className={focusItem === id ? style.name : ""}>{name}</span>
        </button>

        {focusItem === id && (
          <div className={style.boxOpports}>
            <button>
              <img className={style.opports} src={add} alt="add" />
            </button>
            <button>
              <img className={style.opports} src={update} alt="update" />
            </button>
            <button>
              <img className={style.opports} src={remove} alt="remove" />
            </button>
          </div>
        )}
      </div>

      {notEmpty && isOpen && (
        <ul>
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
