export const getUsers = () => {
  return `
    query MyQuery {
      users {
        nodes {
          username
          id
        }
      }
    }  
  `;
};
