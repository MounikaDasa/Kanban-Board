import React, { useEffect, useState } from "react";
import {
  Calendar,
  CheckSquare,
  List,
  Tag,
  Trash,
  Type,
  X,
} from "react-feather";

import Modal from "../../Modal/Modal";
import Editable from "../../Editabled/Editable";

import "./CardInfo.css";

function CardInfo(props) {
  const colors = [
    "#a8193d",
    "#4fcc25",
    "#1ebffa",
    "#8da377",
    "#9975bd",
    "#cf61a1",
    "#240959",
  ];

  const [selectedColor, setSelectedColor] = useState();
  const [values, setValues] = useState({
    ...props.card,
  });

  const updateTag = (value) => {
    setValues({ ...values, tag: value });
  };

  const updateUserId = (value) => {
    setValues({ ...values, userId: value });
  };

  const updatePriority = (value) => {
    setValues({ ...values, priority: value });
  };

  const addLabel = (label) => {
    const index = values.labels.findIndex((item) => item.text === label.text);
    if (index > -1) return;

    setSelectedColor("");
    setValues({
      ...values,
      labels: [...values.labels, label],
    });
  };

  // ... (other functions)

  return (
    <Modal onClose={props.onClose}>
      <div className="cardinfo">
        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Tag />
            <p>Tag</p>
          </div>
          <Editable
            defaultValue={values.tag}
            text={values.tag}
            placeholder="Enter Tag"
            onSubmit={updateTag}
          />
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Type />
            <p>User ID</p>
          </div>
          <Editable
            defaultValue={values.userId}
            text={values.userId || "Add a User ID"}
            placeholder="Enter User ID"
            onSubmit={updateUserId}
          />
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Calendar />
            <p>Priority</p>
          </div>
          <Editable
            defaultValue={values.priority}
            text={values.priority || "Add a Priority"}
            placeholder="Enter Priority"
            onSubmit={updatePriority}
          />
        </div>

        {/* ... (other sections) */}

      </div>
    </Modal>
  );
}

export default CardInfo;
