const PlayGround = () => {
  return (
    <div className="playground">
      <h1>Playground</h1>
      <div className="floating-bg">
        <div
          className="shape"
          style={{
            width: "120px",
            height: "120px",
            backgroundColor: "#ff6ec7",
            top: "30%",
            left: "10%",
          }}
        ></div>
        <div
          className="shape"
          style={{
            width: "80px",
            height: "80px",
            backgroundColor: "#7afcff",
            top: "70%",
            left: "60%",
          }}
        ></div>
        <div
          className="shape"
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "#fff35c",
            top: "40%",
            left: "80%",
          }}
        ></div>
      </div>
    </div>
  );
};

export default PlayGround;
