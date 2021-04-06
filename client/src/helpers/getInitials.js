const getInitials = (firstName, lastName) => {
  const first = firstName && firstName[0].toUpperCase();
  const last = lastName && lastName[0].toUpperCase();

  return { first, last };
};

export default getInitials;
