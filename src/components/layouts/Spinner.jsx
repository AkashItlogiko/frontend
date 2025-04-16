import { BeatLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full height of the viewport
      }}
    >
      <BeatLoader
        size={15}
        color="#4fa94d"
        aria-label="beat-loader"
        loading={true}
      />
    </div>
  );
};

export default Spinner;
