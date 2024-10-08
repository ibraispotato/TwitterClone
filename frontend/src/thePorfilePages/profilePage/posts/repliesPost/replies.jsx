import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import {Hooksregisters} from "../../../../hooks/hooksRegister/hooksregister"
import img from "../../../../defultPic.png"
import { Link } from 'react-router-dom'
import Left from "../../../../page/homePage/left"
import TextOfTheReplies from './textOfTheReplies'
import { MoonLoader} from "react-spinners";
import Right from "../../../../page/homePage/right"
import "../../yourProfile.css"
const YourProfile = () => {
  const { id } = useParams()
  const [Urprofile, setProfile] = useState([])
  const [backAndFourth,setBackAndFourth] = useState(false)
  const {dispatch,user} = Hooksregisters()
  const photo = Urprofile && Urprofile.photo
  const [replycomments, setReplyComments] = useState([])
  const [getCommentsFromComments, setGetCommentsFromComments] = useState([])
  const [getCommentsFromPost, setGetCommentsFromPost] = useState([])
  const [GetProfileOfThePost, setGetProfileOfThePost] = useState([])
  const [loding, setLoding] = useState(false)
  const [unfollow, setUnfollow] = useState(false)
  const maps = getCommentsFromPost?.map(((res, index) => res === null ? getCommentsFromComments?.[index] : res))
  const [MYprofiles, setProfiles] = useState(null)
const [noText, setNoText] = useState(false)
const [trues,setTrue] = useState(false)

const funLogins = async () => {
    const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/getuser/${id}`)
    const json = await response.json()
    setProfile(json)

    }//we get the users
  useEffect(() => {
  
              funLogins()
            
            
    }, [])
    //////////////////////////////////////Get comments from COMMENTS OF THE POST//////////////////////////////////////////////////
      const GETREPLYFROMPOST = async () => {
        /////////////////////////we get the users from the id paramas//////////////////////////////////////////////////////////////////////
        const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/getuser/${id}`)
        const json = await response.json()
        setProfile(json)
    ///////////////////////////////we get the comment of the account from the user account////////////////////////////////////////////////////////////////////
        const okse = await json?.myComments?.map(ress =>`${process.env.REACT_APP_APi_LINK}/clone/replying/getreplyingComments/${ress}`)
        const promisidz = okse?.map(url => fetch(url).then(response => response.json()))
        const fetcPromisidz = await Promise?.all(promisidz).catch((err) => console.log(err))
        setReplyComments(fetcPromisidz.reverse())
        ////////////////////////////////////////GET COMMENTS FROM REPLY/////////////////////////////////////////////////////////////////
        const oks = await fetcPromisidz.map(ress => fetch(`${process.env.REACT_APP_APi_LINK}/clone/texts/getReplies/${ress?.idText}`).then(response => response.json()));
        const GetReplyPromis = await Promise?.all(oks).catch((err) => console.log(err))
        const getReplyFetcPromis = await Promise.all(GetReplyPromis.flat())
        setGetCommentsFromPost(getReplyFetcPromis.flat().reverse())
        ////////////////////////////////////////GET reply FROM comments/////////////////////////////////////////////////////////////////
        const oko = await fetcPromisidz.map(ress => fetch(`${process.env.REACT_APP_APi_LINK}/clone/replying/getreplyingComments/${ress?.idText}`).then(response => response.json()));
        const fetchPromises = await Promise.all(oko).catch((err) => console.log(err))
        const promis = await Promise.all(fetchPromises);
        setGetCommentsFromComments(promis.flat().reverse())
        ////////////////////////////////////////GET users FROM comments/////////////////////////////////////////////////////////////////
        const oksz = await fetcPromisidz.map(ress => fetch(`${process.env.REACT_APP_APi_LINK}/clone/getuserers/${ress?.idOfTheReplyer}`).then(response => response.json()));
        const fetchPromisesz = await Promise.all(oksz).catch((err) => console.log(err))
        const pro = await Promise.all(fetchPromisesz);
            // Process the data
            setProfiles(pro?.flat().reverse())        
        ///////////////////////////////////////get user from the comments//////////////////////////////////////////////////////////////////////////////
        const promisid = await getReplyFetcPromis?.map(((res, index) => res === null ? promis?.[index] : res))?.map(ress => `${process.env.REACT_APP_APi_LINK}/clone/getuserers/${ress?.idOfTheReplyer || ress?.idText}`)
        const ah = promisid.map(ress => fetch(ress).then(response => response.json()));
        const fetcPromisid = await Promise.all(ah).catch((err) => console.log(err))
        const proz = await Promise.all(fetcPromisid);
        
        setGetProfileOfThePost(proz?.flat().reverse())
        console.log(GetReplyPromis)
        setNoText(proz?.flat()?.length===0)
        setLoding(proz?.flat()?.length > 0)
      }
      useEffect(() => {
        
          GETREPLYFROMPOST()
        
          
        
          
      }, [])
      const followUpdate = async (e) => {
      setTrue(true)

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
          funLogins()
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
          funLogins()
    }
    }//follow user
    const followDelete = async (e) => {
      setTrue(false)

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
          funLogins()
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
          funLogins()
    }
    }//unFollow user
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
                    <span className='nameProfile'>{Urprofile?.name}</span>
                    <span>{Urprofile?.idOfThePost?.length+Urprofile?.myComments?.length} posts</span>
                </div>
            </div>
            
            
                <div className='afterTheNav'>
                    <div className='backgroundPhoto'></div>
                    <div className='profilPicAndBtn'>
                    <img loading='lazy' className='imgProfile' src={Urprofile?.photo?.map((res)=> res.url)?.[0]||Urprofile?.photo} />
                        {Urprofile?._id === user?._id ? 
                          <Link to={`/editProfile/${id}`}>
                          <button className='btnSetProfile'>Edit Profile</button>
                      </Link>
                        :
                        
                            
                                Urprofile?.follwoing?.includes(user?._id) ?
                                    <form onSubmit={followDelete}>
                                        <button onMouseLeave={() => setUnfollow(false)} onMouseEnter={() => setUnfollow(true)}
                                        className={unfollow?`btnSetProfile unfollow`:`btnSetProfile following`}>{unfollow?"Unfollow":"following"}</button>
                                    </form>
                                    
                                    :
                                        <form onSubmit={followUpdate}>
                                    <button disabled={trues} className='btnSetProfile follow'>Follow</button>
                                </form>
                            
                           
                    
                        
                    }
                    </div>
                    <div className='profileNames'>
                        <span className='nameProfile'>{Urprofile?.name}</span>
                    <span className='userNameProfile'>@{Urprofile?.userName}</span>
                    <span className='bioProfile'>{Urprofile?.bio}</span>
                    </div>
                    <div className='profileNames'>
                    </div>
                <div className='followers'>
                    <Link to={`/following/${Urprofile?._id}`}>
                        <p className='textOfFollow'><span className='numberOfFollow'>{Urprofile?.follwoing?.length}</span> follwoing</p>
                    </Link>
                    
                    <Link to={`/followers/${Urprofile?._id}`}>
                        <p className='textOfFollow'><span className='numberOfFollow'>{Urprofile?.followers?.length}</span> followers</p>
                    </Link>
                    
                        
                    </div>
                    <div className='gengersTwit'>
                <Link className='postsProfile' to={`/profile/${id}`}>
                    <div className='MainDivPost'>
                        <p className='btnProfile'>Posts</p>
                    </div>
                        
                        
                    </Link>
                    <Link className='postsProfile' to={`/replies/${id}`}>
                        <div className='MainDivPost'>
                        <p className='btnProfile'>Replies</p>
                        <div className='borderlinePosts'></div>
                    </div>
                    </Link>
                    <Link className='postsProfile' to={`/likes/${id}`}>
                        <p className='btnProfile'>Likes</p>
                    </Link>
                
                
                
                </div>
                <div className='borderline profile'></div>
        <div>
          {noText?"" :!loding ?
            <div className='moonLoader'>
              <MoonLoader color="#01b3ff" size={30}/>
              </div>
            :
            replycomments?.map((res, idx) => (
              maps.map((resMap, indexMap) => (
                
            <TextOfTheReplies res={res} idx={idx}
              replycomments={replycomments}
              // replyComments={replyComments}
              setGetCommentsFromComments={setGetCommentsFromComments}
              setGetCommentsFromPost={setGetCommentsFromPost}
              setGetProfileOfThePost={setGetProfileOfThePost}
              getCommentsFromComments={getCommentsFromComments}
              getCommentsFromPost={getCommentsFromPost}
              GetProfileOfThePost={GetProfileOfThePost}
              GETREPLYFROMPOST={GETREPLYFROMPOST}
                  resMap={resMap}
                  indexMap={indexMap}
                  funLogins={funLogins}
                  MYprofiles={MYprofiles}
                  
            />
              ))
            )[idx])
                }
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
