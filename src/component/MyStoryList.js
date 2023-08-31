import React, {  useEffect,useState} from 'react';
import Header from "./Header"
import Action from "../action/MyStoryListAction"
import Store from "../store/MyStoryListStore"
import ReactPaginate from 'react-paginate';
import withNavigateHook from '../common/Navigate'
import StyleIt from 'style-it';
import noData from "../img/noData.png"
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];




function MyStoryList (props){
    // let userId = useParams();
    const[list,setList]=useState(Store.getStoryList())
    const [selectedItem, setSelectedItem] = useState("1")
    // const [selectedItemIndex, setSelectedItemIndex] = useState("")
    const [query, setQuery] = useState({status:1,search:'',id:''})
    const [pickerSelected, setPickerSelected] = useState("1")
    const [currentPage, setCurrentPage] = useState(0)
    const [tempoData, setTempoData] = useState(Store.getTempoData())
    const [offset, setOffset] = useState(0)
    const [perPage, setPerPage] = useState(5)
    const [show, setShow] = useState(false)
    const [checkData, setCheckData] = useState(Store.getCheckData())

    // useEffect(() => {
    //   setList(list)
    // }, [list])
    
    useEffect(() => {
      Action.getMyStoryList(query)
    }, [])

    useEffect(() => {
      Store.addListener(onStoreChange)
    }, []);

    const onStoreChange = () => {
      var list=Store.getStoryList()
      var tempoData=Store.getTempoData()
      var checkData=Store.getCheckData()

      setCheckData(checkData)
      setList(list)
      setTempoData(tempoData)
    }

   

    const goStoryDetail = (id) => {
      props.navigation('/StoryDetail/'+id)
    }

   

    const handleChange = (e,index,id) => {
      setPickerSelected('1')
      setQuery(prevState => ({
        ...prevState,
        status: '1'
      }));
      if(e.target.value==='2'){
        props.navigation('/PostStory/'+id)
      }
      else if(e.target.value==='3'){
        props.navigation('/StoryDetail/'+id)
      }
      else{
        var request={
          status:e.target.value,
          id:id
        }
        Action.myStoryListStatusOnChange(request)
      }
      
    }

    const queryStatusOnChange = (e,index,id) => {
      setPickerSelected(e.target.value)
      setQuery(prevState => ({
        ...prevState,
        status: e.target.value
      }));
      
      var request={
        status:e.target.value,
        id:id,
        search:''
      }
      Action.getMyStoryList(request)
    }

    const searchQueryOnChange=(value)=>{
      setQuery(prevState => ({
        ...prevState,
        search: value.target.value
      }));
    }

    const searchQueryAPI=()=>{
      Action.getMyStoryList(query)
    }

    const clickCheck=(index)=>{
      
      var request={
        index:index,
        data:false
      }

      
      if(checkData.check[index]){
        request.data=false
       
      }
      else{
        request.data=true
       
      }


      var checkArray=checkData.check
      if(checkArray!=undefined){
          const filtered = checkArray.filter(check => check == true);

          if(filtered != 0 && filtered.length>1){
              setShow(true)
          }
          else if(filtered==0 && request.data==true){
            setShow(true)
          }
          else if(filtered.length==1 && request.data==false){
            setShow(false)
          }
      }
      
      Action.clickCheck(request)
    }

    

    const myStoryListPaginationOnChange=(value) =>{        
      Action.myStoryListPagination(value)
      const selectedPage = value.selected;
      const offset = selectedPage * perPage;
      setCurrentPage(selectedPage)
      setOffset(offset)
      setShow(false)
    }

    const checkAllAction=() =>{        
      Action.checkAllAction()
    }

    const myStoryMultipleAction=(value) =>{  
      setShow(false)
      setCheckData(prevState => ({
        ...prevState,
        selectedNo: 0
      }));
      
      var id =[]
      for(var i=0;i<checkData.check.length;i++){
        if(checkData.check[i]){
          id.push(list[i]._id)
        }
      }
      var request={
        id:id,
        status:value
      }

      Action.myStoryMultipleAction(request)
    }

    return<div>
        <Header/>
        <StyleIt>
          {`  
              .pagination {
                  margin: 15px auto;
                  display: flex;
                  list-style: none;
                  outline: none;
                  width:100%
              }
              .pagination > .active > a{
                  background-color: #000 ;
                  border-color: #000 ;
                  color: #fff;
                  font-size:20px
              }
              .pagination > li > a{
                  border: 1px solid #000 ;
                  padding: 5px 10px;
                  outline: none;
                  cursor: pointer;
                  font-size:20px
              }
              .pagination > .active > a, .pagination > .active > span, .pagination > .active > a:hover, .pagination > .active > span:hover, .pagination > .active > a:focus, .pagination > .active > span:focus{
                  background-color: #000 ;
                  border-color: #000;
                  outline: none ;
                  font-size:20px
              }
              .pagination > li > a, .pagination > li > span{
                  color: #000;
                  font-size:20px
              }
              .pagination > li:first-child > a, .pagination > li:first-child > span, .pagination > li:last-child > a, .pagination > li:last-child > span{
                  border-radius: unset
              }  
              .intro:hover{
                  background:#efefef;
                  padding:10
              }             
          `}                
        </StyleIt>
        <div className='header'>

          <input value={query.search} onChange={searchQueryOnChange} className="searchBox" placeholder='write comment'/>
          <button onClick={searchQueryAPI}  className='searchButton'>Send</button>
          <select value={pickerSelected} className='pickerBox' name='item-selected' onChange={(e)=>queryStatusOnChange(e)}>
            <option value="1">Pending</option>
            <option value="2">Only Me</option>
            <option value="3">Approve</option>
            
          </select>

          {list.length===0 ?
            <div className='noDataBox'>
              <img src={noData} className='noData'/>
            </div>
            :
            <div> 
              {list.map((value,index)=>{
                return <div className='storyBox' 
                key={index} style={{marginBottom:20,borderBottom:'1px solid #000',paddingBottom:20}}>
                  <h1>{value.title}</h1>
                  <p>{value.check}</p>
                  {value.text.length>800 ?
                    <div className='clearfix'>
                      <div className='storyContentBox1'>
                      
                        <select className='pickerStatus' name='item-selected' value={selectedItem} onChange={(e)=>handleChange(e,index,value._id)}>
                          <option value="1">Select</option>
                          <option value="2">Edit</option>
                          <option value="3">Detail</option>
                          <option value="4">Delete</option>
                          {pickerSelected!=='2' && pickerSelected!== 2 ? <option value="5">Only Me</option>: null}
                        
                        
                          {pickerSelected!=='3' && pickerSelected!== 3 && pickerSelected!=='1' && pickerSelected!== 1  ? <option value="7">Publish</option>: null}
                          
                        </select>

                      </div>
                      <div className='storyContentBox3'>
                        
                        {checkData.check[index] ? 
                          <div onClick={()=>clickCheck(index)} className='checkdIcon'/>
                          : 
                          <div onClick={()=>clickCheck(index)} className='checkIcon'/>
                        }

                        
                      </div>
                      
                      <div className='storyContentBox2'>
                        <p className='storyContent'>{value.text.substring(0, 800)} ...<a>See More</a></p>
                      </div>
                    </div>
                    
                    :
                    <div className='clearfix'>
                      <div className='storyContentBox1'>
                        
                        <select className='pickerStatus' name='item-selected' value={selectedItem} onChange={(e)=>handleChange(e,index,value._id)}>
                          <option value="1">Select</option>
                          <option value="2">Edit</option>
                          <option value="3">Detail</option>
                          <option value="4">Delete</option>
                          {pickerSelected!=='2' && pickerSelected!== 2 ? <option value="5">Only Me</option>: null}
                          {pickerSelected!=='3' && pickerSelected!== 3 && pickerSelected!=='1' && pickerSelected!== 1  ? <option value="7">Publish</option>: null}
                        </select>

                      </div>

                      <div className='storyContentBox3'>
                        
                        {checkData.check[index] ? 
                          <div onClick={()=>clickCheck(index)} className='checkdIcon'/>
                          : 
                          <div onClick={()=>clickCheck(index)} className='checkIcon'/>
                        }

                      </div>
                      
                      <div className='storyContentBox2'>
                        <p className='storyContent'>{value.text}</p>
                      </div>
                    </div>
                    
                  }

                </div>
              })}

              <div className='pagBox'>
                <ReactPaginate
                  previousLabel={"<"}
                  nextLabel={">"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={tempoData.pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={myStoryListPaginationOnChange}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                  forcePage={currentPage}
                  currentPage={currentPage}
                />
              </div>

            </div>
          }

          

          
            
        </div>

        {show && list.length!=0?                            
          <div className='actionBottom'>
            <div className='clearfix'>
              <div className='actionBottom_1'>
                {tempoData.checkAll ? 
                  <div onClick={checkAllAction} className='checkdIcon'/>
                  : 
                  <div onClick={checkAllAction} className='checkIcon'/>
                }
              </div>

              <div className='actionBottom_1'>
                {checkData.selectedNo}
              </div>
              
              {pickerSelected!=='2' ?
                <div className='actionBottom_1'>
                  <button onClick={()=>myStoryMultipleAction(1)}>Only Me</button>
                </div>
                :
                null
              }
              
              
              <div className='actionBottom_1'>
                {pickerSelected !='1' ?
                  <button onClick={()=>myStoryMultipleAction(2)}>Publish</button>
                  :
                  null
                }
                
              </div>

              <div className='actionBottom_2'>
                <button onClick={()=>myStoryMultipleAction(3)}>Delete</button>
              </div>


            </div>
          </div>
          :
          null

        }
    </div>
}

export default withNavigateHook(MyStoryList)