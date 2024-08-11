import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import {Hooksregisters} from "../../../../hooks/hooksRegister/hooksregister"
import img from "../../../../images/defultPic.png"
import { Link } from 'react-router-dom'
import Left from "../../../../page/homePage/left"
import "../../yourProfile.css"
import TextOfThePost from "./textOfThePost"
import { MoonLoader} from "react-spinners";
import Right from "../../../../page/homePage/right"
const YourProfile = () => {
    const { id } = useParams()
    // console.log(id)
    const [Urprofile, setProfile] = useState([])
const [backAndFourth,setBackAndFourth] = useState(false)
const {dispatch,user} = Hooksregisters()
const photo = Urprofile && Urprofile.photo
    const images = require.context('../../../../images', true);
    const imageList = images.keys().filter(im => im.includes(photo)).map(image => images(image))
    const [unfollow, setUnfollow] = useState(false)
    const [replycomments,setReplyComments] = useState([])
    const [loding, setLoding] = useState(false)
    const [GetMyLikes, setGetMyLikes] = useState([])
    const [noText, setNoText] = useState(false)

    const funLogin = async () => {
      const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/getuser/${id}`)
      const json = await response.json()
    setProfile(json)
    // console.log(json)
      }//get ur user from the id paramas
      useEffect(() => {
        return () => {
                        funLogin()
          }
          
          
      }, [user])
    
    const followUpdate = async (e) => {
        e.preventDefault()
        const followersResponse = await fetch((`${process.env.REACT_APP_APi_LINK}/clone/followersUpdate/${id}`)
        , {
          headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          method: 'POST'
          
            })
        
        const followerstjson = await followersResponse.json()
        if (followersResponse.ok) {
            funLogin()
    }
        const followingtResponse = await fetch((`${process.env.REACT_APP_APi_LINK}/clone/followingUpdate/${id}`)
        , {
          headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          method: 'POST'
          
        })
    
        const followingJson = await followingtResponse.json()
        if (followingtResponse.ok) {
            funLogin()
    }
    }//follow the users
    const followDelete = async (e) => {
        e.preventDefault()
        const followersResponse = await fetch((`${process.env.REACT_APP_APi_LINK}/clone/followersDelete/${id}`)
        , {
          headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          method: 'DELETE'
          
            })
        
        const followerstjson = await followersResponse.json()
        if (followersResponse.ok) {
            funLogin()
    }
        const followingtResponse = await fetch((`${process.env.REACT_APP_APi_LINK}/clone/followingDelete/${id}`)
        , {
          headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          method: 'DELETE'
          
        })
    
        const followingJson = await followingtResponse.json()
        if (followingtResponse.ok) {
            funLogin()
    }
    }//unfollow the users
    const replyComments = async (e) => {
        if (!user) {
          return 
        }
        const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/getuser/${id}`)
        const json = await response.json()
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        const oks = await json?.idOfThePost?.toReversed()?.map(ress =>`${process.env.REACT_APP_APi_LINK}/clone/texts/getReplies/${ress}`)
        const promisidz = oks?.map(url => fetch(url).then(response => response.json()))
        const fetcPromisidz = await Promise?.all(promisidz).catch((err) => console.log(err))
        setReplyComments(fetcPromisidz.flat());
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        const oksz = await fetcPromisidz?.map(ress => `${process.env.REACT_APP_APi_LINK}/clone/getuserers/${ress?.idText}`)
      const fetchPromises = await oksz?.map(url => fetch(url));
      await Promise.all(fetchPromises)
      .then(responses => Promise.all(responses?.map(response => response.json())))
      .then(data => {
        // Process the data
          setGetMyLikes(data.flat())
          setNoText(data.length===0)
        setLoding(data.flat().length > 0)
      })
      }
      //we get the textS from the account
      useEffect(() => {
          if (user) {
            replyComments()
        }
      }, [Urprofile])
