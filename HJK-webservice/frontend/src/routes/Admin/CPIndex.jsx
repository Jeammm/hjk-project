import { useNavigate } from "react-router-dom"

export default function Index() {
  const navigate = useNavigate();
  
  return (
    <div className="control-section">
      <button onClick={()=>navigate("category")}>เพิ่มหมวดหมู่/สินค้า</button>
      <button onClick={()=>navigate("brand")} >เพิ่มแบรนด์</button>
    </div>
  )
}