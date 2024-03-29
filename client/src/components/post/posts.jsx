import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Stack } from "@chakra-ui/react";
import { PostLoading } from "./post-loading";
import PostItem from "./post-item";
import { getPosts } from "../../api/posts";
import { BASE_URL } from "../../config";

export const Posts = ({ posts }) => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(2);
  const [Posts, setPosts] = useState(posts)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}api/posts/page/1`);
        const data = await response.json();
        setItems(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const fetchMoreData = async () => {
    await fetch(`${BASE_URL}api/posts/page/${index}`)
      .then(async (res) => {
        const data = await res.json();

        setPosts((prevItems) => [...prevItems, ...data])
        setItems((prevItems) => [...prevItems, ...data]);

        data.length > 0 ? setHasMore(true) : setHasMore(false);
      })
      .catch((err) => console.log(err));

    setIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <>
      {
        posts.length > 0 ? (
        
              <Stack>
                {posts.map((item, i) => (
                  <PostItem post={item} key={i} />
                ))}
              </Stack>
        
        )
        :(
          items.length === 0 ? (
            <PostLoading />
          ) : (
            <InfiniteScroll
              dataLength={items.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<PostLoading />}
            >
              <Stack>
                {items.map((item, i) => (
                  <PostItem post={item} key={i} />
                ))}
              </Stack>
            </InfiniteScroll>
          )
          
        )
      }

    </>
  );
};