import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";

import { Modal, Row, Col } from "react-bootstrap";
import { FaComments } from "react-icons/fa";
import StarRatings from "react-star-ratings";

const Profile = () => {
  const commentList = [
    "this is comment 1 this is comment 1this is comment 1this is comment 1this is comment 1this is comment 1",
    "this is comment 1 this is comment 1this is comment 1this is comment 1this is comment 1this is comment 1",
    "this is comment 1 this is comment 1this is comment 1this is comment 1this is comment 1this is comment 1",
    "this is comment 1 this is comment 1this is comment 1this is comment 1this is comment 1this is comment 1",
    "this is comment 1 this is comment 1this is comment 1this is comment 1this is comment 1this is comment 1",
    "this is comment 1 this is comment 1this is comment 1this is comment 1this is comment 1this is comment 1",
    "this is comment 1 this is comment 1this is comment 1this is comment 1this is comment 1this is comment 1",
    "this is comment 1 this is comment 1this is comment 1this is comment 1this is comment 1this is comment 1",
  ];
  return (
    <div className="px-4 my-4">
      {/* Header text */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Profile</h1>
      </div>
      <div>
        <Row
          style={{
            backgroundColor: "#edf2fd",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <Col xs={2} style={{ justifyContent: "center", display: "flex" }}>
            {" "}
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
              alt="Uploaded preview"
              className="img-fluid "
              style={{ width: "100px", height: "100px" }}
            />
          </Col>
          <Col xs={4}>
            <Row style={{ display: "flex", flexDirection: "row" }}>
              <p>Name : Shehan</p>
            </Row>
            <Row style={{ display: "flex", flexDirection: "row" }}>
              <p>Country : Sri lanka</p>
            </Row>
          </Col>
          <Col xs={5}>
            <Row style={{ display: "flex", flexDirection: "row" }}>
              <p>Email : Shehangunasekara2019@gmail.com</p>
            </Row>{" "}
            <Row style={{ display: "flex", flexDirection: "row" }}>
              <p>User Type : Vendor</p>
            </Row>
          </Col>
          <Col xs={1}>
            {" "}
            <Row
              style={{ display: "flex", flexDirection: "row", color: "green" }}
            >
              <p> Active</p>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={4} style={{ marginTop: "80px" }}>
            <Row
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "75px",
                fontWeight: "bold",
              }}
            >
              3.5
            </Row>
            <Row
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <StarRatings
                rating={3.5} // This is the rating value passed as a prop
                starRatedColor="gold" // Color of the rated stars
                numberOfStars={5} // Total number of stars
                name="rating" // Name attribute for form handling (optional)
                starDimension="35px" // Size of the stars
                starSpacing="2px" // Spacing between stars
              />
            </Row>
          </Col>
          <Col xs={8} style={{ marginTop: "20px" }}>
            <p style={{ fontSize: "25px", fontWeight: "bold" }}>Feedback</p>
            {commentList.map((comment, index) => (
              <Row key={index} className="mb-2">
                <p style={{ fontWeight: "bold" }}>
                  {" "}
                  <FaComments /> customer name
                </p>{" "}
                <Row
                  key={index}
                  className="mb-2"
                  style={{ marginLeft: "20px", marginTop: "-10px" }}
                >
                  <Col xs={11}> {comment}</Col>
                </Row>
              </Row>
            ))}
          </Col>
          s
        </Row>
      </div>
    </div>
  );
};

export default Profile;
