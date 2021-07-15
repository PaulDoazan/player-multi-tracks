import { useState } from "react";
import { useDispatch } from "react-redux";
import TrackBlock from "./TrackBlock";

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
    <div className='menu-container'>
      <div className='searchbar'>
        <input
          className='search-input'
          type='search'
          id='name'
          name='name'
          placeholder='search...'
          style={{ color: "#000" }}
          onChange={(e) => {
            fetchData(e);
          }}
        />
      </div>

      {datas ? (
        <ul>
          {datas.map((data) => (
            <li key={data.id}>
              <TrackBlock data={data} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
