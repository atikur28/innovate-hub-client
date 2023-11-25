import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useCreator = () => {
    const {user, loading} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const {data: isCreator, isPending: isCreatorLoading} = useQuery({
        queryKey: [user?.email, 'isCreator'],
        enabled: !loading,
        queryFn: async() =>{
            const res = await axiosSecure.get(`/users/creator/${user.email}`);
            console.log(res.data);
            return res.data?.isCreator;
        }
    })
    return [isCreator, isCreatorLoading]
};

export default useCreator;