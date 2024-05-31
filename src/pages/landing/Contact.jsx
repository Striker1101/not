import React, { useState } from "react";
import Container from "../../components/Container";
import TextInput from "../../components/vendor/form/TextInput";
import TextArea from "../../components/vendor/form/TextArea";
export default function Contact() {
  const [formDate, setFormDate] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setFormDate((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(formDate);
  }
  return (
    <Container>
      <div id="contact">
        <div></div>
        <div className="contact-container">
          <div className="blurred-frame">
            <div className="content">
              <h1 className="font-bold text-2xl p-4">Contact US</h1>
              <form action="" onSubmit={handleSubmit}>
                <TextInput
                  handleChange={handleChange}
                  placeholder={"Your Name"}
                  name={"name"}
                  value={formDate.name}
                  type={"text"}
                />

                <TextInput
                  handleChange={handleChange}
                  placeholder={"Enter Your Email"}
                  name={"email"}
                  value={formDate.email}
                  type={"email"}
                />

                <TextInput
                  handleChange={handleChange}
                  placeholder={"Your Company Name"}
                  name={"company"}
                  value={formDate.company}
                  type={"text"}
                />

                <TextArea
                  handleChange={handleChange}
                  placeholder={"Your Message"}
                  name={"message"}
                  value={formDate.message}
                />
                <div className="flex items-center justify-center align-middle">
                  <button
                    className="bg-blue-700 px-20 py-3 rounded"
                    type="submit"
                  >
                    SUBMIT
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
