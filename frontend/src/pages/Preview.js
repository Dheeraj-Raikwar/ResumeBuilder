import './preview.css'
import React, { Fragment } from 'react'
import { Stack } from 'react-bootstrap'
import { BsLinkedin, BsGithub, BsGlobe } from 'react-icons/bs'
import { GiGraduateCap } from 'react-icons/gi'
import { HiLocationMarker, HiOfficeBuilding, HiOutlineMail, HiPhone } from 'react-icons/hi'
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import axios from 'axios';
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


function Preview() {

  const profile = useSelector(state => state.profile)
  const name = profile.name.split(" ");
  const file = useSelector(state => state.file)
  const about = useSelector(state => state.about)
  const experienceList = useSelector(state => state.experienceList)
  const educationList = useSelector(state => state.educationList)
  const skills = useSelector(state => state.skills)

  const navigate = useNavigate();


  function logout() {
    navigate('/');
  }
  const data = {
    profile: profile,
    name: name,
    file: file,
    about: about,
    experienceList: experienceList,
    educationList: educationList,
    skills: skills
  }


  let mySkills = ""

  skills.forEach(element => {
    mySkills = mySkills + `<p class="technology rounded float-left my-1">${element}</p>`
  });

  let myExperience = ""

  experienceList.forEach(element => {
    myExperience = myExperience + `
        
        <div>
            <h3 class="float-left text-secondary">• </h3> <h3 class="ps-3 text-secondary">${element.title}</h3>
            <p class="m-0 ps-3">${element.company} • ${element.startMonth} ${element.startYear} ${`${element.isWorking ? " - Present" : " - " + element.endMonth + " " + element.endYear}`}</p>
            <p class="m-0 ps-3">${element.location}</p>
            <p class=" ps-3">${element.description}</p>
        </div>

        `
  })

  let myEducation = ""

  educationList.forEach(element => {
    myEducation = myEducation + `
        
        <div>
            <h3 class="float-left text-secondary">• </h3> <h3 class="ps-3 text-secondary">${element.institute}</h3>
            <p class="m-0 ps-3">${element.degree} • ${element.fieldOfStudy} </p>
            <p class="ps-3">${element.startYear} - ${element.endYear} • Grade: ${element.grade}</p>
        </div>

        `
  })

  /*
    const createAndDownloadPdf = () => {
      const data = {
        profile: profile,
        name: name,
        file: file,
        about: about,
        experienceList: experienceList,
        educationList: educationList,
        skills: skills
      }
      axios.post('http://localhost:3001/create-pdf', data)
        .then(() => axios.get('http://localhost:3001/fetch-pdf', { responseType: 'blob' }))
        .then((res) => {
          const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
  
          saveAs(pdfBlob, 'newPdf.pdf');
        })
    }
  */
  const printDocument = () => {
    const input = document.getElementById('divToPrint');
    console.log(data.skills);
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'pt', 'a4', false);
        pdf.addImage(imgData, 'PNG', 0, 0, 600, 0, undefined, false);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
      ;
  };

  const GetIcon = (icon) => {
    switch (icon.icon) {
      case "HiOutlineMail":
        return <HiOutlineMail size={30} />
      case "HiPhone":
        return <HiPhone size={30} />
      case "BsLinkedin":
        return <BsLinkedin size={30} />
      case "BsGithub":
        return <BsGithub size={30} />
      case "BsGlobe":
        return <BsGlobe size={30} />
      default:
        return "●"
    }
  }
  const GetLinks = () => {
    const list = [];
    if (profile.email) {
      list.push({
        icon: "HiOutlineMail",
        link: profile.email,
      });
    }
    if (profile.contact) {
      list.push({
        icon: "HiPhone",
        link: profile.contact,
      });
    }
    if (profile.linkedin) {
      list.push({
        icon: "BsLinkedin",
        link: profile.linkedin,
      });
    }
    if (profile.github) {
      list.push({
        icon: "BsGithub",
        link: profile.github,
      });
    }
    if (profile.website) {
      list.push({
        icon: "BsGlobe",
        link: profile.website,
      });
    }

    return (
      list.map((item, id) => {
        return (
          <div className={id % 2 === 0 ? "d-flex aligh-items-start align-items-center bg-2 text-white p-3" : "d-flex aligh-items-start align-items-center bg-3 text-white p-3"} key={id}>
            <p className="m-0"><GetIcon icon={item.icon} /></p><span className="mx-2"></span><p className="m-0">{item.link}</p>
          </div>
        )
      })
    )

  }

  return (
    <Fragment>

      {/* Header */}
      <div className="header-container">
        <div className="btn-container">
          <Button id="signin" variant="outlined" onClick={logout}>
            Log Out{" "}
          </Button>
        </div>
      </div>

      <div className='template-container'>
        <div className="container d-flex justify-content-center p-4">
          {/* Template 1 */}
          <div>
            <div className="row pdf bg-light" id="divToPrint" size="A4">

              <div className="d-flex align-items-center justify-content-center col-md-5 bg-1 p-0 py-2">
                <div>
                  <div className="d-flex justify-content-center">
                    <img src={file} className="pdf-profile-image" alt="..."></img>
                  </div>

                  <Stack className="text-center">
                    <span className="font-bold m-0 firstname">{name[0]}</span>
                    <span className="font-thin m-0">{name[1]}</span>
                    <p>{profile.tagline}</p>
                    <p className="m-0"><HiOfficeBuilding size={20} /> {profile.position}</p>
                    <p><HiLocationMarker size={20} /> {profile.location}</p>

                  </Stack>
                  <br></br>
                  <GetLinks />

                  <br></br>
                  <Stack className="p-3">
                    <h4 className="title">Skills</h4>
                    <div className="d-flex flex-wrap">
                      {
                        skills.map((items, id) => {
                          return (
                            <p className="technology rounded" key={id}>{items}</p>
                          )
                        })
                      }
                    </div>
                  </Stack>
                </div>

              </div>
              <div className="d-flex align-items-center col-md-7 p-0 py-4">
                <div>
                  <div className="px-4 py-1">
                    <h4 className="title">About Me</h4>
                    <p className="text-break">
                      {about}
                    </p>
                    <hr></hr>
                  </div>

                  <div className="px-4">
                    <h4 className="title">Experience</h4>
                    {
                      experienceList.map((item, id) => {
                        return (
                          <div className="d-flex justify-content-start py-1" key={id}>
                            <HiOfficeBuilding size={30} />
                            <div className="px-3">
                              <h4>{item.title}</h4>
                              <p className="m-0">{item.company} • {item.startMonth} {item.startYear} {`${item.isWorking ? " - Present" : " - " + item.endMonth + " " + item.endYear}`}</p>
                              <p className="m-0">{item.location}</p>
                              <p>{item.description}</p>
                            </div>
                          </div>
                        )
                      })
                    }

                    <hr></hr>
                  </div>

                  <div className="px-4">
                    <h4 className="title">Education</h4>
                    {
                      educationList.map((item, id) => {
                        return (
                          <div className="d-flex justify-content-start py-1" key={id}>
                            <GiGraduateCap size={40} />
                            <div className="px-3">
                              <h4>{item.institute}</h4>
                              <p className="m-0">{item.degree} • {item.fieldOfStudy}</p>
                              <p>{item.startYear} - {item.endYear} • Grade: {item.grade}</p>
                            </div>
                          </div>
                        )
                      })
                    }


                  </div>
                </div>

              </div>
              <div className="d-grid col-2 mx-auto mt-4">
                <button className="nav-link align-middle bg-dark text-white p-2 rounded" onClick={printDocument}>Download Template 1</button>
              </div>

            </div>
          </div>

          {/*Template 2 */}
          <div>
            <html lang="en">
              <head>
                <meta charset="utf-8" />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />

                <title>Resume</title>
              </head>
              <body>
                <div>

                  <div class="px-4">
                    <h2 class="mx-4 font-bold mt-4">${name[0] + " " + name[1]} </h2>
                    <p class="mx-4 fs-small mb-2 text-secondary">${profile.tagline}</p>
                  </div>

                  <hr></hr>

                  <div class="px-4">

                    <div class="col-5 float-left bg-light p-4">

                      <h3 class="mb-3 ls-2">• INFO</h3>

                      <h4 class="m-0 text-secondary">Position:</h4>
                      <p class="m-0 mb-2">${profile.position}</p>
                      <h4 class="m-0 text-secondary">Location:</h4>
                      <p class="m-0 mb-2">${profile.location}</p>
                      <h4 class="m-0 text-secondary">Contact:</h4>
                      <p class="m-0 mb-2">${profile.contact}</p>
                      <h4 class="m-0 text-secondary">E-Mail:</h4>
                      <p class="m-0">${profile.email}</p>

                      <hr></hr>

                      <h3 class="mb-3 ls-2">• LINKS</h3>

                      <h4 class="m-0 text-secondary">LinkedIn:</h4>
                      <p class="m-0 mb-2">${profile.linkedin}</p>
                      <h4 class="m-0 text-secondary">GitHub:</h4>
                      <p class="m-0 mb-2">${profile.github}</p>
                      <h4 class="m-0 text-secondary">Website:</h4>
                      <p class="m-0">${profile.website}</p>

                      <hr></hr>

                      <h3 class="mb-3 ls-2">• SKILLS</h3>

                      <div class="d-flex flex-wrap">
                        ${mySkills}
                      </div>

                    </div>

                    <div class="col-7 float-left p-4">

                      <h3 class="mb-3 ls-2">• ABOUT</h3>

                      <p class="m-0">${about}</p>

                      <hr></hr>

                      <h3 class="mb-3 ls-2">• WORK EXPERIENCE</h3>

                      ${myExperience}

                      <hr></hr>

                      <h3 class="mb-3 ls-2">• EDUCATION</h3>

                      ${myEducation}

                    </div>
                  </div>

                </div>
              </body>
            </html>
          </div>
        </div>
      </div>

    </Fragment>
  )
}

export default Preview