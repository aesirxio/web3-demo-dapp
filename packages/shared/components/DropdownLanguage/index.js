import React, { useState } from "react";
import { useRouter } from "next/router";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "next/image";
import Icon_Globe from "@styles/images/icon_globe.png";
const LanguageComponent = () => {
  const data = [
    {
      id: "en",
      name: "English",
    },
    // {
    //   id: "dk",
    //   name: "Danish",
    // },
    // {
    //   id: 3,
    //   name: "Spaish",
    // },
    // {
    //   id: 4,
    //   name: "Ukrainian",
    // },
    {
      id: "vi",
      name: "Vietnamese",
    },
  ];
  const router = useRouter();
  const [value, setValue] = useState(data.filter((v) => v.id == router?.locale)?.[0]?.name ?? "");
  const handleSelect = (e) => {
    setValue(e);
  };
  const handleClick = (e) => {
    router.push(router?.asPath, router?.asPath, { locale: e?.target?.id });
  };
  return (
    <div className="mt-4 w-36">
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle
          variant="light"
          className={`d-flex border  align-items-center justify-content-between text-primary py-2 px-18px w-186px h-50px text-success`}
        >
          <div className="d-flex align-items-center ">
            <Image src={Icon_Globe} width="16" height="16" alt="Icon_Globe" />
            <span className="mx-2 fs-6 font-opensans text-primary">{value}</span>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {data?.map((value) => {
            return (
              <Dropdown.Item
                key={value.id}
                id={value.id}
                eventKey={value.name}
                onClick={(e) => {
                  handleClick(e);
                }}
              >
                {value.name}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
export default LanguageComponent;
