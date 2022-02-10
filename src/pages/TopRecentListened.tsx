import dayjs from "dayjs";
import request from "helpers/request";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface RecentListensResponse {
  name: string;
  count: number;
}

const fetchRecentListened = async (
  userId: string,
  start: number,
  end: number
) => {
  const res = await request.get<RecentListensResponse[]>(
    `/aggregate/recentlistensbymonth?userId=${userId}&lessThan=${start}&greaterThan=${end}`
  );
  return res.data;
};

const TopRecentListened = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<RecentListensResponse[]>([]);

  useEffect(() => {
    if (!id) return;
    const setRecentlyListened = async () => {
      const start = dayjs().startOf("month").valueOf();
      const end = dayjs().endOf("month").valueOf();
      const data = await fetchRecentListened(id, start, end);
      setData(data);
    };
    setRecentlyListened();
  }, [id, setData]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <div>lol</div>;
};

export default TopRecentListened;
