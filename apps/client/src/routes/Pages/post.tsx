import { useEffect, useState } from "react";
import { getPasteAction } from "../actions/postLoader";
import { useParams } from "react-router-dom";
import { User } from "../../../../../node_modules/.pnpm/@prisma+client@5.19.0_prisma@5.19.0/node_modules/@prisma/client";
import { BounceLoader } from "react-spinners";

function Post() {
  const params = useParams();
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<User>();

  const fetchData = async () => {
    try {
      setloading(true);
      const post = await getPasteAction(params);
      // @ts-expect-error
      setData(post);
    } catch (error) {
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    throw new Error();
  }
  if (loading) {
    return (
      <div>
        <BounceLoader size={70} color="#e390eb" />
      </div>
    );
  }
  return <div>single post</div>;
}

export default Post;
