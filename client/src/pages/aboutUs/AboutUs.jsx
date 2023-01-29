import { useRef, useState } from "react";
import RichTextEditor from "../../components/richTextEditor/RichTextEditor";
import "./aboutUs.css";
import parse from "html-react-parser";
import emailjs from "emailjs-com";
export default function AboutUs() {
  const [value, setValue] = useState("");
  const getValue = (value) => {
    setValue(value);
  };
  const formRef = useRef();
  const [done, setDone] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_72i4wmb",
        "template_5asq7ai",
        formRef.current,
        "user_sP5i0padsT1ONdbiGYy9j",
      )
      .then(
        (result) => {
          console.log(result.text);
          setDone(true);
        },
        (error) => {
          console.log(error.text);
        },
      );
  };

  // const handleSubmit = () => {
  //   // e.preventDefault();
  //   let templateParams = {
  //     from_name: "email",
  //     to_name: "<YOUR_EMAIL_ID>",
  //     subject: "subject",
  //     message: "message",
  //   };
  //   emailjs
  //     .sendForm(
  //       "service_72i4wmb",
  //       "template_5asq7ai",
  //       templateParams,
  //       "user_sP5i0padsT1ONdbiGYy9j",
  //     )
  //     .then(
  //       (result) => {
  //         console.log(result.text);
  //       },
  //       (error) => {
  //         console.log(error.text);
  //       },
  //     );
  // };
  return (
    <div className="aboutUs">
      {/* <RichTextEditor initialValue="" getValue={getValue} />
      <br />
      <div>{parse(value)}</div> */}

      <div className="aboutusTop-1">
        <span className="topsm1" onClick={handleSubmit}>
          Welcome
        </span>
        <span className="topLg" onClick={handleSubmit}>
          Lorem ipsum dolor sit amet.
        </span>

        <span className="topm">ENERGY SHELF</span>
        <span className="topm">Ever Green Knowledge Of Technology.</span>

        {/*<div className="leftTop">
          <span className="topLg" onClick={handleSubmit}>
            Our Team
          </span>
          <span className="topm">
            Mixed Tech Panel Ever Green Knowledge Of Technology.
          </span>
           <span className="topSm">
            We are a team of IITians, who setup this website inorder to create
            something which is rare to find in this era. We provide solutions to
            your problems not only in Computer Science and Machine Learning
            Domain but also in oil and gas industry thus, covering two major
            engineering domains at a once at the same place
          </span> 
        </div>
        {/* <div className="rightTop">
          <img
            src="https://source.unsplash.com/random/?technology"
            alt=""
            className="topImg"
          />
        </div> */}
      </div>
      <div className="abt-sub1">
        <div className="abt-sub1-txt">
          We are a team of IITians, who setup this website inorder to create
          something which is rare to find in this era. We provide solutions to
          your problems not only in Computer Science and Machine Learning Domain
          but also in oil and gas industry thus, covering two major engineering
          domains at a once at the same place
        </div>
      </div>
      <div className="abt-intro">
        <div className="abt-intro-left">
          <img
            src="https://www.wallpapertip.com/wmimgs/94-942358_business-hd-wallpaper-data-src.jpg"
            alt=""
            className="abt-intro-img"
          />
        </div>
        <div className="abt-intro-right">
          <div className="abt-text-1">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam,
            necessitatibus?
          </div>
          <div className="abt-text-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
            fugiat libero dolorem illo commodi deserunt consectetur neque nulla
            officia, porro quae itaque vitae repellat obcaecati. Beatae nulla
            voluptate eligendi, similique eos tenetur inventore hic laborum in
            sequi non atque velit necessitatibus at accusantium quod ex. Aut
            animi necessitatibus voluptas inventore.
          </div>
          <div className="abt-text-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
            fugiat libero dolorem illo commodi deserunt consectetur neque nulla
            officia, porro quae itaque vitae repellat obcaecati. Beatae nulla
            voluptate eligendi, similique eos tenetur inventore hic laborum in
            sequi non atque velit necessitatibus at accusantium quod ex. Aut
            animi necessitatibus voluptas inventore.
          </div>
        </div>
      </div>
      <div className="abt-sub2">
        <div className="abt-sub2-txt1">
          We are a team of IITians, who setup this website inorder to create
          something
        </div>
        <div className="abt-sub2-txt2">
          We are a team of IITians, who setup this website inorder to create
        </div>
      </div>
      <div className="team-info">
        <div className="team-info-head">Team Members</div>
        <div className="team-info-data">
          <div class="image">
            <img
              class="image__img"
              src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="Bricks"></img>
            <div class="image__overlay image__overlay--blur">
              <div class="image__title">Bricks</div>
              <p class="image__description">Here we have a brick wall.</p>
            </div>
          </div>
          <div class="image">
            <img
              class="image__img"
              src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="Bricks"></img>
            <div class="image__overlay image__overlay--blur">
              <div class="image__title">sdf sdf sd</div>
              <p class="image__description">Co-founder</p>
            </div>
          </div>
          <div class="image">
            <img
              class="image__img"
              src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="Bricks"></img>
            <div class="image__overlay image__overlay--blur">
              <div class="image__title">sdf ds d</div>
              <p class="image__description">Co-founder</p>
            </div>
          </div>

          <div class="image">
            <img
              class="image__img"
              src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="Bricks"></img>

            <div class="image__overlay image__overlay--blur">
              <div class="image__title">lsdf sdf ds</div>
              <p class="image__description">Co-founder</p>
            </div>
          </div>
        </div>
      </div>

      <div className="ab-contact-us">
        <div className="ab-contact-bg"></div>
        <div className="ab-contact-head">
          <div className="ab-contact-us-lg">Get In Touch</div>
          <div className="ab-contact-us-sm">
            Want to Reach us to provide some solutions
          </div>
          <div className="ab-contacts-icons">
            <div className="ab-contacts-icon">
              <i class="contact-icon fas fa-map-marker-alt"></i>
              <span className="contact-text">9 A f Alkapuri</span>
            </div>
            <div className="ab-contacts-icon">
              <i class="contact-icon fas fa-phone-alt"></i>
              <span className="contact-text">25242345S</span>
            </div>
            <div className="ab-contacts-icon">
              <i class="contact-icon fas fa-envelope"></i>
              <span className="contact-text">business@energyshelf.co.in</span>
            </div>
          </div>
        </div>
        <form className="form-abt" ref={formRef} onSubmit={handleSubmit}>
          <input
            className="form-abt-t"
            type="text"
            value={"sadsd "}
            style={{ display: "none" }}
            placeholder="Name"
            name="user_name"
          />
          <input
            className="form-abt-t"
            type="text"
            placeholder="Subject"
            name="user_subject"
          />
          <input
            className="form-abt-t"
            type="text"
            placeholder="Email"
            name="user_email"
          />
          <textarea
            className="form-abt-t"
            name="message"
            id=""
            rows="5"></textarea>
          <button className="form-abt-t">Submit</button>
          {done && <div className="c-t">Thanks for messaging.</div>}
        </form>
      </div>
    </div>
  );
}
