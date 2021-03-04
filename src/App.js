import gsap from "gsap";
import { Draggable } from "gsap/all";
import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const arr = [...new Array(10)].map((arr, i) => (arr = i));
  const [index, setIndex] = useState(0);

  gsap.registerPlugin(Draggable);
  useEffect(() => {
    const colors = ["#f38630", "#6fb936", "#ccc", "#6fb936"];
    gsap.set(".box", {
      backgroundColor: (i) => colors[i % colors.length],
    });
  }, []);

  const nextButtonClick = () => {
    if (!gsap.isTweening(".carousel")) {
      if (index === arr.length - 1) return;
      gsap.to(".carousel", {
        duration: 0.25,
        xPercent: (-100 / arr.length) * (index + 1),
        onComplete: () => setIndex(index + 1),
      });
    }
  };

  const prevButtonClick = () => {
    if (!gsap.isTweening(".carousel")) {
      if (index === 0) return;
      gsap.to(".carousel", {
        duration: 0.25,
        ease: "Linear.easeNone",
        xPercent: (-100 / arr.length) * (index - 1),
        onComplete: () => setIndex(index - 1),
      });
    }
  };

  return (
    <>
      <div className="container">
        <div className="carousel" style={{ width: `${100 * arr.length}vw` }}>
          {arr.map((item) => (
            <div className="box" key={item}>
              {item}
            </div>
          ))}
        </div>

        <div className="controls">
          <button
            disabled={index === arr.length - 1}
            id="nextButton"
            onClick={nextButtonClick}
          >
            Next
          </button>
          <button
            disabled={index === 0}
            id="prevButton"
            onClick={prevButtonClick}
          >
            Previous
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
