import {useEffect,useState} from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";


function Categories(){
  const history = useHistory();
  const dispach = useDispatch()
  const [categories,getcategories]= useState([])

  const getData = async() => {
    const x = await fetch(`https://api.thecatapi.com/v1/categories `)
    const y = await x.json()
    getcategories(y)
  }

  useEffect(()=>{
    getData()
  },[])

  function selectCategory(ev){
    let selectedId = ""
    categories.forEach((item)=>{
      if(item.name===ev.currentTarget.textContent){ 
        selectedId=item.id
      }
    })
    history.push(`/homePage/${selectedId}`);
    dispach({
      type:"changeCategory",
      peyload:selectedId
    })
  }

  const styles = {
    textAlign:"center",
    border: '2px solid rgba(0, 0, 0, 0.05)', 
};

  return (
    <div style={styles}>
        {categories.map((item)=>{
          return(
            <div key ={item.id} onClick={selectCategory} style={{margin:3,cursor:"pointer"},styles}>
              {item.name}
            </div>
          )
        })}
      </div>
  );
}
export default Categories;
