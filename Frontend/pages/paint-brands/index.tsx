// import React, { useEffect, useState } from "react";
// import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
// import { useRouter } from "next/navigation";
// import { paints } from "../../public/paints";
// import { FaCheckCircle } from "react-icons/fa"; // For tick icon

// const colorCategories = [
//   { name: "Red", key: "red" },
//   { name: "Orange", key: "orange" },
//   { name: "Yellow", key: "yellow" },
//   { name: "Green", key: "green" },
//   { name: "Blue", key: "blue" },
//   { name: "Purple", key: "purple" },
//   { name: "Neutral", key: "neutral" },
//   { name: "White", key: "white" },
// ];

// const PaintSelectionPage = () => {
//   const [selectedCategory, setSelectedCategory] = useState<string>("red");
//   const [selectedColors, setselectedColors] = useState<any[]>([]);
//   const [companyPaints, setCompanyPaints] = useState<any>(null);
//   const [selectedCompany, setSelectedCompany] = useState<string>("");

//   const router = useRouter();

//   // Set default company on load
//   useEffect(() => {
//     if (paints.length > 0) {
//       const firstCompany = paints[0];
//       setSelectedCompany(firstCompany.companyName);
//       setCompanyPaints(firstCompany.paints);
//     }
//   }, []);

//   // Handle company selection change
//   const handleCompanySelection = (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     const selectedCompanyName = event.target.value;
//     setSelectedCompany(selectedCompanyName);

//     const company = paints.find(
//       (company) => company.companyName === selectedCompanyName
//     );
//     if (company) {
//       setCompanyPaints(company.paints);
//     } else {
//       console.error("Company not found");
//     }
//   };

//   if (!companyPaints) {
//     return <div>Loading...</div>;
//   }

//   // Handle paint selection
//   const handlePaintSelection = (paint: any) => {
//     if (selectedColors.some((p) => p.code === paint.code)) {
//       setselectedColors(selectedColors.filter((p) => p.code !== paint.code));
//     } else {
//       setselectedColors([...selectedColors, paint]);
//     }
//   };

//   // Handle category selection
//   const handleCategorySelection = (category: string) => {
//     setSelectedCategory(category);
//   };

//   // Handle next button click
//   const handleNext = () => {
//     router.push("/nextPage");
//   };

//   const renderPaints = () => {
//     return companyPaints[selectedCategory]?.map((paint: any, index: number) => (
//       <Col key={index} xs={12} md={6} lg={3} className="mb-4">
//         <Card
//           className={`p-2 paint-card position-relative ${
//             selectedColors.some((p) => p.code === paint.code) ? "selected" : ""
//           }`}
//           onClick={() => handlePaintSelection(paint)}
//         >
//           <div
//             style={{
//               backgroundColor: paint.hex,
//               height: "100px",
//               width: "100%",
//               borderRadius: "8px",
//             }}
//           ></div>
//           <div className="mt-2 text-center">
//             <strong>{paint.name}</strong>
//             <br />
//             {paint.code}
//           </div>

//           {/* Show tick on selected paints */}
//           {selectedColors.some((p) => p.code === paint.code) && (
//             <FaCheckCircle
//               size={24}
//               color="black"
//               style={{
//                 position: "absolute",
//                 top: "15px",
//                 right: "15px",
//               }}
//             />
//           )}
//         </Card>
//       </Col>
//     ));
//   };

//   return (
//     <Container fluid className="paint-selection-page">
//       <Row>
//         {/* Main Paints Grid that scrolls with the page */}
//         <Col xs={12} className="p-3">
//           <Row className="mb-4 align-items-center">
//             <Col xs={8}>
//               <h1 className="fw-bold">Browse Paint Colors</h1>
//             </Col>
//             <Col xs={4}>
//               {/* Dropdown for selecting company */}
//               <Form.Group controlId="companySelect">
//                 <Form.Label className="fw-bold">Select Company</Form.Label>
//                 <Form.Control
//                   as="select"
//                   value={selectedCompany}
//                   onChange={handleCompanySelection}
//                 >
//                   {paints.map((company, index) => (
//                     <option key={index} value={company.companyName}>
//                       {company.companyName}
//                     </option>
//                   ))}
//                 </Form.Control>
//               </Form.Group>
//             </Col>
//           </Row>

//           {/* Color Categories */}
//           <Row className="mb-4">
//             {colorCategories.map((category) => (
//               <Col key={category.key} className="mb-3">
//                 <Button
//                   variant={selectedCategory === category.key ? "dark" : "light"}
//                   onClick={() => handleCategorySelection(category.key)}
//                   className="w-full"
//                 >
//                   {category.name}
//                 </Button>
//               </Col>
//             ))}
//           </Row>

//           {/* Paint Grid */}
//           <Row>{renderPaints()}</Row>
//         </Col>
//       </Row>

//       {/* Custom Scrollbar CSS */}
//       <style jsx>{`
//         .paint-selection-page {
//           overflow-y: auto;
//           height: 100%;
//         }
//         .custom-scrollbar {
//           scrollbar-width: thin;
//           scrollbar-color: #007bff #e0e0e0;
//         }

//         .custom-scrollbar::-webkit-scrollbar {
//           width: 10px;
//         }

