import React, { useEffect, useState } from "react";

function HelloWorld(props) {
  const [greeting, setGreeting] = useState(props.greeting);

  console.log(greeting);

  return <div className="text-xl">{greeting}</div>;
}

export default HelloWorld;
