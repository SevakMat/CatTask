import {useEffect,useState} from "react";
import {useSelector} from "react-redux";
import Categories from "./catrgories";

function HomePage() {
  const [photoData,getPhotoData]= useState([])
  const [photoCount,getPhotoCount] = useState(10)
  const category = useSelector(function(state){
    return state.category
  })

  const getData = async() => {
    let dataFromApi = NaN  

    if(category === ""){
      dataFromApi = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${photoCount}&page=1`)
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
  return (
    <div >
      <div style={{display:"flex"}}>
      <Categories/>
        <div style={{display:"flex",flexWrap:"wrap" ,justifyContent:"space-between",}} >
          {photoData.map((item)=>{
            return(
              <div key = {item.url}>
                <img style={{ height:150, margin:5}} src ={item.url} alt="" />
              </div>
            )
          })}
        </div>
      </div>
      <button onClick={loadMorePhote} style={{backgroundColor:"#4CAF50",color:"white",textAlign:"center",display: "inline-block"}} >Load more photes</button>
    </div>
  );
}
export default HomePage;
