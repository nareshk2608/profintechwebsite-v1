import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'

import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';
const firebaseConfig = {
  apiKey: "AIzaSyBzFdaVVdRp5OYT4_8j1JFyKPqSNS3b6aI",
  authDomain: "profintech-581a3.firebaseapp.com",
  databaseURL: "https://profintech-581a3-default-rtdb.firebaseio.com",
  projectId: "profintech-581a3",
  storageBucket: "profintech-581a3.appspot.com",
  messagingSenderId: "887716986071",
  appId: "1:887716986071:web:3a090da9c6dcdcd4180492",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


const submit = document.querySelector(".sendmessagebutton");




(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (e) {
    e.addEventListener('submit', function (event) {
      event.preventDefault();
      
      let messagesendername = document.getElementById("name").value;
      let messagesenderemail = document.getElementById("email").value;
      let messagesendersubject = document.getElementById("subject").value;
      let messagesendermessage = document.getElementById("message").value;

      let data = {
        "name": messagesendername,
        "email": messagesenderemail,
        "subject": messagesendersubject,
        "message": messagesendermessage
      }

      try {
        const db = getDatabase();
        let userid = messagesenderemail.replace('.', '@');
        set(ref(db, `users/${userid}/` +Date.now()), {
          "name": messagesendername,
          "email": messagesenderemail,
          "subject": messagesendersubject,
          "message": messagesendermessage
        });

        document.querySelector('.sent-message').classList.add('d-block');




      }
      catch (err) {
        document.querySelector('.error-message').classList.add('d-block');
      }
      finally {
        document.getElementById("name").value = '';
        document.getElementById("email").value = '';
        document.getElementById("subject").value = '';
        document.getElementById("message").value = '';

        setTimeout(()=>{
        document.querySelector('.sent-message').classList.remove('d-block');

        },3000)

      }

    });
  });



})();
