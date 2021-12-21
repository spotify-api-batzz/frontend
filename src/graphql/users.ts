export const getUsers = () => {
  return `
    query MyQuery {
      allUsers {
        nodes {
          username
          id
        }
      }
    }  
  `;
};
