import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { getUserAddress } from "../../../api/UserAPI";
import PageLoader from "../../../components/loaders/PageLoader";

export default function EditUserAddressScreen () {
    const [userAddress, setUserAddress] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        getUserAddress(setUserAddress, setLoading)
    },[])
    return(
        loading ? <PageLoader /> :
        <ScrollView>

        </ScrollView>
    )
}