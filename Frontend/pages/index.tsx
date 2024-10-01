import { Container, Row, Col } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ProjectItem from "../components/ProjectItem/ProjectItem";
import Testimonials from "../components/Testimonials/Testimonials";
import imgdata from "../utils/imgdata";
import testimonialdata from "../utils/testimonialdata.json";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import styles from "../styles/Home.module.css"; // Import the CSS module

// Styled Typography for section headings
const SectionTitle = styled(Typography)(({ theme }) => ({
  color: "#323232",
  fontSize: "2rem",
  fontWeight: "bold",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  textAlign: "center",
  marginBottom: theme.spacing(4),
  padding: theme.spacing(2),
  background: "linear-gradient(45deg, #719E37, #F7F7F9)",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

// Styled paragraph for service description
const ServiceDescription = styled(Typography)(({ theme }) => ({
  color: "#555",
  fontSize: "1.1rem",
  textAlign: "center",
  marginBottom: theme.spacing(4),
  padding: theme.spacing(0, 2),
}));

export default function Home(props: any) {
  return (
    <>
      <Container fluid className="p-0">
        {/* Image and Video Overlay Section */}
        <div className={styles.mediaContainer}>
          <img src="/images/sofa.jpg" alt="Sofa Image" className={styles.image} />
          <video
            className={styles.video}
            autoPlay
            loop
            muted
            playsInline
            src="/videos/Color Palette.mp4"
          />
        </div>

        {/* Our Services Section */}
        <Container fluid className="py-5">
          <SectionTitle variant="h2">Our Services</SectionTitle>
          <ServiceDescription variant="body1">
            We specialize in transforming the look and feel of homes, offices, and buildings 
            with our top-quality painting services. Whether it’s the exterior of a home that 
            needs a fresh coat to enhance curb appeal, or an interior space that requires 
            vibrant colors and precision finishes, we have you covered. From large-scale exterior 
            painting projects on buildings to detailed interior work in living rooms, kitchens, and 
            offices, our team delivers excellence with every stroke.
          </ServiceDescription>

          {/* Exterior Painting Service */}
          <SectionTitle variant="h3">Exterior Painting</SectionTitle>
          <Row className={styles.servicesRow}>
            <Col md={6}>
              <img
                src="/images/home-pic.jpg"
                alt="Exterior Painting"
                className={styles.serviceImage}
              />
            </Col>
            <Col md={6} className="d-flex align-items-center justify-content-center">
              <video
                className={styles.serviceVideo}
                autoPlay
                loop
                muted
                playsInline
                src="/videos/boy is painting a house with paint roller.mp4"
              />
            </Col>
          </Row>

          {/* Interior Painting Service */}
          <SectionTitle variant="h3">Interior Painting</SectionTitle>
          <Row className={styles.servicesRow}>
            <Col md={6}>
              <video
                className={styles.serviceVideo}
                autoPlay
                loop
                muted
                playsInline
                src="/videos/Color Painting Wall Service.mp4"
              />
            </Col>
            <Col md={6} className="d-flex align-items-center justify-content-center">
              <img
                src="/images/light.png"
                alt="Interior Painting"
                className={styles.serviceImage}
              />
            </Col>
          </Row>
        </Container>

        {/* Projects Section */}
        <Container fluid>
          <SectionTitle variant="h1">Our Projects</SectionTitle>
          <Row lg={1} className="justify-content-center">
            {imgdata.map((img) => (
              <ProjectItem key={img.key} title={img.title} img={img.img} />
            ))}
          </Row>
        </Container>

        {/* Testimonials Section */}
        <Testimonials testimonialData={testimonialdata} />
      </Container>
    </>
  );
}
