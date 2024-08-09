/* eslint-disable jsx-a11y/alt-text */
import React, {useState,useEffect,useRef} from 'react'
import {useTextContext} from "../../../hooks/textContext"
import { Hooksregisters } from "../../../hooks/hooksRegister/hooksregister"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment,faRetweet,faHeart,faEllipsis,faQuoteLeft,faArrowUpFromBracket,faBookmark, faTrash } from '@fortawesome/free-solid-svg-icons'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player';
const ChildrenHomeTexts = ({ res,idx,GetAllText,Urprofiles,setProfiles,funLogin }) => {
    const { user } = Hooksregisters()
    const [clickRetweet,setClickRetweet] = useState(false)
    const { dispatchs } = useTextContext()
    const images = require.context('../../../images', true);
    const imageList = images.keys().map(image => images(image))
    const [threeDotsBtn, setThreeDotsBtn] = useState(false)
    const playerRef = useRef(null);
    const [messegeDelete,setMessegeDelete] = useState(null)
    const [MessegeLikes,setMessegeLiked] = useState(null)

  const DeleteLikes = async (e) => {
    e.preventDefault()
    const TextDeleteResponse = await fetch(`http://localhost:4000/clone/texts/delete/${res?._id}`, {
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      method: 'DELETE'
      
    })
    const TextDeleteJson = await TextDeleteResponse.json()

  if (TextDeleteResponse.ok) {
    GetAllText()
    funLogin()
    }
    
    const MyTextDeleteResponse = await fetch(`http://localhost:4000/clone/deleteMyLikes/${res?._id}`, {
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      method: 'DELETE'
      
    })
    const MyTextDeleteJson = await MyTextDeleteResponse.json()

  if (TextDeleteResponse.ok) {
    GetAllText()
    funLogin()
    setMessegeLiked("You UnLiked The Tweet :( ")

    }
    
  }//delete a likes
  const AddLikes = async (e) => {
    e.preventDefault()
    ///////////////////////////////////TEXT LIKES//////////////////////////////////////////////////////////////////////////////
    const TextLikesResponse = await fetch((`http://localhost:4000/clone/texts/${res?._id}`)
    , {
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      method: 'POST'
      
    })
    const Textjson = await TextLikesResponse.json()
  if (TextLikesResponse.ok) {
      GetAllText()
      funLogin()
    }
    //////////////////////////////////////MY PROFILE LIKES TEXT/////////////////////////////////////////////////////////////////////////////
    const myLikesTextResponse = await fetch((`http://localhost:4000/clone/updateMyLikes/${res?._id}`)
    , {
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      method: 'POST'
      
    })

    const myLikesJson = await myLikesTextResponse.json()
  if (myLikesTextResponse.ok) {
    GetAllText()
    setMessegeLiked("You Liked The Tweet :) ")

    funLogin()
    }
  }//add a like
  const UpdateReTweet = async (e) => {
    e.preventDefault()
    ///////////////////////////////////TEXT ReTweet//////////////////////////////////////////////////////////////////////////////
    const TextLikesResponse = await fetch((`http://localhost:4000/clone/texts/updateReTweet/${res?._id}`)
    , {
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      method: 'POST'
      
    })
    const Textjson = await TextLikesResponse.json()

  if (TextLikesResponse.ok) {
      GetAllText()
    setClickRetweet(false)
    funLogin()
    
    }
    //////////////////////////////////////MY PROFILE LIKES TEXT/////////////////////////////////////////////////////////////////////////////
    const myLikesTextResponse = await fetch((`http://localhost:4000/clone/updateMyTweet/${res?._id}`)
    , {
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      method: 'POST'
      
    })

    const myLikesJson = await myLikesTextResponse.json()
  if (myLikesTextResponse.ok) {
    GetAllText()
    setMessegeLiked("You Reposted The Tweet :) ")

    // setClickRetweet(false)
    funLogin()
    
    }
  }//update Retweet
  const DeleteReTweet = async (e) => {
    e.preventDefault()
    const TextDeleteResponses = await fetch(`http://localhost:4000/clone/texts/deleteReTweet/${res?._id}`, {
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      method: 'DELETE'
      
    })
    const TextDeleteJsons = await TextDeleteResponses.json()
  if (TextDeleteResponses.ok) {
    GetAllText()
    setClickRetweet(false)
    funLogin()
    
    }
    
    const MyTextDeleteResponse = await fetch(`http://localhost:4000/clone/deleteMyTweet/${res?._id}`, {
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      method: 'DELETE'
      
    })
    const MyTextDeleteJson = await MyTextDeleteResponse.json()

  if (MyTextDeleteResponse.ok) {
    GetAllText()
    setMessegeLiked("You UnReposted The Tweet :( ")
    funLogin()
    
    }
    
  }//delete Retweet
  const deleteTexts = async (e) => {
    e.preventDefault()
  const response = await fetch(`http://localhost:4000/clone/texts/deteText/${res?._id}`,{
    method: 'DELETE',
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
  })
  const json = await response.json()

if (response.ok) {
  setThreeDotsBtn(false)
  setMessegeDelete("Post Has Been Deleted")
  dispatchs({ type: "DELETE", payload: json })
}
const MyTextDeleteResponse = await fetch(`http://localhost:4000/clone/deleteMyPost/${res?._id}`, {
  headers: {
    // 'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`
  },
  method: 'DELETE'
  
})
const MyTextDeleteJson = await MyTextDeleteResponse.json()

if (MyTextDeleteResponse.ok) {
setTimeout(() => {
  GetAllText()
}, 4000);
setThreeDotsBtn(false)
funLogin()
}

}// deelete a text
setInterval(() => {
  setMessegeDelete(null)
}, 4000);//after 4s the messege disappears
useEffect(() => {
  const time = setInterval(() => {
    setMessegeLiked(null)
    
  }, 4000);
  return ()=>clearTimeout(time)
  },[])//fix the glitche messege so it dont go fast
  return (
      <div key={idx} className='allPosts'>      
        <div>
          {Urprofiles&&Urprofiles?.map((resProfiles,theIndex) => (
        <div key={idx} className='twitterPostAll'>
          <div className='motherOfAccountNameTwitterPost'>
                <div className='accountNameTwitterPost'>
                
            <div className='photoUser'>
            <Link key={theIndex} to={`profile/${resProfiles?._id}`}>
                      <img loading='lazy' key={theIndex} className='img' src={imageList[0] === resProfiles?.photo ? imageList[0] :
                        `http://localhost:4000/${resProfiles?.photo}`} />
            </Link>
                  </div>
                  <Link className='linkUser' to={`profile/${resProfiles?._id}`}>
            <div className='allOfTheTextTweet'>
              <div className='motherTweets' >
                <div key={theIndex} className='userTweet'>
                  <span key={theIndex} className='nameOfTheTweet'>{resProfiles?.name}</span>
                <span className='userNameText' key={theIndex}>@{resProfiles?.userName}</span>
                </div>
                <span className='dotBTn'>•</span>
                <span className='dateHomeText'>{formatDistanceToNow(new Date(res?.createdAt))}</span>
                      </div>
    <Link className='linkTweet' to={`/tweet/${res?._id}`}>
                      
              <div>
              <span key={idx} className='nameOfTheTweet'>{res?.Text}</span>
                        </div>
            </Link>
                        
            </div>
            </Link>
                </div>
                
              <Link>
              
                  <div className='iconThreeDots'>
                    {/* /////////////////////////back and fourth on the three dots on the post to delete the text////////////////////////////////// */}
                    <button onClick={() =>user?._id===res?.idText[0]?setThreeDotsBtn((prev) => !prev):"s"} className='threeDotsBtn'>
                      <span className='ThreeDots'>
                        <FontAwesomeIcon icon={faEllipsis}/>
                      </span>
                      
                    </button>
              
            </div>
            <div>
              {threeDotsBtn? 
              <div className='iconAndTextRepost delete'>
              {/* //////////////////////////delete a text/////////////////////////////////////////// */}
                <button onClick={deleteTexts} className='btnRetweets delete'>
                  <FontAwesomeIcon icon={faTrash} />
                  <span>Delete</span>
                </button>
              
              </div>
              
              
              :""}
            </div>
                </Link>
                
          </div>
        </div>
      ))[idx]}
      <div className='divOfTwitterPhoto'>
              <div className='anotherdivOfTwitterPhoto'>
        <div className='anothers'>
              {!res?.photo?"":res?.photo?.split("-")[2]?.includes(".mp4")?<ReactPlayer ref={playerRef} url={`http://localhost:4000/${res?.photo}`} controls={true} />:<img loading='lazy' key={idx} className='twitterPhoto' src={`http://localhost:4000/${res?.photo}`} />}              
        </div>
      </div>
      </div>
        </div>
        
      {/* </Link> */}
      <div className='bottomIcons'>
        <div className='iconsTweets'>
        <div className='iconTweet comment'>
          <Link to={`/replying/${res?._id}/${res?.idText}`}>
          <button className='btnReTweet'>
                <span className='SpanReTweet comment'>
                  <FontAwesomeIcon icon={faComment} />
                  <p>{res?.comments?.length}</p>
                </span>
              </button>
          </Link>
              
            </div>
            {/* /////////////////////////if theres a tweet we unrettwet it////////////////////////////////////////////// */}
        {!res?.retweet.includes(user?._id) ?
          <>
            <div className='ope'>
            {clickRetweet ?
              <div>
                <div className='iconAndTextRepost'>
                  <form onClick={UpdateReTweet}>
                    <button className='btnRetweets'>
                      <FontAwesomeIcon icon={faRetweet} />
                      <span>Repost</span>
                    </button>
                  </form>
                  </div>
                  <Link to={`/post/${res?._id}/${res?.idText}`}>
                <div className='iconAndTextRepost'>
                    <button className='btnRetweets'>
                      <FontAwesomeIcon icon={faQuoteLeft} />
                      <span>Qoute</span>
                    </button>
                    </div>
                    </Link>
              </div>
              :
              <div className='dis'></div>}
            </div>
            <div className='iconTweet reTweet'>
              
              <button onClick={() => setClickRetweet(prev => !prev)} className='btnReTweet'>
                <span className='SpanReTweet myTweet'>
                  <FontAwesomeIcon icon={faRetweet} />
                  <p>{res?.retweet?.length+res.QouteTweet.length}</p>
                </span>
              </button>
            </div>
          
          </>
          :
          
          <div className='iconTweet ReTweet'>
          <div className='ope'>
            {clickRetweet ?
              <div>
                <div className='iconAndTextRepost'>
                  <form onClick={DeleteReTweet}>
                    <button className='btnRetweets'>
                      <FontAwesomeIcon icon={faRetweet} />
                      <span>Undo Repost</span>
                    </button>
                  </form>
                </div>
                <div className='iconAndTextRepost'>
                <Link to={`/post/${res?._id}/${res?.idText}`}>
                <div className='iconAndTextRepost'>
                    <button className='btnRetweets'>
                      <FontAwesomeIcon icon={faQuoteLeft} />
                      <span>Qoute</span>
                    </button>
                    </div>
                    </Link>
                </div>
              </div>
              :
              <div className='dis'></div>}
            </div>
            <div className='iconTweet reTweet'>
              
              <button onClick={() => setClickRetweet(prev => !prev)} className='btnReTweet'>
                <span className='SpanReTweet ActivemyTweet'>
                  <FontAwesomeIcon icon={faRetweet} />
                  <p>{res?.retweet?.length+res.QouteTweet.length}</p>
                </span>
              </button>
            </div>
            
            </div>
          
}
{/* ///////////////if theres a like we got unlike component/////////////////////////////// */}
        {res?.likes?.includes(user?._id) ?
              <form  onSubmit={DeleteLikes}>
              <div className='iconTweet hearts'>
                {/* <FontAwesomeIcon icon={faHeart} /> */}
                <button className='btnHeart'>
                  <span className='SpanHeart myHeart'>
                    <FontAwesomeIcon icon={faHeart} />
                  <span>{res?.likes?.length}</span>
                  </span>
              
                </button>
                  
                
                </div>
              </form>
          :
         
          <form onSubmit={AddLikes}>
          <div className='iconTweet heart'>
            <button className='btnHeart'>
              <span className='SpanHeart'>
                <FontAwesomeIcon icon={faHeart} />
                
              <span>{res?.likes?.length}</span>
              </span>
         
            </button>
             
            
            </div>
            </form>
           
          }
          
          
        </div>
        <div className='copyBtn'>
          <div className='iconThreeDots'>
            {/* //////////////////////// to copy the link of the post //////////////////////////// */}
            <button onClick={() => navigator.clipboard.writeText(`http://localhost:3000/tweet/${res?._id}`)}
              className='threeDotsBtn'>
                      <span className='ThreeDots'>
                        <FontAwesomeIcon icon={faArrowUpFromBracket}/>
                      </span>
                      
                    </button>
              
            </div>
          
        </div>
      </div>
      <div className={`${messegeDelete===null ? "go":"err"}`}>
         {messegeDelete && <p>{messegeDelete}</p>}
      </div>
      <div className={`${MessegeLikes===null ? "go":"err"}`}>
         {MessegeLikes && <p>{MessegeLikes}</p>}
      </div>
      </div>
     
  )
}

export default ChildrenHomeTexts
