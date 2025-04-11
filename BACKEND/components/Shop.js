import ReactMarkdown from 'react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Spinner from './Spinner';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ReactSortable } from 'react-sortablejs';
import { MdDeleteForever } from "react-icons/md";
import Head from "next/head";

export default function Shop(
    {
        _id,
        title : existingTitle,
        slug : existingslug,
        images : existingimages,
        description : existingdescription,
        afilink: existingafilink,
        price : existingprice,
        tags : existingtags,
        status : existingstatus,
    }
) {

    const [redirect, setRedirect] = useState(false)

    const router = useRouter();

    const [title, setTitle] = useState(existingTitle || '');
    const [slug, setslug] = useState(existingslug || '');
    const [images, setimages] = useState(existingimages || []);
    const [description, setdescription] = useState(existingdescription || '');
    const [afilink, setafilink] = useState(existingafilink || '');
    const [price, setprice] = useState(existingprice || '');
    const [tags, settags] = useState(existingtags || '');
    const [status, setstatus] = useState(existingstatus || '');

    const [isUploading, setIsUploading] = useState(false)
    const uploadImagesQueue = [];

    async function createBlog(ev) {
        ev.preventDefault()

        if (isUploading) {
            await Promise.all(uploadImagesQueue)
        }

        const data = { title, slug, images, description, tags, afilink, price, status };

        if (_id) {
            await axios.put('/api/shops', { ...data, _id })
            toast.success('Data Updated')
            router.push('/shops')
        } else {
            await axios.post('/api/shops', data)
            toast.success('Blogs Created')
            router.push('/shops')
        }


        setRedirect(true);
    };

    async function uploadImages(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            setIsUploading(true)

            for (const file of files) {
                const data = new FormData();
                data.append('file', file)

                uploadImagesQueue.push(
                    axios.post('/api/upload', data).then(res => {
                        setimages(oldImages => [...oldImages, ...res.data.links])
                    })
                )
            }

            await Promise.all(uploadImagesQueue);

            setIsUploading(false)
            toast.success('Images Uploaded')
        } else {
            toast.error('An error occurred!')
        }
    }

    if (redirect) {
        router.push('/shops')
        return null;
    }

    function updateImagesOrder(images) {
        setimages(images)
    }

    function handleDeleteImage(index) {
        const updateImages = [...images];
        updateImages.splice(index, 1);
        setimages(updateImages);
        toast.success('Image Deleted Successfully')
    }

    const handleSlugChange = (ev) => {
        const inputValue = ev.target.value;
        const newSlug = inputValue.replace(/\s+/g, '-')

        setslug(newSlug);
    }
    return <>
        <Head>
            <title>Add Product</title>
        </Head>
        <form className='addWebsiteform' onSubmit={createBlog}>
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id='title'
                    placeholder='Enter small title'
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}
                />
            </div>
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="slug">Slug (seo friendly url)</label>
                <input
                    type="text"
                    id='slug'
                    placeholder='Enter Slug url'
                    value={slug}
                    onChange={handleSlugChange}
                />
            </div>
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="afilink">Afilink Link</label>
                <input
                    type="text"
                    id='afilink'
                    placeholder='Enter afilink'
                    value={afilink}
                    onChange={ev => setafilink(ev.target.value)}
                />
            </div>
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="price">Price</label>
                <input
                    type="text"
                    id='price'
                    placeholder='Enter price'
                    value={price}
                    onChange={ev => setprice(ev.target.value)}
                />
            </div>
            <div className="w-100 flex flex-col flex-left mb-2">
                <div className="w-100">
                    <label htmlFor="images">Image (first image will be show as thumbnail, you can drag)</label>
                    <input type="file" id='fileInput' className='mt-1' accept='image/*' multiple onChange={uploadImages} />
                </div>
                <div className="w-100 flex flex-left mt-1">
                    {isUploading && (<Spinner />)}
                </div>
            </div>

            {!isUploading && (
                <div className="flex">
                    <ReactSortable list={Array.isArray(images) ? images : []} setList={updateImagesOrder} animation={200}
                        className='flex gap-1'
                    >
                        {images?.map((link, index) => (
                            <div key={link} className="uploadedimg">
                                <img src={link} alt="image" className='object-cover' />
                                <div className="deleteimg">
                                    <button onClick={() => handleDeleteImage(index)}><MdDeleteForever /></button>
                                </div>
                            </div>
                        ))}
                    </ReactSortable>
                </div>
            )}
            <div className="description w-100 flex flex-col flex-left mb-2">
                <label htmlFor="description">Blog Content (for image: first upload and copy link and paste in ![alt text](link))</label>
                <MarkdownEditor

                    value={description}
                    onChange={(ev) => setdescription(ev.text)}

                    style={{ width: '100%', height: '400px' }}
                    renderHTML={(text) => (
                        <ReactMarkdown components={{
                            code: ({ node, inline, className, children, ...props }) => {
                                const match = /language-(\w+)/.exec(className || '');

                                if (inline) {
                                    return <code>{children}</code>
                                } else if (match) {
                                    return (
                                        <div style={{ position: 'relative' }}>
                                            <pre style={{
                                                padding: '0', borderRadius: '5px', overflowX: 'auto',
                                                whiteSpace: 'pre-wrap'
                                            }} {...props}>
                                                <code>{children}</code>
                                            </pre>
                                            <button style={{ position: 'absolute', top: '0', right: '0', zIndex: '1' }} onClick={() =>
                                                navigator.clipboard.writeText(children)
                                            }>copy code</button>
                                        </div>
                                    )
                                } else {
                                    return <code {...props}>{children}</code>
                                }
                            }
                        }}>
                            {text}
                        </ReactMarkdown>
                    )}
                />
            </div>
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="tags">Tags</label>
                <select onChange={(e) => settags(Array.from(e.target.selectedOptions, option => option.value))} value={tags} name="tags" id="tags" multiple>
                    <option value="html">html</option>
                    <option value="css">css</option>
                    <option value="javascript">javascript</option>
                    <option value="nextjs">nextjs</option>
                    <option value="reactjs">reactjs</option>
                    <option value="database">database</option>
                    <option value="kotlin">kotlin</option>
                    <option value="java">java</option>
                </select>
            </div>
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="status">Status</label>
                <select onChange={ev => setstatus(ev.target.value)} value={status} name="status" id="status">
                    <option value="">No select</option>
                    <option value="draft">Draft</option>
                    <option value="publish">Publish</option>
                </select>
            </div>

            <div className="w-100 mb-1">
                <button type='submit' className='w-100 addwebbtn flex-center'>SAVE PRODUCT</button>
            </div>
        </form>
    </>
}

