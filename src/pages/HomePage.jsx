import { useState, useEffect } from "react";

//COMPONENTS
import GoogleMap from "../components/GoogleMap";
import TipList from "../components/TipList";
import FilterBar from "../components/FilterBar";


function HomePage() {
    return (
      <>
        <GoogleMap />
        <FilterBar/>
        <TipList />
      </>
    );
  }
  
  export default HomePage;