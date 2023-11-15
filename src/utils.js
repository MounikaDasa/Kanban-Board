// utils.js
export const fetchData = async () => {
    try {
      const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
      const data = await response.json();
  
      const tickets = data?.tickets || [];
      const users = data?.users || [];
  
      return { tickets, users };
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };
  