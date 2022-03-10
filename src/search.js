import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue, get, child} from "firebase/database";
import React, {useEffect, useState} from 'react';


export const SearchView = () => {
  // create a variable for the database output
  const [data, setData] = useState(() => null)
  // create a variable for the data + a setter
  const [userOptions, setUserOptions] = useState(() => [])
  // blank variable to hold user input
  const [name, setName] = useState(() => "")

  // firebase config + app & db initialization
  const firebaseConfig = {
    apiKey: "AIzaSyAQ6USPFRL3Uqps1aqErhcNyRlO2XblHj0",
    authDomain: "interview-50399.firebaseapp.com",
    projectId: "interview-50399",
    storageBucket: "interview-50399.appspot.com",
    messagingSenderId: "503019432099",
    appId: "1:503019432099:web:9394f58478b734996db716",
    measurementId: "G-C8XFN5VGFS"
  };
  // firebase init
  const app = initializeApp(firebaseConfig);
  const database = getDatabase();

  // get the data before the app loads and turn it into user options
  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, '/')).then((snapshot) => {
      const data = snapshot.val()
      const list = []
      // get items from the database and store them in state
      for (let id in data){
        list.push(data[id])
      }
      setData(list)
      // create the options that are used for autosuggest look ahead and save them to state
      let options = []
      for (let i = 0; i < list.length; i++){
        options.push(<option key={list[i]['First']} value={list[i]['First']}>{list[i]['First']}</option>)
      }
      setUserOptions(options)
      // error handling
    }).catch((error) => {
      console.error(error);
    });
  }, [])

  // redirects to the user's linkedin page
  const redirect = (event) => {
    event.preventDefault();
    // checks if the user is in the database
    for (let i = 0; i < data.length; i++){
      if (data[i]['First'] === name){
        // if so, redirect to their linkedin page
        window.location.href = "https://www.linkedin.com/in/" + data[i]['Username']
      }
    }
  }

  // render the form + options
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2%'}}>
      <form onSubmit={redirect}>
        <input list="users" name="userSearch" value={name} onChange={(e) => setName(e.target.value)}/>
        <datalist id="users">
          {userOptions}
        </datalist><br/>
        <input type='submit' style={{width: '100%'}}/>
      </form>
    </div>
  )
}
