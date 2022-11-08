import { Link } from 'react-router-dom';

function Main() {
  return (
    <>
      <h2>MAIN</h2>
      <Link to="1">Board 1</Link>
      <Link to="2">Board 2</Link>
      <Link to="3">Board 3</Link>
    </>
  );
}

export default Main;
