// Board.js

import React, { useState, useEffect } from "react";
import { MoreHorizontal } from "react-feather";

import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import Editable from "../Editabled/Editable";
import AddIcon from '@mui/icons-material/Add';
import "./Board.css";


function Board(props) {
  const [showDropdown, setShowDropdown] = useState(false);



  return (
    <div className="board">
      <div className="board_header">
        <p className="board_header_title" style={{margin:20}}>
          {props.board?.title}
          <span>{props.board?.cards?.length || 0}</span>
        </p>
        
         <Editable
          text=<AddIcon />
          placeholder="Enter Card Title"
          displayClass=""
          editClass=""
          onSubmit={(value) => props.addCard(props.board?.id, value)}
          
        />
     
        <div
          className="board_header_title_more"
          onClick={() => setShowDropdown(true)}
        >
          {showDropdown && (
            <Dropdown
              class="board_dropdown"
              onClose={() => setShowDropdown(false)}
            >
              <p onClick={() => props.removeBoard()}>Delete Board</p>
            </Dropdown>
          )}
        </div>
      </div>
      <div className="board_cards custom-scroll">
        {props.board?.cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            boardId={props.board.id}
            removeCard={props.removeCard}
            dragEntered={props.dragEntered}
            dragEnded={props.dragEnded}
            updateCard={props.updateCard}
            draggable={true} // Set draggable to true for each Card
          />
        ))}
       
      </div>
    </div>
  );
}

export default Board;