return (
    <div className='homePageAll'>
        {/* <div className='TheLeft'> */}
            <Left Urprofile={Urprofile} setBackAndFourth={setBackAndFourth} backAndFourth={backAndFourth}/>
        {/* </div> */}
        
            <div className='center'>
              <div className='containerCenter'>
                <div className='theNav'>
                <div>
                    <Link className='linkUrProfile' to={"/"}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                    </div>
                    <div className='nameAndPostPro'>
                        <span className='nameProfile'>{user?.name}</span>
                    <span>{user?.idOfThePost?.length+user?.myComments?.length} posts</span>
                    </div>
                </div>
                <div className='afterTheNav'>
                    <div className='backgroundPhoto'></div>
                    <div className='profilPicAndBtn'>
                        <img loading='lazy' className='imgProfile' src={img === user?.photo ? photo : imageList[0]} />
                        {user?._id === user?._id ? 
                          <Link to={`/editProfile/${id}`}>
                          <button className='btnSetProfile'>Edit Profile</button>
                      </Link>
                        :
                        
                            
                        user?.follwoing?.includes(user?._id) ?
                                    <form onSubmit={followDelete}>
                                        <button onMouseLeave={() => setUnfollow(false)} onMouseEnter={() => setUnfollow(true)}
                                        className={unfollow?`btnSetProfile unfollow`:`btnSetProfile following`}>{unfollow?"Unfollow":"following"}</button>
                                    </form>
                                    
                                    :
                                        <form onSubmit={followUpdate}>
                                    <button className='btnSetProfile follow'>Follow</button>
                                </form>
                            
                           
                    
                        
                    }
                    
                    
                    </div>
                    <div className='profileNames'>
                        <span className='nameProfile'>{user?.name}</span>
                    <span className='userNameProfile'>@{user?.userName}</span>
                    <span className='bioProfile'>{user?.bio}</span>
                    </div>
                    <div className='profileNames'>
                        {/* <p>{"Joined "+formatDistanceToNow(new Date(user?.createdAt), { addSuffix: true })}</p> */}
                    </div>
                <div className='followers'>
                    <Link to={`/following/${user?._id}`}>
                        <p className='textOfFollow'><span className='numberOfFollow'>{user?.follwoing?.length}</span> follwoing</p>
                    </Link>
                    
                    <Link to={`/followers/${Urprofile?._id}`}>
                        <p className='textOfFollow'><span className='numberOfFollow'>{user?.followers?.length}</span> followers</p>
                    </Link>
                    
                        
                    </div>
                    <div className='gengersTwit'>
                    <Link className='postsProfile' to={`/profile/${id}`}>
                        <div className='MainDivPost'>
                            <p className='btnProfile'>Posts</p>
                            <div className='borderlinePosts'></div>
                        </div>
                            
                            
                        </Link>
                        <Link className='postsProfile' to={`/replies/${id}`}>
                            <p className='btnProfile'>Replies</p>
                        </Link>
                        <Link className='postsProfile' to={`/likes/${id}`}>
                            <p className='btnProfile'>Likes</p>
                        </Link>
                    
                    
                    
                    </div>
                    <div className='borderline profile'></div>
                    <div>
                    <div>
                    {noText?"" :!loding ?
                            <div className='moonLoader'>
                              <MoonLoader color="#01b3ff" size={30}/>
                              </div>
                            :replycomments?.map((res,idx) => (
                        <TextOfThePost res={res} idx={idx}
                            replycomments={replycomments}
                            GetMyLikes={GetMyLikes}
                            funLogin={funLogin}
                            
                        />
                        
                    ))}
                    
                </div>
                    
                </div>
                </div>
            </div>
          
        
       
        </div>
        <div className='right'>
            <div onClick={(()=>setBackAndFourth(false))} className='right'>
            <Right />
        </div>
        </div>
    </div>
)
}

export default YourProfile
