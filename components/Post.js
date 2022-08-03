import React, { useEffect, useState } from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import Moment from "react-moment";
import { async } from "@firebase/util";

const Post = ({ id, username, img, userImg, caption }) => {
  {
    console.log("this id ", id);
  }
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  // useEffect(
  //   () =>
  //     onSnapshot(
  //       query(
  //         collection(db, "posts", id, "comments"),
  //         orderBy("timestamp", "desc")
  //       ),
  //       (snapshot) => setComments(snapshot)
  //     ),
  //   [db]
  // );

  useEffect(() => {
    const unsubcribe = onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timeStamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );

    return unsubcribe;
  }, [db]);

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
      setLikes(snapshot.docs)
    );
  }, [db, id]);

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  console.log(hasLiked);
  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };
  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment(" ");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timeStamp: serverTimestamp(),
    });
  };
  return (
    <div className="bg-white my-5 border rounded-sm">
      {/* Header */}
      <div className="flex items-center p-5">
        <img
          src={userImg}
          className="rounded-full h-10 w-10 object-contain border p-1 mr-3"
        ></img>
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      {/* img */}
      <div className="flex justify-center items-center mx-auto">
        <img
          src={img}
          className="object-cover
      "
        ></img>
      </div>

      {/* button */}

      {session && (
        <div className=" flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                className="btn text-[#E32227]"
                onClick={likePost}
              ></HeartIconFilled>
            ) : (
              <HeartIcon className="btn" onClick={likePost} />
            )}

            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn " />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* caption */}

      <p className="p-3 truncate">
        {likes.length > 0 && (
          <p className="font-bold mb-1">{likes.length} likes</p>
        )}
        <span className="font-bold mr-2">{username}</span>
        {caption}
      </p>
      {/* comments */}

      {comments.length > 0 && (
        <div className="ml-10  h-20 overflow-y-scroll scrollbar-thumb-gray-400 scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img
                className="h-7 rounded-full"
                src={comment.data().userImage}
              ></img>
              <p className="text-sm flex-1">
                <span className="font-bold pr-2">
                  {comment.data().username}
                </span>
                {comment.data().comment}
              </p>

              <Moment fromNow className="text-xs pr-3">
                {comment.data().timeStamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* inputbox */}

      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-5" />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 border-none focus:ring-0 outline-none"
            placeholder="Add a comments..."
          ></input>
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
