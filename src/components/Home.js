import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

const Home = () => {
  let history = useHistory();
  let data;

  const handleSubmit = e => {
    e.preventDefault();
		console.log('e:', data);
    history.push(`/timeline?timelineid=${data}`)
  };

  const handleChange = (e)=>{
  	data = e.target.value;
	};

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
					onChange={handleChange}
          type="text"
          name="timeline"
          id="timeline"
        />
      </form>

      <Button onClick={handleSubmit} type="primary">
        Go to your Timeline
      </Button>

    </div>
  );
};

export default Home;
