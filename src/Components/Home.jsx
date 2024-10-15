import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <div className="button-container">
        <div className="button">
          <Link to="/crypto">ENTER CRYPTO ➔ </Link>
        </div>
        <div className="button">
          <Link to="/stocks">ENTER STOCKS ➔ </Link>
        </div>
        <div className="button">ENTER PORTFOLIO ➔</div>
      </div>
    </div>
  );
};

export default Home;
