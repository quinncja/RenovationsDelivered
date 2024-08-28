import React, { useEffect, useState } from 'react';
import { testAPI } from 'utils/api';

function Jobcosting() {
  const [obj, setObj] = useState();

  useEffect(() => {
    const loadTest = async () => {
      const data = await testAPI();
      console.log(data);
      setObj(data);
    };
    loadTest();
  }, []);

  return (
    <>
      <h1>Jobcosting</h1>
      <br />
      {obj ? <p>{obj[0].cmpnme}</p> : ""}
    </>
  );
}

export default Jobcosting;
