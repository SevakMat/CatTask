import {useEffect,useState} from "react";
import {useSelector} from "react-redux";
import { useHistory } from "react-router";
import Categories from "../categories/categories";
import './homePage.css';

function HomePage() {
  const history = useHistory();
  const [photoData,getPhotoData]= useState([])
  const [photoCount,getPhotoCount] = useState(10)
  const category = useSelector(function(state){
    return state.category
  })

  const getData = async() => {
    let dataFromApi;  

    if(category === ""){
      dataFromApi = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${photoCount}&page=1`)
      history.push(`/homePage`);
    }
    else{
      dataFromApi = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${photoCount}&page=1&category_ids=${category}`)
    }
    const jsonDara = await dataFromApi.json()
    getPhotoData(jsonDara)
  }

  useEffect(()=>{
    getData()
  },[photoCount,category])

  function loadMorePhote(){
    getPhotoCount(photoCount+10 )
  }

  if(!photoData.length) {

    return <div className="lds-ring"><div></div></div>;
  }

  return (
    <div >
      <div style={{display:"flex"}}>
      <Categories/>
        <div className="imageContent" >
          {photoData.map((item)=>{
            return(
              <div key = {item.url}>
                <img style={{ height:150, margin:5}} src ={item.url} alt="" />
              </div>
            )
          })}
        </div>
      </div>
      <button onClick={loadMorePhote} className="load" >Load more photes</button>
    </div>
  );
}
export default HomePage;
