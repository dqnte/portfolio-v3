import ArrowUpward from "@mui/icons-material/ArrowUpward";

export default function ScrollTop() {
  return (
    <div className={"ScrollTop"}>
      <button
        className={"ScrollTop__button"}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <ArrowUpward />
      </button>
    </div>
  );
}
