import coconutMediaLogo from "./assets/coconutmedia.png"; // Importing the logo image

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <img
            src={coconutMediaLogo}
            alt="Logo"
            style={styles.logoImage}
            onError={(e) => console.error("Error loading image:", e)}
          />
        </div>
        {/* <h1 style={styles.heading}>Coconut Media</h1>{" "} */}
        <nav style={styles.nav}>
          <ul style={styles.navList}>
            <li style={styles.navItem}>
              <a href="/" style={styles.navLink}>
                Home
              </a>
            </li>
            <li style={styles.navItem}>
              <a href="/signin" style={styles.navLink}>
                Sign In
              </a>
            </li>
            <li style={styles.navItem}>
              <a href="/signup" style={styles.navLink}>
                Sign Up
              </a>
            </li>
            <li style={styles.navItem}>
              <a href="/profile" style={styles.navLink}>
                Profile
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

const styles = {
  header: {
    background: "linear-gradient(to right, #6a0dad, #b87dfb)", // Purple gradient
    padding: "1rem 0",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  container: {
    width: "90%",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontFamily: "Arial, sans-serif",
  },
  logo: {
    maxWidth: "100px",
  },
  logoImage: {
    maxWidth: "80px",
    maxHeight: "60px",
    height: "auto",
  },
  heading: {
    color: "white",
    fontSize: "1.5rem",
    margin: "0 0 0 0.5rem",
    fontWeight: "bold", 
  },
  nav: {},
  navList: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
    display: "flex",
  },
  navItem: {
    marginLeft: "1rem",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "1rem",
  },
};

export default Header;
