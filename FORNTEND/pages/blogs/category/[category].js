import Spinner from '@/components/Spinner';
import useFetchData from '@/hooks/useFetchData';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Category() {
    const router = useRouter();
    const { category } = router.query;

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(7);
    const [searchQuery, setSearchQuery] = useState('');

    const { alldata, loading } = useFetchData(`/api/blogs?blogcategory=${category}`);

    // ✅ Case-insensitive category filtering
    const filteredBlogs = alldata
        .filter((item) =>
            item.blogcategory?.some(cat =>
                cat.toLowerCase() === category?.toLowerCase()
            )
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const indexOfFirstBlog = (currentPage - 1) * perPage;
    const indexOfLastBlog = currentPage * perPage;

    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const publishedData = currentBlogs.filter((blog) => blog.status === 'publish');

    const totalBlogs = filteredBlogs.length;

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalBlogs / perPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <Head>
                <title>Blog category page</title>
            </Head>
            <div className="blogcategory">
                <section className="tophero">
                    <div className="container">
                        <div className="toptitle">
                            <div className="toptitlecont flex">
                                <h1>Category: <span>{category}</span></h1>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="latestpostssec">
                    <div className="container">
                        <div className="border"></div>
                        <div className="latestpostsdata">
                            <div className="fetitle">
                                <h3>Articles in {category}:</h3>
                            </div>
                            <div className="latestposts">
                                {loading ? (
                                    <Spinner />
                                ) : (
                                    <>
                                        {publishedData.length === 0 ? (
                                            <p>No blogs found in this category.</p>
                                        ) : (
                                            publishedData.map((blog) => (
                                                <div className="lpost" key={blog._id}>
                                                    <div className="lpostimg">
                                                        <Link href={`/blogs/${blog.slug}`}>
                                                            <img
                                                                src={blog.images?.[0] || '/img/placeholder.jpg'}
                                                                alt={blog.title}
                                                            />
                                                        </Link>
                                                        <div className="tegs">
                                                            {blog.blogcategory?.map((cat, index) => (
                                                                <Link
                                                                    key={index}
                                                                    href={`/blog/category/${cat}`}
                                                                    className="ai"
                                                                >
                                                                    <span></span>
                                                                    {cat}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="lpostinfo">
                                                        <h3>
                                                            <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                                                        </h3>
                                                        <p>{blog.description?.slice(0, 120)}...</p>
                                                        <h4 className="flex">
                                                            <img src="/img/coderwhite.png" alt="author" />
                                                            <span>by Sachin coder</span>
                                                        </h4>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        {publishedData.length > 0 && (
                            <div className='blogspaginationbtn flex flex-center mt-3'>
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                                {pageNumbers
                                    .slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length))
                                    .map(number => (
                                        <button
                                            key={number}
                                            onClick={() => paginate(number)}
                                            className={`${currentPage === number ? 'active' : ''}`}
                                        >
                                            {number}
                                        </button>
                                    ))}
                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={indexOfLastBlog >= filteredBlogs.length}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
}
