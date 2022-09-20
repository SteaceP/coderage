import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  FC,
} from "react";

export interface IAuthor {
  username: string;
  email: string;
  id: number;
}
export interface ISubcomment {
  id: number;
  from_admin: boolean;
  createdAt: string;
  content: string;
  author: IAuthor | null;
}
export interface IComment {
  id: number;
  from_admin: boolean;
  createdAt: string;
  content: string;
  author: IAuthor | null;
  subcomments?: ISubcomment[];
}
export interface ICommentsData {
  commentsCount: Number;
  comments: IComment[];
}
export interface IUser {
  id: number;
  token?: string;
  username: string;
  email: string;
  confirmed?: boolean;
  blocked?: boolean;
  provider?: string;
  created_at?: Date;
  updated_at?: Date;
}

interface ICoreContext {
  commentsCount: Number;
  comments: IComment[];
  collapseReplies: boolean;
  loadingComments: boolean;
  errorHelperMessage: string | null;
  setContentID: (contentID: string) => void;
  loadMore: () => Promise<void>;
  apiURL: string;
  postReply: (cID: number, content: string) => Promise<boolean>;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  postComment: (content: string) => Promise<boolean>;
}
export interface IConfigContext {
  setUser: (user: IUser | null) => void;
  setContentID: (contentID: string) => void;
}

const defaultContext: ICoreContext = {
  commentsCount: 0,
  comments: [] as IComment[],
  collapseReplies: true,
  loadingComments: true,
  errorHelperMessage: null,
  setContentID: (contentID: string) => {},
  loadMore: async () => {
    return new Promise<void>((resolve) => resolve());
  },
  apiURL: "",
  postReply: async (cID: number, content: string) => {
    return new Promise<boolean>((resolve) => resolve(true));
  },
  user: null,
  setUser: (user: IUser | null) => {},
  postComment: (content: string) => {
    return new Promise<boolean>((resolve) => resolve(true));
  },
};

const defaultConfig: IConfigContext = {
  setUser: (user: IUser | null) => {},
  setContentID: (contentID: string) => {},
};

const CoreContext = createContext(defaultContext);
export const ConfigContext = createContext(defaultConfig);

interface ConfigProviderProps {
  children: React.ReactNode;
}

const ConfigProvider: FC<ConfigProviderProps> = (
  props: ConfigProviderProps
) => {
  const { setUser, setContentID } = useContext(CoreContext);
  return (
    <ConfigContext.Provider value={{ setUser, setContentID }}>
      {props.children}
    </ConfigContext.Provider>
  );
};

export interface ProviderProps {
  collapseReplies?: boolean;
  children: React.ReactNode;
  contentID?: string;
  apiURL?: string;
}

export const CommentsProvider: FC<ProviderProps> = (props: ProviderProps) => {
  const [commentsData, setCommentsData] = useState<ICommentsData>({
    commentsCount: 0,
    comments: [] as IComment[],
  });
  const [user, setUser] = useState<IUser | null>(null);
  const [loadingComments, setLoadingComments] = useState(true);
  const [errorHelperMessage, setErrorHelperMessage] = useState<string | null>(
    null
  );
  const [contentID, setContentID] = useState<string>(props.contentID || "");
  useEffect(() => {
    const fetchComments = async () => {
      const url = `${props.apiURL}/api/comment-manager/comments/${contentID}`;
      try {
        const res = await fetch(url);
        const data: any = await res.json();
        if (!res.ok) {
          throw data;
        }
        setCommentsData(data);
        setErrorHelperMessage(null);
      } catch (err) {
        console.log(err);
        setErrorHelperMessage("Something went wrong");
      } finally {
        setLoadingComments(false);
      }
    };
    if (contentID) {
      fetchComments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentID]);
  const loadMore = async () => {
    const start = commentsData.comments.length;
    const url = `${props.apiURL}/api/comment-manager/comments/${contentID}?start=${start}&ignoreCount=1`;
    try {
      const res = await fetch(url);
      const data: any = await res.json();
      if (!res.ok) {
        throw data;
      }
      setCommentsData({
        ...commentsData,
        comments: commentsData.comments.concat(data.comments),
      });
      setErrorHelperMessage(null);
    } catch (err) {
      console.log(err);
      setErrorHelperMessage("Something went wrong");
    }
  };
  const addSubcomment = (
    commentID: number,
    content: string,
    replyID: number
  ) => {
    const newReply: ISubcomment = {
      id: replyID,
      from_admin: false,
      content,
      createdAt: new Date().toISOString(),
      author: user,
    };
    const updatedComments = commentsData.comments.reduce((col, com) => {
      const input = com.id;
      if (input === commentID) {
        if (!com.subcomments) {
          com.subcomments = [];
        }
        com.subcomments.push(newReply);
      }
      return col.concat(com);
    }, [] as IComment[]);
    setCommentsData({
      ...commentsData,
      comments: updatedComments,
    });
  };
  const addComment = (content: string, commentID: number) => {
    const newComment: IComment = {
      id: commentID,
      content,
      createdAt: new Date().toISOString(),
      from_admin: false,
      author: user,
    };
    setCommentsData({
      ...commentsData,
      comments: [newComment, ...commentsData.comments],
    });
  };
  // Post reply and add to comment's list of subcomments
  const postReply = async (commentID: number, content: string) => {
    if (!user || !user.token) {
      return false;
    }
    const url = `${props.apiURL}/api/comment-manager/subcomments/${commentID}`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ content }),
      });
      const data: any = await res.json();
      if (!data.id) {
        throw data;
      }
      // Add reply.
      addSubcomment(commentID, content, data.id);
      setErrorHelperMessage(null);
      return true;
    } catch (err) {
      console.log(err);
      setErrorHelperMessage("Something went wrong");
      return false;
    }
  };
  const postComment = async (content: string) => {
    if (!user || !user.token) {
      return false;
    }
    try {
      if (!contentID) {
        throw new Error("No content ID");
      }
      const url = `${props.apiURL}/api/comment-manager/comments/${contentID}`;
      const res = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ content }),
      });
      const data: any = await res.json();
      if (!data.id) {
        throw data;
      }
      // Add comment.
      addComment(content, data.id);
      setErrorHelperMessage(null);
      return true;
    } catch (err) {
      console.log(err);
      setErrorHelperMessage("Something went wrong");
      return false;
    }
  };
  return (
    <CoreContext.Provider
      value={{
        ...commentsData,
        collapseReplies: props.collapseReplies || true,
        apiURL: props.apiURL || "",
        setContentID,
        loadingComments,
        errorHelperMessage,
        loadMore,
        postComment,
        postReply,
        user,
        setUser,
      }}
    >
      <ConfigProvider>{props.children}</ConfigProvider>
    </CoreContext.Provider>
  );
};

export default CoreContext;
