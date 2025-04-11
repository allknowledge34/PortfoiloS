
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TbBrandBlogger } from "react-icons/tb";

export default function Contactview() {


    const router = useRouter();
    const { id } = router.query;
    const [contactInfo, setcontactInfo] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get('/api/contacts?id=' + id).then(response => {
                setcontactInfo(response.data)
            })
        }
    }, [id])

    return <>
        <Head>
            <title>Contact</title>
        </Head>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <div className="contactinfo">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>Contact <span>{contactInfo?.name}</span></h2>
                    </div>
                    <div className="breadcrumb">
                        <TbBrandBlogger /> <span>/</span> <span>Contact</span>
                    </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <p><strong>Full Name:</strong> {contactInfo?.name} {contactInfo?.lname}</p>
                    <p><strong>Email:</strong> {contactInfo?.email}</p>
                    <p><strong>Phone:</strong> {contactInfo?.phone}</p>
                    <p><strong>Company:</strong> {contactInfo?.company}</p>
                    <p><strong>Country:</strong> {contactInfo?.country}</p>
                    <p><strong>Price:</strong> {contactInfo?.price}</p>
                    <p><strong>Description:</strong> {contactInfo?.description}</p>
                    <p><strong>Project Types:</strong> {contactInfo?.project?.join(', ')}</p>
                </div>

            </div>
        </div>


    </>
}