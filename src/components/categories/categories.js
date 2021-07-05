import {useEffect,useState} from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import './categories.css';


function Categories(){
  const history = useHistory();
  const dispatch = useDispatch()
  const [categories,getCategories]= useState([])

  const getData = async() => {
    const x = await fetch(`https://api.thecatapi.com/v1/categories `)
    const y = await x.json()
    getCategories(y)
  }

  useEffect(()=>{
    getData()
  },[])

  function selectCategory(ev){
    let selectedId = ""
    categories.forEach((item)=>{
      if(item.name === ev.currentTarget.textContent){ 
        selectedId=item.id
      }
    })
    history.push(`/homePage/${selectedId}`);
    dispatch({
      type:"changeCategory",
      peyload:selectedId
    })
  }

  return (
    <div>
        {categories.map((item)=>{
          return(
            <ul key ={item.id} className="categories" onClick={selectCategory}>
              <li><span>{item.name}</span></li>
            </ul>
          )
        })}
      </div>
  );
}
export default Categories;
