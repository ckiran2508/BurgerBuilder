import React from 'react'

const About = function(props){

    return(
        <div style={{marginTop:'5px',padding:'10px',border:'1px solid gray', borderRadius:'3px',background:'#FFF2E6', boxShadow:'0 0 5px gray'}}>
           <p>
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>The application Burger Builder is developed as part of React course learning in Udemy by Maximillian Schwarzmuller.
           This application includes some addons built to the core original app taught in the course like managing burger quantity, user profile management, multiple addresses, cart and orders sections.
           The application backend is built using firebase cloud functions and firestore NOSQL database. Any user visiting this application can use the dummy credentials email:test@test.com and password:test123, to sign in and explore all sections of the application.
           <p style={{float:'right'}}>- Kiran Channayanamath</p></i>                                                                                                                               
           </p>
        </div>
    )
}

export default About