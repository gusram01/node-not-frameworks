const objDate = new Date();
const year = objDate.getFullYear();
const month = objDate.getMonth() + 1;
const day = objDate.getDate() - 5;
const today = `${year}-${month}-${day}`;

export { today };
