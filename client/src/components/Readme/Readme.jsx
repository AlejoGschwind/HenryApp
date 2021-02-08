import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Remarkable } from 'remarkable';
import "./readme.css";
require("dotenv").config();



export default function Readme (props) {
    const [readme, setReadme] = useState(null)
    const md = new Remarkable();
  
    var ReadmeUrl = props.url
    ReadmeUrl = ReadmeUrl.replace("https://github.com/","repos/")
    ReadmeUrl = ReadmeUrl.replace("/tree/master", "/contents")
    ReadmeUrl = ReadmeUrl + "/README.md?ref=master"

    console.log(ReadmeUrl)


    const getRepoReadme	 = () => {
      axios.post("http://localhost:5000/readme/", { ReadmeUrl } )
      .then(
        res => {
          console.log(res);
          if (!res.data.content) {
            return
          }
          setReadme(res.data.content);
        }
      );
    };

    useEffect (()=> {
        getRepoReadme()
    }, [ReadmeUrl])
    console.log ("readme", readme)

    var codeReadme = atob(readme)
    codeReadme = codeReadme.replaceAll("Ã©", "e");
    codeReadme = codeReadme.replaceAll("Ã³", "o");
    codeReadme = codeReadme.replaceAll("Ã", "á");
    codeReadme = codeReadme.replaceAll ("á¡", "á");
    codeReadme = codeReadme.replaceAll("Â", "");
    codeReadme = codeReadme.replaceAll("áº", "ú");
    codeReadme = codeReadme.replaceAll("aá", "ai")
    var newReadme = md.render(codeReadme)
    const firstTag = newReadme.indexOf("<h2>")
    const deleteHTML = newReadme.substring(firstTag)
    newReadme = deleteHTML
    
   
    return (
      
         <div className = "readme">
           {!readme? <div class="spinner-border text-light" role="status"></div>
           :
           <Fragment>
            <div className = "readme">
           <h1 className = "h1">Readme</h1>
           <div dangerouslySetInnerHTML={{__html: newReadme }}/>
           </div>
           </Fragment>
           }
        
        </div>

    )
    


} 

