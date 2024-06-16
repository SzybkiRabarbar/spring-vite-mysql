import { useState } from 'react';
import UserImagePost from '../../components/user-image-post/UserImagePost'
import InfiniteScroll from 'react-infinite-scroll-component';
import userImageContentMock from '../../content/userImageContentMock';
import UserImageContent from '../../interfaces/UserImageContent';

const AddedImages = () => {
  const [items, setItems] = 
    useState<UserImageContent[]>(Array.from(
      { length: 3 }, (_, i) => userImageContentMock(i)));

  const fetchMoreData = () => {
    setTimeout(() => {
      const newItems = Array.from(
        { length: 3 }, (_, i) => userImageContentMock(items.length + i)
      );
      setItems([...items, ...newItems]);
    }, 10);
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {items.map((item) => (
          <div 
            key={item.id}
            style={{ display: 'flex',
                     justifyContent: 'center', 
                     alignItems: 'center' 
                    }}
          >
            <UserImagePost content={item}/>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default AddedImages;
