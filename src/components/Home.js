import Hero from "./Hero";
import RandomMovie from "./RandomMovie";

const Home = ({movie}) => {
  return (
    <>
      <Hero text="Movie Browser" />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 my-5">
            <p className="lead">
              Welcome to my Movie Browser app, This is currently still under construction 
              but feel free to try it out by searching for a movie in the top right
            </p>
            <RandomMovie />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
