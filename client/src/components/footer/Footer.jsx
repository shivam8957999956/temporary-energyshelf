import "./footer.css";

export default function Footer() {
  return (
    <div className="footer">
      Energy shelf | © 2021 EnergyShelf |
      <span className="footerTerms">
        {" "}
        Terms {"&"} Condition |<i class="footer-icon fab fa-twitter"></i>
        <i class="footer-icon fab fa-instagram"></i>
        <i class="footer-icon fab fa-facebook"></i>
        <i class="footer-icon fab fa-linkedin"></i>
      </span>
    </div>
  );
}