//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #e0e0e0;
//         }

//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background-color: #007bff;
//           border-radius: 20px;
//           border: 3px solid #e0e0e0;
//         }
//       `}</style>
//     </Container>
//   );
// };

// export default PaintSelectionPage;

import React, { useEffect, useState } from "react";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { paints } from "../../public/paints";
import { FaCheckCircle } from "react-icons/fa"; // For tick icon
import { useColorContext } from "../../contexts/ColorContext";

const colorCategories = [
  { name: "Red", key: "red" },
  { name: "Orange", key: "orange" },
  { name: "Yellow", key: "yellow" },
  { name: "Green", key: "green" },
  { name: "Blue", key: "blue" },
  { name: "Purple", key: "purple" },
  { name: "Neutral", key: "neutral" },
  { name: "White", key: "white" },
];

const PaintSelectionPage = ({handleCloseColorModal}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("red");
  const [companyPaints, setCompanyPaints] = useState<any>(null);
  const [selectedCompany, setSelectedCompany] = useState<string>("");

  const router = useRouter();

  const { selectedColors, addColor, removeColor } = useColorContext(); // Use the context

  // Set default company on load
  useEffect(() => {
    if (paints.length > 0) {
      const firstCompany = paints[0];
      setSelectedCompany(firstCompany.companyName);
      setCompanyPaints(firstCompany.paints);
    }
  }, []);

  // Handle company selection change
  const handleCompanySelection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCompanyName = event.target.value;
    setSelectedCompany(selectedCompanyName);

    const company = paints.find(
      (company) => company.companyName === selectedCompanyName
    );
    if (company) {
      setCompanyPaints(company.paints);
    } else {
      console.error("Company not found");
    }
  };

  if (!companyPaints) {
    return <div>Loading...</div>;
  }

  // Handle paint selection
  const handlePaintSelection = (paint: any) => {
    if (selectedColors.some((p) => p.code === paint.code)) {
      removeColor(paint.code); // Remove color from the context
    } else {
      addColor(paint); // Add color to the context
    }
  };

  // Handle category selection
  const handleCategorySelection = (category: string) => {
    setSelectedCategory(category);
  };

  // Handle next button click
  const handleNext = () => {
    router.push("/nextPage");
  };

  const renderPaints = () => {
    return companyPaints[selectedCategory]?.map((paint: any, index: number) => (
      <Col key={index} xs={3} className="mb-4">
        <Card
          className={`p-2 paint-card position-relative ${
            selectedColors.some((p) => p.code === paint.code) ? "selected" : ""
          }`}
          onClick={() => handlePaintSelection(paint)}
        >
          <div
            style={{
              backgroundColor: paint.hex,
              height: "100px",
              width: "100%",
              borderRadius: "8px",
            }}
          ></div>
          <div className="mt-2 text-center">
            <strong>{paint.name}</strong>
            <br />
            {paint.code}
          </div>

          {/* Show tick on selected paints */}
          {selectedColors.some((p) => p.code === paint.code) && (
            <FaCheckCircle
              size={24}
              color="black"
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
              }}
            />
          )}
        </Card>
      </Col>
    ));
  };

  return (
    <Container fluid className="">
      <Row>
        {/* Main Paints Grid that scrolls with the page */}
        <Col xs={9} className="p-5">
          <Row className="mb-5 align-items-center">
            <Col xs={8}>
              <h1 className="fw-bold">Browse Paint Colors</h1>
            </Col>
            <Col xs={4}>
              {/* Dropdown for selecting company */}
              <Form.Group controlId="companySelect">
                <Form.Label className="fw-bold">Select Company</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedCompany}
                  onChange={handleCompanySelection}
                >
                  {paints.map((company, index) => (
                    <option key={index} value={company.companyName}>
                      {company.companyName}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          {/* Color Categories */}
          <Row className="mb-4">
            {colorCategories.map((category) => (
              <Col key={category.key} className="mb-3">
                <Button
                  variant={selectedCategory === category.key ? "dark" : "light"}
                  onClick={() => handleCategorySelection(category.key)}
                  className="w-full"
                >
                  {category.name}
                </Button>
              </Col>
            ))}
          </Row>

          {/* Paint Grid */}
          <Row>{renderPaints()}</Row>
        </Col>

        {/* Saved Colors Section - Sticky with its own scroll */}
        <Col
          xs={3}
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflowY: "auto",
          }}
          className="custom-scrollbar"
        >
          <div className="saved-colors bg-light p-3 h-100 pt-5">
            {/* "Paint Your Room" Button inside the saved colors section */}
            <Button
              variant="primary"
              className="w-100 mb-3"
              onClick={handleCloseColorModal}
              disabled={selectedColors.length === 0}
            >
              Paint Your Room
            </Button>

            <h5>Saved Colors</h5>
            <ul className="list-group">
              {selectedColors.map((paint, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    <div
                      style={{
                        display: "inline-block",
                        backgroundColor: paint.hex,
                        width: "20px",
                        height: "20px",
                        marginRight: "10px",
                        borderRadius: "50%",
                      }}
                    ></div>
                    {paint.name}
                  </span>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() =>
                      removeColor(
                        paint?.code
                      )
                    }
                  >
                    &times;
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PaintSelectionPage;
