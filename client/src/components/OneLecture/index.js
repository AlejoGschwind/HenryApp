import React, { useEffect, useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./index.css";
import { Link } from "react-router-dom";
import Readme from "../Readme/Readme";
import { getAllLectures } from "../../redux/actions/lecturesActions";
import {useSelector, useDispatch} from "react-redux";
import Header from "../Header/index.js"

const OneLecture = (props) => {
  const dispatch = useDispatch()
  const history = useHistory();
  const allLectures = useSelector (state => state.lecture.lectures)
  const [rightArrow, setRightArrow] = useState(true);


  var thisURL = window.location.pathname
  var indexOfSlash = thisURL.lastIndexOf("/")
  var thisModule = thisURL.substring(indexOfSlash+1)  
  const lecturesOfThisModule = allLectures.filter(el => el.modulo === thisModule)
  const [allVideos, setAllVideos] = useState([{
    _id: "",
    img: "",
    lecture: "",
    profesor: "",
    title: "",
    url: ""
  }]);
  const [teacher, setTeacher] = useState(0)
  const [teacherDivStyle, setTeacherDivStyle] = useState("teacherDiv")
  const [lecture, setLecture] = useState({
    title: "",
    desription: "",
    urlLecture: "",
    modulo: ""
  });

  useEffect(() => {
    dispatch(getAllLectures())
    getVideos();
    getOneLecture();
  }, []);

  const getVideos = () => {
    axios.get("http://localhost:5000/videos/", { params: { lectureid: props.match.params.lectureid } })
      .then(res => {
        setAllVideos(res.data);
      });
  };

  const getOneLecture = () => {
    axios.get(`http://localhost:5000/lectures/${props.match.params.lectureid}`).then(
      res => {
        console.log(res);
        setLecture(res.data);
      }
    );
  };

 
  const arrayAllVideos = []
   allVideos.map (el => {
    var urlVideo = el.url
    urlVideo = urlVideo.replace("https://vimeo.com/", "")
    arrayAllVideos.push(urlVideo)
  })

  const arrayAllTeachers = []
  allVideos.map(el => {
    arrayAllTeachers.push(el.profesor)
  })

  /*var urlVideo = allVideos[0].url
  urlVideo = urlVideo.replace("https://vimeo.com/", "")
  var urlVimeo = "https://player.vimeo.com/video/307791576?title=0&byline=0&portrait=0"
  urlVimeo = urlVimeo.replace("307791576", urlVideo)*/

  const getIndexOfThisLecture = lecturesOfThisModule.findIndex(l => l._id === lecture._id)
  var lectureAnterior = getIndexOfThisLecture === 0 ? 0 : getIndexOfThisLecture -1
  var lectureSiguiente = getIndexOfThisLecture +1

  var prevLecture = lecturesOfThisModule[lectureAnterior] === undefined ? null : lecturesOfThisModule[lectureAnterior]._id

  var nextLecture = function () {
    if (lecturesOfThisModule[lectureSiguiente] === undefined && lecturesOfThisModule[getIndexOfThisLecture] === undefined) {
      return null
    }
    if (lecturesOfThisModule[lectureSiguiente] === undefined && lecturesOfThisModule[getIndexOfThisLecture]) {
      return lecturesOfThisModule[getIndexOfThisLecture]._id
    }
    return lecturesOfThisModule[lectureSiguiente]._id
  }



  return (
    <div className = "divContainer">  
      <Header/>
      <div className = "menuDiv">
      {lecturesOfThisModule.length === 0 ? null :
      <Fragment>
      <div className = "clickLectures" className = "changeLecture" onClick = {()=> {history.push(`/lecture/${prevLecture}/module/${thisModule}`); location.reload()} }><i class="fa fa-arrow-left fa-2x" aria-hidden="true"></i></div>
      <div className = "returns" className = "changeLecture" onClick = {()=> {history.push(`/modules/${thisModule}`)}}><h3>LECTURES <i class="fas fa-book-reader"></i></h3></div>
      {rightArrow === true?
       <div  className = "clickLectures" className = "changeLecture" onClick = {()=> {history.push(`/lecture/${nextLecture()}/module/${thisModule}`); location.reload()} }><i class="fa fa-arrow-right fa-2x" aria-hidden="true"></i></div>
       :
       null
    }
     
      </Fragment>}
     </div>

     <div className = "link">   
      <Link to={{ pathname: lecture.urlLecture }} target="_blank">
        <h1 className = "h1"><i className="fab fa-github"></i>{lecture.title}</h1>
      </Link>
      </div> 

      <br/>
      <div>
        

      </div>
      
      {/* <div className="videoCard-grid">
        {allVideos.map((video, index) => {
          return (
            <div key={index}>
              <CardVideo video={video} />
            </div>
          );
        })}
      </div>*/}
    {arrayAllTeachers.length === 0 ?
    null
    :
    <Fragment>
      <div className = "banner"></div>
    <div className = "teacherAndVideoDiv">
    <div className = "containerTeachers">
    <h3 className = "h3">¡ELIGE TU INSTRUCTOR!</h3>
    <h3 className = "h3">{arrayAllTeachers[teacher]}</h3>
    <div className = "teachersDiv">
    {arrayAllTeachers.map(el => {
        return (
          <div className = "teacherDiv" onClick = {() => {setTeacher(arrayAllTeachers.indexOf(el))}}><h4 className = "h4">{el}</h4></div>
        )
      })}
    </div>
    </div>
      <div className = "video">
        <iframe src= {`https://player.vimeo.com/video/${arrayAllVideos[teacher]}`} width="680" height="400" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
      </div>
      </div>
      </Fragment> 
    }
    <div className = "banner"></div>
    <Readme title = {lecture.title} url = {lecture.urlLecture}/>
    </div >
    
  );
};


export default OneLecture;