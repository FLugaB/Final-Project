import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


const DoctorDetail = () => {

    const params = useParams()

    const [localLoad, setLocalLoad] = useState(true)
    // const { } = useSelector( (state) => state.doctor)
    
    const dispatach = useDispatch();

    // useEffect(() => dispatch(fetchProduct(params)), [params.id]);
    // useEffect(() => pageLoaded(), [beforeUpdateProduct.id])

    


    return (
        <div>
            
        </div>
    );
};

export default DoctorDetail;