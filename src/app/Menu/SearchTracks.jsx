import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTrack } from "../../features/selection/selectionSlice";

export default function SearchTracks() {
  const dispatch = useDispatch();

  const [datas, setDatas] = useState([]);
  const fetchData = (e) => {
    e.preventDefault();

    let DZ = window.dzAsyncInit();
    DZ.api("/search?q=" + e.target.value, function (response) {
      setDatas(response.data);
    });
  };

  return (
    <div style={{ position: "absolute" }}>
      <input
        type='text'
        id='name'
        name='name'
        style={{ color: "#000" }}
        onChange={(e) => {
          fetchData(e);
        }}
      />
      {datas ? (
        <ul>
          {datas.map((data) => (
            <li key={data.id}>
              {data.title}
              <span
                className='trash'
                onClick={() => {
                  dispatch(addTrack(data));
                }}>
                <i className='fas fa-plus-circle fa-lg'></i>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div>No Data</div>
      )}
    </div>
  );
}
