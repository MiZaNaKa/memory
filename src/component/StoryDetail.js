import React, {  useEffect,useState} from 'react';
import Header from "./Header"
import Action from "../action/StoryDetailAction"
import Store from "../store/StoryDetailStore"
import withNavigateHook from '../common/Navigate'
import Heart from '../img/heart.png'
import Heart1 from '../img/heart1.png'
import Option from '../img/option.png'


import loginHelper from '../jwtHelper/jwtHelper'
function StoryDetail (props){
    const userDetail=''
    var detailStore=Store.getDetail()
    const[detail,setDetail]=useState(detailStore)
    const[comment,setComment]=useState('')
    const[edit,setEdit]=useState(false)
    const[editCommentText,setEditComment]=useState('')
    const[editCommentString,setEditCommentString]=useState('')
    const[action,setAction]=useState(false)
    const[noteIndex,setNoteIndex]=useState('')
    const[editIndex,setEditIndex]=useState('')
    const[filterUserInfo,setFilterUserInfo]=useState([])
    const[love,setLove]=useState(false)

    const[userInfo,setUserInfo]=useState('')
    useEffect(() => {
        const getUserInfo = async () => {
          const data = await loginHelper.UserInfo()
          if(data){
            userDetail=data
            setUserInfo(data)
          }
          else{
            props.navigation('/')
          }
        }
        getUserInfo()
          .catch(console.error);
    }, [])


    useEffect(() => {
      Action.getStoryDetail(props.params.id)
    }, [])

    useEffect(() => {
      Store.addListener(onStoreChange)
    }, []);

    const onStoreChange =async () => {
        var detail=Store.getDetail()
        const data = await loginHelper.UserInfo()
        setUserInfo(data)

        if(data){
          var filter=detail.like.filter(x=>x==data._id)
        
          if(filter.length>0){
            setLove(true)
          }
          else{
            setLove(false)
          }

        }
        
        setDetail(detail)
    }

    const commentOnChange=(value)=>{
      setComment(value.target.value)
    }

    const editCommentOnChange=(value)=>{
      
      setEditComment(value.target.value)
    }

    

    const sendCommentAPI=()=>{
      if(comment){
        setAction(false)
        setNoteIndex('')
        setComment("")
        var request={
          comment:comment,
          _id:props.params.id
        }
        Action.sendComment(request)
      }
      
    }

    const deleteComment=(id)=>{
      setAction(false)
      setNoteIndex('')
      var request={
        id:props.params.id,
        commentID:id
      }
      Action.deleteComment(request)
    }

    const editComment=(id,index)=>{
      
      if(editCommentText){
        var request={
          id:props.params.id,
          commentID:id,
          comment:editCommentText
        }
        setEdit(false)
        setEditIndex('')
        
        Action.editComment(request)
      }     
    }

    const editCommentClick=(value,index)=>{
      setEdit(true)
      setEditIndex(index)
      setNoteIndex('')
      setEditComment(value)
    }

    const likeUnlikeAction=()=>{
      Action.likeUnlikeAction(props.params.id)
    }

    const optionAction=(index)=>{
      setAction(!action)
      setNoteIndex(index)
    }

    const goAuthor=()=>{
      props.navigation('/AuthorList/'+detail.userID)
    }

    


    return<div className='body'>
        <Header/>

        <div className='header'>
          
          <h1>{detail.title}<a href="" onClick={goAuthor} style={{textDecoration:'none'}}><span style={{fontSize:11,color:'gray',marginLeft:20}}>{detail.name}</span></a> </h1>
          <br/>
          <p className='storyContent'>{detail.text}</p>
          <br/>
          <br/>
          <div>

          {detail.like.length!== 0 ?
            <div style={{marginBottom:20,marginTop:20}}>
              
              {love ?
                <img onClick={likeUnlikeAction} src={Heart1} className='miniIcon'/>
                :
                <img onClick={likeUnlikeAction} src={Heart} className='miniIcon'/>
              }
              {detail.like.length}
            </div>
            :
            <div style={{marginBottom:20,marginTop:20}}>
              <img onClick={likeUnlikeAction} src={Heart} className='miniIcon'/>
            </div>
            
          }
          </div>
          <input value={comment} onChange={commentOnChange} className="commentInputBox" placeholder='write comment'/>
          <button onClick={sendCommentAPI} className='buttonBox'>Send</button>

          
          <div className='marginT'>
            {detail.comment.map((value,index)=>{
              return <div key={index} className='marginT'>
                  <div className='clearfix'>
                    <div className='commentBox1'>
                      <img src={value.profileImage} className="logoIcon"/>
                    </div>

                    <div className='commentBox2'>
                      {/* <p>{value.userName}</p> */}
                      {value.userName}
                      <br/>
                      <br/>
                      {edit && editIndex===index ?
                        <div>
                          <input className="commentInputBox" onChange={editCommentOnChange} value={edit ? editCommentText: value.comments}/>
                          <button onClick={()=>editComment(value._id)} className='updateButtonBox'>Update</button>
                        </div>
                        
                        :
                        <div>
                          {value.comments}
                          <br/>
                          <br/>
                          {new Date(value.date).toLocaleString().replace(",","").replace(/:.. /," ")}
                        
                          {/* <p onClick={()=>editCommentClick(value.comments)}>Edit</p> */}
                        </div>
                      }
                      

                      

                      
                    </div>

                    <div className='commentBox3'>
                      {/* <div>
                        <p>{userInfo}</p>
                      </div> */}
                      

                      {/* <p>nnn{value.userID}</p> */}

                    {/* <img onClick={likeUnlikeAction} src={Option} className='miniIcon'/> */}

                      {userInfo._id === value.userID ?
                        <img onClick={()=>optionAction(index)} src={Option} className='miniIcon'/>
                        :
                        null
                      }
                      
                      
                      {action && index===noteIndex ?
                        <div className='optionBox'>
                          <a onClick={()=>deleteComment(value._id)} className='hover'>Delete</a>
                          <br/>
                          <br/>
                          <a onClick={()=>editCommentClick(value.comments,index)} className='hover'>Edit</a>
                          {/* <p onClick={()=>editCommentClick(value.comments)}>Edit</p> */}
                        </div>
                        :
                        null
                      }
                      
                      {/* <ul className='optionList'>
                        <li><a href="#">Delete</a></li>
                        <li><a href="#">Edit</a></li>
                      </ul> */}
                      {/* <p onClick={()=>deleteComment(value._id)}>Delete</p><br/>

                      <p onClick={()=>editComment(value._id)}>Update</p> */}
                    </div>
                  </div>
                  
                </div>
            })}

          </div>





        </div>
        
        
        
        
    </div>
}

export default withNavigateHook(StoryDetail)