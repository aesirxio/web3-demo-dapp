import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { Collapse } from "react-bootstrap";

function SubMenu({ iconRef, subMenu }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        ref={iconRef}
        className="arrow-icon position-absolute end-0 top-50 translate-middle-y z-1 cursor-pointer py-3 px-2 p-lg-0 d-none d-lg-block"
      >
        <FontAwesomeIcon
          className="text-success ms-2 align-baseline "
          icon={faChevronDown}
          height={12}
          width={12}
        />
      </div>
      <div
        ref={iconRef}
        className="arrow-icon position-absolute end-0 top-50 translate-middle-y z-1 cursor-pointer py-3 px-2 p-lg-0 d-block d-lg-none"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
      >
        {open ? (
          <FontAwesomeIcon
            className="text-success ms-2 align-baseline "
            icon={faChevronUp}
            height={12}
            width={12}
          />
        ) : (
          <FontAwesomeIcon
            className="text-success ms-2 align-baseline "
            icon={faChevronDown}
            height={12}
            width={12}
          />
        )}
      </div>
      <Collapse in={open}>
        <ul
          className={`sub-menu list-unstyled position-lg-absolute start-0 top-100 bg-white end-0 shadow-none shadow-lg-sm opacity-lg-0`}
        >
          {subMenu.map((subItem, subIndex) => {
            return (
              <li key={subIndex}>
                <Link href={subItem.href} passHref>
                  <a
                    target={subItem.target ?? null}
                    rel={subItem.target ? "noopener noreferrer" : null}
                    className={
                      (subIndex !== 0 ? "border-top " : " border-top border-top-lg-0 ") +
                      "nav-link position-relative py-3 px-3 text-uppercase fw-semibold  ws-nowrap ws-lg-normal"
                    }
                  >
                    {subItem.title}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </Collapse>
    </>
  );
}

export default SubMenu;
