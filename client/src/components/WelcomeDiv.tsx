import "../main.css";

export default function WelcomeDive({ text }: { text: string }) {
  return (
    <div className="d-flex align-items-center justify-content-center welcome-div">
      <p className="fs-1 text-white fw-bolder">{text}</p>
    </div>
  );
}
