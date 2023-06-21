import { getBannerSettings } from '../../services/settings'

export async function loader({ params }) {
  const bannerSettings = await getBannerSettings();
  return bannerSettings;
}

export default function BannerConf() {
  return (
    <p>Banner Conf here</p>
  )
}