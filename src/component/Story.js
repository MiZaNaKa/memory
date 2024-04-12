import React, {  useEffect,useState} from 'react';
import loginHelper from '../jwtHelper/jwtHelper'
import Header from "./Header"
import Action from "../action/StoryAction"
import Store from "../store/StoryStore"
import noData from "../img/noData.png"
import withNavigateHook from '../common/Navigate'
function Story (props){
    // let userId = useParams();
    const[list,setList]=useState([])
    useEffect(() => {
      
      Action.getStoryList()
    }, [])

    useEffect(() => {
      Store.addListener(onStoreChange)
    }, []);

    const onStoreChange = () => {
      var list=Store.getStoryList()
      setList(list)
    }

    const goStoryDetail = (id) => {
      
      props.navigation('/StoryDetail/'+id)
    }

    return<div className='body'>
        <Header/>
        
        <div className='header'>
          {list.length===0 ?
            <div className='noDataBox'>
              <img src={noData} className='noData'/>
            </div>
            :
            <div>
              {list.map((value,index)=>{
                return <div className='storyBox' onClick={()=>goStoryDetail(value._id)} key={index} style={{marginBottom:20,borderBottom:'1px solid #000'}}>
                  <h1>{value.title}<span style={{fontSize:11,color:'gray',marginLeft:20}}>{value.name}</span></h1>
                  {value.text.length>800 ?
                      <p className='storyContent'>{value.text.substring(0, 800)} ...<a>See More</a></p>
                      :
                      <p className='storyContent'>{value.text}</p>
                    }
                </div>
              })}
            </div>
          }
        </div>
        
    </div>
}

export default withNavigateHook(Story)