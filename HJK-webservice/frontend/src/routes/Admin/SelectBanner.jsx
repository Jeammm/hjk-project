import { useLoaderData, useNavigate, Form, redirect } from "react-router-dom";

import { getBannerSettings, selectBanner } from "../../services/settings";

export async function action({ request, params }) {
  return null;
}

export async function loader({ params }) {
  const bannerSettings = await getBannerSettings();
  return { bannerSettings };
}

const handleSelect = async (id) => {
  try {
    await selectBanner({ BannerID: id });
    await window.location.reload(false)
  } catch (e) {
    console.log(e);
  }
};

const GetAllBanner = ({ data }) => {
  return data.map((b) => {
    return (
      <div
        className="banner-item selectable"
        key={`${b.BannerID}`}
        onClick={() => handleSelect(b.BannerID)}
      >
        <div className="all-banner-img-container">
          <img src={b.BannerURL} alt={b.BannerName} />
        </div>
        <div className="banner-detail">
          <p className="name-text">{b.BannerName}</p>
          <p>{b.BannerDes}</p>
        </div>
      </div>
    );
  });
};

export default function SelectBanner() {
  const navigate = useNavigate();

  const { bannerSettings } = useLoaderData();

  return (
    <div className="blur-bg">
      <div className="select-banner-container">
        <div className="header-close-container">
          <h2>เลือกแบนเนอร์ที่จะแสดง</h2>
          <button onClick={() => navigate("/admin/banner")}>X</button>
        </div>
        <div className="to-select-container">
          <GetAllBanner
            data={bannerSettings.filter((b) => b.BannerNo === null)}
          />
        </div>
      </div>
    </div>
  );
}
