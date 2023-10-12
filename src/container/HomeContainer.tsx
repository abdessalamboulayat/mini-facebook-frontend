import { useEffect, useState } from "react";
import NavBar from "../components/navBar/Navbar";
import { AddPostContainer } from "./AddPostContainer";
import useGetPosts from "../hooks/post/useGetPosts";
import { CardContainer } from "./CardContainer";
import { STATE } from "../states";
import Spinner from "../components/spinner/Spinner";
import { Message } from "../components/modal/Message";


export const HomeContainer = () => {
    
  const [search, setSearch] = useState<string>("");
  const changeSearch = (search: string) => {
         console.log(search);
        setSearch(search);
   }
  const { status, posts, error } = useGetPosts(search);
  console.log(status);  
  return(
    <>
    <NavBar search={search} changeSearch={changeSearch} />
    <div className='flex flex-col items-center pl-20 pr-20 dark:bg-black'>
    <AddPostContainer/>
    {
      status===STATE.LOADING ? <Spinner/> :
            posts.map((post,index)=>{
             return <CardContainer key={index}  post={post} />
            })
    }
    {
      status===STATE.ERROR && <Message action={STATE.ERROR} message="Server Not Responding please try earlier" />
    }
    </div>
    </>
  )
}