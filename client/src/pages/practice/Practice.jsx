import "./practice.css"
import SinglePractice from "../../components/singlePractice/SinglePractice"
export default function Practice() {
    return (
        <div className="practice">
            <div className="practiceTop">
                <input className="searchBar"type="text" placeholder="Search Quiz by Name" name="" id="" />
                <span className="practiceTopOption">Diffculty</span>
                <span className="practiceTopOption">Status</span>
                <span className="practiceTopOption">Tags</span>

            </div>
            
            <SinglePractice/>
        </div>
    )
}
