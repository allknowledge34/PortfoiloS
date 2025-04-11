import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TbBrandBlogger } from "react-icons/tb";

export default function DeleteShops() {

    const router = useRouter();
    const { id } = router.query;
    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get('/api/shops?id=' + id).then(response => {
                setProductInfo(response.data)
            })
        }
    }, [id])

    function goBack() {
        router.push('/shops')
    }

    async function deleteBlog() {
        await axios.delete('/api/shops?id=' + id)
        toast.success('delete successfully')
        goBack();
    }

    return <>
     <Head>
            <title>Delete Product</title>
        </Head>
        <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Edit <span>{productInfo?.title}</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb">
                    <TbBrandBlogger /> <span>/</span> <span>Delete Product</span>
                </div>
            </div>
            <div className="deletesec flex flex-center wh_100">
                <div className="deletecard">
                    <svg
                        viewBox="0 0 24 24"
                        fill="red"
                        height="6em"
                        width="6em"
                    >
                        <path d="M6 19q-.825 0-1.413-.588Q4 17.825 4 17V7h16v10q0 .825-.587 1.412Q18.825 19 18 19Zm0-12v10h12V7ZM8 9h2v6H8Zm4 0h2v6h-2Zm-3-4 1-1h6l1 1h5v2H2V5Z" />
                    </svg>
                    <p className="cookieHeading">Are You Sure?</p>
                    <p className="cookieDescription">If you delete this website content it will be permenent delete you content.</p>
                    <div className="buttonContainer">
                        <button onClick={deleteBlog} className="acceptButton">Delete</button>
                        <button onClick={goBack} className="declineButton">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}