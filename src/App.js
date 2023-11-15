import React, { useEffect, useState } from "react";
import { fetchData } from './utils';

import Board from "./Components/Board/Board";
import CustomDropdown from "./Components/CustomDropdown";
import Editable from "./Components/Editabled/Editable";



import "./App.css";

function App() {
  const [boards, setBoards] = useState(
     []
  );
 

  const [targetCard, setTargetCard] = useState({
    bid: "",
    cid: "",
  });
  
  const handleGroupingChange = (value) => {
    setSelectedGrouping(value);
  };

  const handleOrderingChange = (value) => {
    setSelectedOrdering(value);
  };

  const addboardHandler = (name) => {
    const tempBoards = [...boards];
    tempBoards.push({
      id: Date.now() + Math.random() * 2,
      title: name,
      cards: [],
    });
    setBoards(tempBoards);
  };
  

  const removeBoard = (id) => {
    
    const index = boards.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards.splice(index, 1);
    setBoards(tempBoards);
  };

  const addCardHandler = (id, title) => {
    console.log(id, title);
    const index = boards.findIndex((item) => item.id === id);
  
    if (index < 0) {
      // Board with the given id is not found, add a new card directly to groupedUserTickets
    
      const newCard = {
        id: Date.now() + Math.random() * 2,
        title,
        
      };
  
      setGroupedUserTickets((prevGrouped) => {
        console.log("Previous Grouped:", prevGrouped[id]);
        prevGrouped[id]=[...prevGrouped[id],newCard]
        
      
        return {
          ...prevGrouped,
          // Your state update logic here
        };
      });
    
    } else {
      // Board with the given id is found, add a new card to the existing board
      const tempBoards = [...boards];
      tempBoards[index].cards.push({
        id: Date.now() + Math.random() * 2,
        title,
        labels: [],
        date: "",
        tasks: [],
      });
  
      setBoards(tempBoards);
    }
  };
  

      const removeCard = (bid, cid) => {
        
        const index = boards.findIndex((item) => item.id === bid);
      
        if (index < 0) {
          // Board with the given id is not found, remove the card from groupedUserTickets
          console.log("Board not found, removing from groupedUserTickets");
      
          setGroupedUserTickets((prevGrouped) => {
            const updatedGrouped = { ...prevGrouped };
      
            // Check if the board exists in groupedUserTickets
            if (updatedGrouped[bid]) {
              // Filter out the card with the matching cid
              updatedGrouped[bid] = updatedGrouped[bid].filter((card) => card.id !== cid);
            }
      
            return updatedGrouped;
          });
      
          return;
        }
      
        // Board is found, remove the card from the board in boards
        const tempBoards = [...boards];
        const cards = tempBoards[index].cards;
      
        const cardIndex = cards.findIndex((item) => item.id === cid);
        if (cardIndex < 0) return;
      
        cards.splice(cardIndex, 1);
        setBoards(tempBoards);
      };
  

  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupedUserTickets, setGroupedUserTickets] = useState({
    'Backlog': [],
    'Todo': [],
    'In progress': [],
    'Done': [],
    'Cancelled': [],
  });
  const [selectedGrouping, setSelectedGrouping] = useState('');
  const [selectedOrdering, setSelectedOrdering] = useState('');

  useEffect(() => {
  fetchData().then(({ tickets, users }) => {
  
    setTickets(tickets);
    setUsers(users);

    // Group tickets dynamically based on selected grouping
    let groupedTickets = {};
    if (selectedGrouping === 'status') {
      // Group by status
      groupedTickets = tickets.reduce((grouped, ticket) => {
        const status = ticket.status;
        if (!grouped[status]) {
          grouped[status] = [];
        }
        grouped[status].push(ticket);
        return grouped;
      }, {});
    } else if (selectedGrouping === 'priority') {
      // Mapping of priority values to board names
      const priorityBoardNames = {
        0: 'No Priority',
        1: 'Low',
        2: 'Medium',
        3: 'High',
        4: 'Urgent',
      };
    
      // Group by priority with mapped board names
      groupedTickets = tickets.reduce((grouped, ticket) => {
        const priority = ticket.priority;
        const boardName = priorityBoardNames[priority];
        if (!grouped[boardName]) {
          grouped[boardName] = [];
        }
        grouped[boardName].push(ticket);
        return grouped;
      }, {});
    
    
    } else if (selectedGrouping === 'user') {
      console.log(users);
    
      groupedTickets = tickets.reduce((grouped, ticket) => {
        const userId = ticket.userId;
        const user = users.find((user) => user.id === userId);
    
        if (user) {
          const userName = user.name;
    
          if (!grouped[userName]) {
            grouped[userName] = [];
          }
    
          grouped[userName].push(ticket);
        }
    
        return grouped;
      }, {});
    }
    

    setGroupedUserTickets(groupedTickets);
    

  
  });
}, [selectedGrouping]);



  const dragEnded = (bid, cid) => {
   
    let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;
    s_boardIndex = boards.findIndex((item) => item.id === bid);
    if (s_boardIndex < 0) {
      const sourceCardIndex = groupedUserTickets[bid]?.findIndex(
        (item) => item.id === cid
      );
    
      const targetCardIndex = groupedUserTickets[targetCard.bid]?.findIndex(
        (item) => item.id === targetCard.cid
      );
      
  
      // Ensure sourceCardIndex and targetCardIndex are valid before proceeding
      if (sourceCardIndex < 0 || targetCardIndex < 0) {
        return;
      }
  
      const sourceBoards = [...groupedUserTickets[bid]];
      const targetBoards = [...groupedUserTickets[targetCard.bid]];
      const sourceCard = sourceBoards[sourceCardIndex];
  
      sourceBoards.splice(sourceCardIndex, 1);
      targetBoards.splice(targetCardIndex, 0, sourceCard);
  
      // Update the state to trigger re-render
      setGroupedUserTickets((prevGrouped) => ({
        ...prevGrouped,
        [bid]: sourceBoards,
        [targetCard.bid]: targetBoards,
      }));
  
      setTargetCard({
        bid: "",
        cid: "",
      });
  
      return;
    }

    s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
      (item) => item.id === cid
    );
    if (s_cardIndex < 0) return;

    t_boardIndex = boards.findIndex((item) => item.id === targetCard.bid);
    if (t_boardIndex < 0) return;

    t_cardIndex = boards[t_boardIndex]?.cards?.findIndex(
      (item) => item.id === targetCard.cid
    );
    if (t_cardIndex < 0) return;

    const tempBoards = [...boards];
    const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
    tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
    tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
    setBoards(tempBoards);

    setTargetCard({
      bid: "",
      cid: "",
    });
  };

  const dragEntered = (bid, cid) => {
    if (targetCard.cid === cid) return;
    setTargetCard({
      bid,
      cid,
    });
    console.log("drag")
  };

  const updateCard = (bid, cid, card) => {
    console.log(card)
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) {
      // Board with the given id is not found, update the card directly in groupedUserTickets
      const sourceCardIndex = groupedUserTickets[bid]?.findIndex(
        (item) => item.id === cid
      );
  
      // Ensure sourceCardIndex is valid before proceeding
      if (sourceCardIndex < 0) {
        return;
      }
  
      const sourceBoards = [...groupedUserTickets[bid]];
      sourceBoards[sourceCardIndex] = card;
  
      // Update the state to trigger re-render
      setGroupedUserTickets((prevGrouped) => ({
        ...prevGrouped,
        [bid]: sourceBoards,
      }));
  
      return;
    }
  
    // Board with the given id is found, update the card in the existing board
    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;
  
    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) {
      return;
    }
  
    tempBoards[index].cards[cardIndex] = card;
  
    // Update the state to trigger re-render
    setBoards(tempBoards);
  };
  

  useEffect(() => {
    localStorage.setItem("prac-kanban", JSON.stringify(boards));
  }, [boards]);
  
  

  return (
    <div className="app">
      <div className="app_nav">
      
        <h1>Kanban Board</h1>
        <CustomDropdown
          onGroupingChange={handleGroupingChange}
          onOrderingChange={handleOrderingChange}
        />          
          <div>
            <h3>Selected Grouping: {selectedGrouping}</h3>
          
          </div>
       
       
        <div className="app_boards_container">
          <div className="app_boards">
            {boards.map((item) => (
              <Board
                key={item.id}
                board={item}
                addCard={addCardHandler}
                removeBoard={() => removeBoard(item.id)}
                removeCard={removeCard}
                dragEnded={dragEnded}
                dragEntered={dragEntered}
                updateCard={updateCard}
                addBoard={addboardHandler}
              />
            ))}            
            
            {Object.keys(groupedUserTickets).map((boardKey) => (
              <Board
                key={boardKey}
                board={{
                  id: boardKey,
                  title: boardKey,
                  cards: groupedUserTickets[boardKey],
                }}
                addCard={addCardHandler}
                removeBoard={() => removeBoard(boardKey)}
                removeCard={removeCard}
                dragEnded={dragEnded}
                dragEntered={dragEntered}
                updateCard={updateCard}
                addBoard={addboardHandler}
              />
            ))}
            <div className="app_boards_last">
            <Editable
              displayClass="app_boards_add-board"
              editClass="app_boards_add-board_edit"
              placeholder="Enter Board Name"
              text="Add Board"
              buttonText="Add Board"
              onSubmit={addboardHandler}
            />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
