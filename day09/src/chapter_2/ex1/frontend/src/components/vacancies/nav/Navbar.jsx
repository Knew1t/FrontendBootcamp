import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar_button">
        <img
          src="../../../../assets/journal-text.svg"
          className="navbar_img"
          alt="navbar vacancies icon"
        />
        <div className="navbar_button_text">Vacancies</div>
      </div>
      <div className="navbar_button">
        <img
          src="../../../../assets/journal-check.svg"
          className="navbar_img"
          alt="navbar my vacancies icon"
        />
        <div className="navbar_button_text">My vacancies</div>
      </div>
      <div className="navbar_button navbar_button_logout">
        <img
          src="../../../../assets/box-arrow-right.svg"
          className="navbar_img"
          alt="navbar logout icon"
        />
        <div className="navbar_button_text">Logout</div>
      </div>
    </div>
  );
}
