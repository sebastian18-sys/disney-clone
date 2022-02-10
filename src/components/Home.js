import React, { useEffect } from 'react';
import styled from 'styled-components';
import ImgSlider from './ImgSlider';
import NewDisney from './NewDisney';
import Originals from './Originals';
import Recommend from './Recommend';
import Trending from './Trending';
import Viewers from './Viewers';
import { db } from "../firebase";
import { collectionGroup, onSnapshot } from '@firebase/firestore';
import { useDispatch, useSelector } from "react-redux"; 
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";

function Home() {

  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  console.log(userName);
  

  useEffect(() => {

    let recommends = [];
    let newDisneys = [];
    let originals = [];
    let trendings = [];
    
    onSnapshot(collectionGroup(db, "movies"), (snapshot) => {
      snapshot.docs.map((doc) => { 
        switch(doc.data().type) {
          case "recommend": recommends = [...recommends, {id: doc.id, ...doc.data()}] 
            break;
          case "new": newDisneys = [...newDisneys, {id: doc.id, ...doc.data()}] 
            break;
          case "original": originals = [...originals, {id: doc.id, ...doc.data()}]  
            break;
          case "trending": trendings = [...trendings, {id: doc.id, ...doc.data()}] 
            break;
        }
      })
    
      // Seend Data on Store Redux from firebase
      dispatch(setMovies({
        recommend: recommends,
        newDisney: newDisneys,
        original: originals,
        trending: trendings,
      }));

    });

  }, [userName]); 

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommend />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  )
}

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
  

  &:after {
    background: url('/images/home-background.png') center center / cover no-repeat fixed;
    content: '';
    position: absolute;
    inset: 0px;
    opacitiy: 1;
    z-index: -1;
  }
`

export default Home;
