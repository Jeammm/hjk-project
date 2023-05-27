import { useNavigate } from "react-router-dom"

export default function Index() {
  const navigate = useNavigate();
  
  return (
    <div className="Index">
      <p>Index here ja. Click Click Click</p>
    </div>
  )
}