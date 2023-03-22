import EditFeedback from "../components/feedbacks/EditFeedback"
import {useLocation} from 'react-router-dom'

const EditFeedbackPage = () => {
    const location = useLocation()
    const {state: {feedbackData}} = location
    return (
        <EditFeedback feedbackData={feedbackData}/>
    )
}


export default EditFeedbackPage