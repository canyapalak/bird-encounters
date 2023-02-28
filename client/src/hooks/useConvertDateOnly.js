import React from "react";

function useConvertDateOnly() {
  const convertDate = (dateAndTime) => {
    const date = new Date(dateAndTime).toLocaleDateString();
    return <>{date}</>;
  };
  return convertDate;
}

export default useConvertDateOnly;
